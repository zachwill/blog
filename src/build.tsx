// Built-ins
import { readdir, readFile, writeFile, mkdir, cp } from 'fs/promises';
import { join, dirname, extname } from 'path';

// React
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Third-party dependencies
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { evaluate } from '@mdx-js/mdx';

// Local templates and components
import Layout from './templates/Layout';
import generateRssXml from './templates/Rss';
import { Main as PostMain, MainFooter } from './templates/PostTemplate';
import { mdxComponents } from './components';

// Configuration and types
import siteConfig from './site.config';
import { SlotPageData, SlotPageExports, SlotContent, PageSlot } from './types/slots';

// Fix React SSR bug with custom elements - converts 'className' to 'class' for web components
function fixWebComponentAttributes(html: string): string {
    return html.replace(/className=/g, 'class=');
}

interface Post {
    title: string;
    date: string;
    permalink: string;
    content: string;
    slug: string;
    filePath: string;
    isMdx: boolean;
    processedContent?: string;
}

interface PageData {
    title: string;
    permalink: string;
    content: string;
    isMdx: boolean;
    showHeader: boolean;
    layout?: string;
}

// Union type for both regular and slot-based pages
type ProcessedPageData = PageData | SlotPageData;

interface NavigationData {
    postsByYear: Record<string, Array<{
        title: string;
        permalink: string;
        date: string;
        slug: string;
    }>>;
    pages: Array<{
        title: string;
        permalink: string;
    }>;
}

interface ContentData {
    type: 'post' | 'page' | 'home';
    title: string;
    content: string;
    metadata?: {
        date?: string;
        isFavorite?: boolean;
    };
}

// Utility functions
async function ensureDir(dirPath: string) {
    try {
        await mkdir(dirPath, { recursive: true });
    } catch (error) {
        // Directory might already exist
    }
}

async function writeHtmlFile(filePath: string, content: string) {
    await ensureDir(dirname(filePath));
    await writeFile(filePath, `<!DOCTYPE html>${content}`);
}

async function processMarkdownContent(markdownContent: string): Promise<string> {
    try {
        const processor = unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeHighlight)
            .use(rehypeStringify);

        const result = await processor.process(markdownContent);
        return String(result);
    } catch (error) {
        console.error('Error processing Markdown:', error);
        return markdownContent;
    }
}

async function processMdxContent(
    mdxContent: string,
    componentProps?: { posts?: Post[]; favoritePostSlugs?: string[] }
): Promise<string> {
    try {
        const { default: MdxComponent } = await evaluate(mdxContent, {
            development: false,
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
            jsx: React.createElement,
            jsxs: React.createElement,
            Fragment: React.Fragment
        });

        // Create props object for components
        const props = componentProps || {};

        // Create component context with props
        const components = Object.entries(mdxComponents).reduce((acc, [name, Component]) => {
            acc[name] = (compProps: any) => {
                const finalProps = { ...props, ...compProps };
                return React.createElement(Component as any, finalProps);
            };
            return acc;
        }, {} as any);

        const html = renderToStaticMarkup(
            <MdxComponent components={components} />
        );
        return fixWebComponentAttributes(html);
    } catch (error) {
        console.error('Error processing MDX:', error);
        return await processMarkdownContent(mdxContent);
    }
}

// Content processing
async function processPosts(): Promise<Post[]> {
    console.log('Processing blog posts...');
    const posts: Post[] = [];

    try {
        const postFiles = await readdir('content/posts');

        for (const filename of postFiles) {
            const ext = extname(filename);
            if (!ext.match(/\.(md|mdx)$/)) continue;

            const isMdx = ext === '.mdx';
            console.log(`Processing ${isMdx ? 'MDX' : 'Markdown'} post: ${filename}`);

            const filePath = join('content/posts', filename);
            const fileContent = await readFile(filePath, 'utf-8');
            const { data: frontmatter, content } = matter(fileContent);

            const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.(md|mdx)$/);
            if (!match) {
                console.warn(`Skipping file with invalid name format: ${filename}`);
                continue;
            }

            const [, date, slug] = match;
            const permalink = frontmatter.permalink || `/${slug}/`;

            posts.push({
                title: frontmatter.title || slug.replace(/-/g, ' '),
                date,
                permalink,
                content,
                slug,
                filePath,
                isMdx
            });
        }

        console.log(`Processed ${posts.length} posts`);
        return posts;
    } catch (error) {
        console.error('Error processing posts:', error);
        return [];
    }
}

async function processTsxPages(): Promise<SlotPageData[]> {
    console.log('Processing TSX slot-based pages...');
    const tsxPages: SlotPageData[] = [];

    try {
        const pageFiles = await readdir('content/pages');

        for (const filename of pageFiles) {
            const ext = extname(filename);
            if (ext !== '.tsx') continue;

            console.log(`Processing TSX page: ${filename}`);

            const baseName = filename.replace(/\.tsx$/, '');
            const modulePath = join(process.cwd(), 'content/pages', filename);

            try {
                // Dynamically import the TSX module
                const module = await import(modulePath);
                const config = module.config;

                if (!config || !config.title) {
                    console.warn(`TSX page ${filename} missing required config.title`);
                    continue;
                }

                // Build slots from exported functions
                const slots: SlotContent = {};
                const slotNames: PageSlot[] = [
                    'banner', 'header', 'subheader', 'menu', 'navigation-header',
                    'navigation', 'navigation-footer', 'main-header', 'main',
                    'main-footer', 'aside', 'footer', 'navigation-toggle', 'skip-to-content'
                ];

                // Check for exported slot functions (capitalize first letter)
                for (const slotName of slotNames) {
                    const exportName = slotName.charAt(0).toUpperCase() + slotName.slice(1).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
                    const SlotComponent = module[exportName];

                    if (SlotComponent && typeof SlotComponent === 'function') {
                        slots[slotName] = React.createElement(SlotComponent);
                    }
                }

                // Handle Main as the default slot if no 'main' slot is defined
                if (!slots.main && module.Main) {
                    slots.main = React.createElement(module.Main);
                }

                const permalink = config.permalink || `/${baseName}/`;

                tsxPages.push({
                    title: config.title,
                    permalink,
                    slots,
                    config,
                    openGraph: config.openGraph,
                    isSlotBased: true
                });

            } catch (moduleError) {
                console.error(`Error importing TSX page ${filename}:`, moduleError);
                continue;
            }
        }

        console.log(`Processed ${tsxPages.length} TSX pages`);
        return tsxPages;
    } catch (error) {
        console.error('Error processing TSX pages:', error);
        return [];
    }
}

async function processPages(): Promise<PageData[]> {
    console.log('Processing static pages...');
    const pages: PageData[] = [];

    try {
        const pageFiles = await readdir('content/pages');

        for (const filename of pageFiles) {
            const ext = extname(filename);
            if (!ext.match(/\.(md|mdx)$/)) continue;

            const isMdx = ext === '.mdx';
            console.log(`Processing ${isMdx ? 'MDX' : 'Markdown'} page: ${filename}`);

            const filePath = join('content/pages', filename);
            const fileContent = await readFile(filePath, 'utf-8');
            const { data: frontmatter, content } = matter(fileContent);

            const baseName = filename.replace(/\.(md|mdx)$/, '');
            const permalink = frontmatter.permalink || `/${baseName}/`;

            pages.push({
                title: frontmatter.title || baseName.replace(/-/g, ' '),
                permalink,
                content,
                isMdx,
                showHeader: frontmatter.layout !== 'resume',
                layout: frontmatter.layout
            });
        }

        console.log(`Processed ${pages.length} pages`);
        return pages;
    } catch (error) {
        console.error('Error processing pages:', error);
        return [];
    }
}

// Navigation generation
function generateNavigationData(posts: Post[], pages: PageData[], tsxPages: SlotPageData[]): NavigationData {
    const postsByYear: Record<string, any[]> = {};

    // Group posts by year
    posts.forEach(post => {
        const year = post.date.substring(0, 4);
        if (!postsByYear[year]) {
            postsByYear[year] = [];
        }
        postsByYear[year].push({
            title: post.title,
            permalink: post.permalink,
            date: post.date,
            slug: post.slug
        });
    });

    // Sort posts within each year by date (newest first)
    Object.keys(postsByYear).forEach(year => {
        postsByYear[year].sort((a, b) => b.date.localeCompare(a.date));
    });

    // Combine regular pages and TSX pages for navigation
    const allPages = [
        ...pages
            .filter(page => page.permalink !== '/') // Don't show home in navigation
            .map(page => ({
                title: page.title,
                permalink: page.permalink
            })),
        ...tsxPages
            .filter(page => page.permalink !== '/') // Don't show home in navigation
            .map(page => ({
                title: page.title,
                permalink: page.permalink
            }))
    ];

    return {
        postsByYear,
        pages: allPages
    };
}



// Content generation
async function generateContent(posts: Post[], pages: PageData[], tsxPages: SlotPageData[], navigationData: NavigationData) {
    console.log('Generating content with WebAwesome app shell...');

    // Process all posts
    for (const post of posts) {
        post.processedContent = post.isMdx
            ? await processMdxContent(post.content)
            : await processMarkdownContent(post.content);
    }

    // Sort posts by date (newest first)
    posts.sort((a, b) => b.date.localeCompare(a.date));

    // Generate individual post pages
    for (const post of posts) {
        const postWithFavorite = {
            ...post,
            content: post.processedContent!,
            isFavorite: siteConfig.favoritePosts.includes(post.slug)
        };

        const slots: SlotContent = {
            main: React.createElement(PostMain, { post: postWithFavorite }),
            'main-footer': React.createElement(MainFooter)
        };

        const contentData: ContentData = {
            type: 'post',
            title: post.title,
            content: ''
        };

        const html = fixWebComponentAttributes(renderToStaticMarkup(
            <Layout
                title={`${post.title} | zachwill.com`}
                navigationData={navigationData}
                contentData={contentData}
                currentPath={post.permalink}
                slotContent={slots}
            />
        ));

        const outputPath = join('dist', post.permalink.slice(1), 'index.html');
        await writeHtmlFile(outputPath, html);
    }

    // Generate regular pages (no special cases)
    for (const page of pages) {
        const processedContent = page.isMdx
            ? await processMdxContent(page.content)
            : await processMarkdownContent(page.content);

        const contentData: ContentData = {
            type: 'page',
            title: page.title,
            content: processedContent
        };

        const html = fixWebComponentAttributes(renderToStaticMarkup(
            <Layout
                title={page.title}
                navigationData={navigationData}
                contentData={contentData}
                currentPath={page.permalink}
            />
        ));

        const outputPath = page.permalink === '/'
            ? 'dist/index.html'
            : join('dist', page.permalink.slice(1), 'index.html');

        await writeHtmlFile(outputPath, html);
    }

    // Generate TSX pages (including home page with posts data)
    for (const tsxPage of tsxPages) {
        let slots = tsxPage.slots;

        // Inject posts data for home page
        if (tsxPage.permalink === '/') {
            const homeModule = await import(join(process.cwd(), 'content/pages/home.tsx'));
            slots = {
                ...slots,
                main: React.createElement(homeModule.Main, { posts, favoritePostSlugs: siteConfig.favoritePosts })
            };
        }

        const contentData: ContentData = {
            type: tsxPage.permalink === '/' ? 'home' : 'page',
            title: tsxPage.title,
            content: ''
        };

        const html = fixWebComponentAttributes(renderToStaticMarkup(
            <Layout
                title={tsxPage.title}
                navigationData={navigationData}
                contentData={contentData}
                currentPath={tsxPage.permalink}
                slotContent={slots}
                openGraph={tsxPage.openGraph}
            />
        ));

        const outputPath = tsxPage.permalink === '/'
            ? 'dist/index.html'
            : join('dist', tsxPage.permalink.slice(1), 'index.html');

        await writeHtmlFile(outputPath, html);
    }

    console.log(`Generated ${posts.length} posts, ${pages.length} pages, and ${tsxPages.length} TSX pages`);
}

async function generateRssFeed(posts: Post[]) {
    console.log('Generating RSS feed...');
    const rssXml = generateRssXml({ posts });
    await writeFile('dist/atom.xml', rssXml);
    console.log('Generated RSS feed');
}

async function copyAssets() {
    console.log('Copying assets...');
    try {
        await ensureDir('dist/assets');
        await cp('src/assets', 'dist/assets', { recursive: true });

        // Copy root assets

        try {
            await cp('CNAME', 'dist/CNAME');
        } catch (error) {
            console.warn('CNAME file not found');
        }

        console.log('Assets copied');
    } catch (error) {
        console.error('Error copying assets:', error);
    }
}

// Main build function
async function build() {
    console.log('🚀 Starting clean WebAwesome build...');

    await ensureDir('dist');

    const posts = await processPosts();
    const pages = await processPages();
    const tsxPages = await processTsxPages();
    const navigationData = generateNavigationData(posts, pages, tsxPages);

    await generateContent(posts, pages, tsxPages, navigationData);
    await generateRssFeed(posts);
    await copyAssets();

    console.log(`✅ Clean build complete! Generated ${posts.length} posts, ${pages.length} pages, and ${tsxPages.length} TSX pages.`);
}

// Run the build
build().catch(console.error); 