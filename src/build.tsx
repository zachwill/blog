import { readdir, readFile, writeFile, mkdir, cp } from 'fs/promises';
import { join, dirname, extname } from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { evaluate } from '@mdx-js/mdx';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Layout from './templates/Layout';
import generateRssXml from './templates/Rss';
import { mdxComponents } from './components';
import siteConfig from './site.config';

interface PostData {
    title: string;
    date: string;
    permalink: string;
    content: string;
    slug: string;
    filePath: string;
    isMdx: boolean;
}

interface ProcessedPost extends PostData {
    processedContent: string;
}

interface PageData {
    title: string;
    permalink: string;
    content: string;
    isMdx: boolean;
    showHeader: boolean;
    layout?: string;
}

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
    componentProps?: { posts?: ProcessedPost[]; favoritePostSlugs?: string[] }
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
        const ComponentsWithProps = Object.entries(mdxComponents).reduce((acc, [name, Component]) => {
            acc[name] = (compProps: any) => React.createElement(Component, { ...props, ...compProps });
            return acc;
        }, {} as any);

        return renderToStaticMarkup(
            <MdxComponent components={ComponentsWithProps} />
        );
    } catch (error) {
        console.error('Error processing MDX:', error);
        return await processMarkdownContent(mdxContent);
    }
}

// Content processing
async function processPosts(): Promise<PostData[]> {
    console.log('Processing blog posts...');
    const posts: PostData[] = [];

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
function generateNavigationData(posts: PostData[], pages: PageData[]): NavigationData {
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

    return {
        postsByYear,
        pages: pages
            .filter(page => page.permalink !== '/') // Don't show home in navigation
            .map(page => ({
                title: page.title,
                permalink: page.permalink
            }))
    };
}



// Content generation
async function generateContent(posts: PostData[], pages: PageData[], navigationData: NavigationData) {
    console.log('Generating content with WebAwesome app shell...');

    // Process all posts
    const processedPosts: ProcessedPost[] = await Promise.all(
        posts.map(async (post) => {
            const processedContent = post.isMdx
                ? await processMdxContent(post.content)
                : await processMarkdownContent(post.content);
            return { ...post, processedContent };
        })
    );

    // Sort posts by date (newest first)
    processedPosts.sort((a, b) => b.date.localeCompare(a.date));

    // Generate individual post pages
    for (const post of processedPosts) {
        const contentData: ContentData = {
            type: 'post',
            title: post.title,
            content: `<article>${post.processedContent}</article>`,
            metadata: {
                date: post.date,
                isFavorite: siteConfig.favoritePosts.includes(post.slug)
            }
        };

        const html = renderToStaticMarkup(
            <Layout
                title={post.title}
                navigationData={navigationData}
                contentData={contentData}
                currentPath={post.permalink}
            />
        );

        const outputPath = join('dist', post.permalink.slice(1), 'index.html');
        await writeHtmlFile(outputPath, html);
    }

    // Generate pages (including enhanced homepage)
    for (const page of pages) {
        let processedContent: string;

        if (page.isMdx) {
            // For home page, pass posts data to MDX components
            const componentProps = page.layout === 'home'
                ? { posts: processedPosts, favoritePostSlugs: siteConfig.favoritePosts }
                : undefined;

            processedContent = await processMdxContent(page.content, componentProps);
        } else {
            processedContent = await processMarkdownContent(page.content);
        }

        const contentData: ContentData = {
            type: page.layout === 'home' ? 'home' : 'page',
            title: page.title,
            content: processedContent
        };

        const html = renderToStaticMarkup(
            <Layout
                title={page.title}
                navigationData={navigationData}
                contentData={contentData}
                currentPath={page.permalink}
            />
        );

        const outputPath = page.permalink === '/'
            ? 'dist/index.html'
            : join('dist', page.permalink.slice(1), 'index.html');

        await writeHtmlFile(outputPath, html);
    }

    console.log(`Generated ${posts.length} posts and ${pages.length} pages`);
}

async function generateRssFeed(posts: PostData[]) {
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
            await cp('src/assets/favicon.ico', 'dist/favicon.ico');
            await cp('CNAME', 'dist/CNAME');
        } catch (error) {
            console.warn('Some optional assets not found');
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
    const navigationData = generateNavigationData(posts, pages);

    await generateContent(posts, pages, navigationData);
    await generateRssFeed(posts);
    await copyAssets();

    console.log(`✅ Clean build complete! Generated ${posts.length} posts and ${pages.length} pages.`);
}

// Run the build
build().catch(console.error); 