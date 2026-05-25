/**
 * Static Site Build Script
 *
 * This build system supports two content types that work similarly:
 *
 * 1. TSX files - Export a `config` object (metadata) and slot components (Main, Header, etc.)
 * 2. MD files  - Use YAML frontmatter (becomes config) and markdown content (becomes Main slot)
 *
 * Both content types are processed into the same PageSpec structure, making MD files
 * a natural subset of TSX files. The pattern is inspired by modern frameworks that
 * treat pages as components with metadata exports.
 */

// Built-ins
import { readdir, readFile, writeFile, mkdir, cp } from 'fs/promises';
import { join, dirname, extname } from 'path';

// React
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Markdown processing
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

// Local modules
import Layout from './templates/Layout';
import generateRssXml from './templates/Rss';
import { Main as PostMain, MainFooter } from './templates/PostTemplate';
import siteConfig from './site.config';
import type { PageMeta, PageSpec, ComponentModule } from './lib/routing';
import { specFromModule } from './lib/routing';

// Types for internal use
interface Post {
    title: string;
    date: string;
    permalink: string;
    content: string;
    slug: string;
    processedContent?: string;
}

interface NavigationData {
    postsByYear: Record<string, Array<{
        title: string;
        permalink: string;
        date: string;
        slug: string;
    }>>;
    pages: Array<{ title: string; permalink: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────────

/** Fix React SSR bug with custom elements - converts 'className' to 'class' */
const fixWebComponentAttributes = (html: string): string =>
    html.replace(/className=/g, 'class=');

/** Ensure directory exists */
async function ensureDir(dirPath: string) {
    await mkdir(dirPath, { recursive: true }).catch(() => { });
}

/** Write HTML file with DOCTYPE */
async function writeHtmlFile(filePath: string, content: string) {
    await ensureDir(dirname(filePath));
    await writeFile(filePath, `<!DOCTYPE html>${content}`);
}

/** Process Markdown to HTML */
async function processMarkdown(content: string): Promise<string> {
    const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeHighlight)
        .use(rehypeStringify, { allowDangerousHtml: true });
    const result = await processor.process(content);
    return String(result);
}

// ─────────────────────────────────────────────────────────────────────────────
// Content Processing
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Process blog posts from content/posts directory.
 * Posts are MD files with YAML frontmatter and date-prefixed filenames.
 */
async function processPosts(): Promise<Post[]> {
    console.log('📝 Processing blog posts...');
    const posts: Post[] = [];
    const postFiles = await readdir('content/posts');

    for (const filename of postFiles) {
        if (!filename.match(/\.(md|mdx)$/)) continue;

        // Parse filename: YYYY-MM-DD-slug.md
        const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.(md|mdx)$/);
        if (!match) {
            console.warn(`  ⚠️ Skipping ${filename} - invalid name format`);
            continue;
        }

        const [, date, slug] = match;
        const fileContent = await readFile(join('content/posts', filename), 'utf-8');
        const { data: frontmatter, content } = matter(fileContent);

        posts.push({
            title: (frontmatter.title as string) || slug.replace(/-/g, ' '),
            date,
            permalink: (frontmatter.permalink as string) || `/${slug}/`,
            content,
            slug,
        });
    }

    console.log(`  ✓ ${posts.length} posts`);
    return posts;
}

/**
 * Process TSX pages from content/pages directory.
 * TSX files export a `config` object and slot components.
 */
async function processTsxPages(): Promise<PageSpec[]> {
    console.log('⚛️  Processing TSX pages...');
    const pages: PageSpec[] = [];
    const pageFiles = await readdir('content/pages');

    for (const filename of pageFiles) {
        if (extname(filename) !== '.tsx') continue;

        const modulePath = join(process.cwd(), 'content/pages', filename);
        try {
            const mod = await import(modulePath) as ComponentModule;
            if (!mod.config?.title) {
                console.warn(`  ⚠️ Skipping ${filename} - missing config.title`);
                continue;
            }
            pages.push(specFromModule(mod));
        } catch (err) {
            console.error(`  ❌ Error importing ${filename}:`, err);
        }
    }

    console.log(`  ✓ ${pages.length} TSX pages`);
    return pages;
}

/**
 * Process Markdown pages from content/pages directory.
 * MD files use frontmatter as config, content becomes the Main slot.
 */
async function processMdPages(): Promise<PageSpec[]> {
    console.log('📄 Processing Markdown pages...');
    const pages: PageSpec[] = [];
    const pageFiles = await readdir('content/pages');

    for (const filename of pageFiles) {
        if (!filename.match(/\.(md|mdx)$/)) continue;

        const fileContent = await readFile(join('content/pages', filename), 'utf-8');
        const { data: frontmatter, content } = matter(fileContent);
        const baseName = filename.replace(/\.(md|mdx)$/, '');

        // Process markdown content to HTML
        const htmlContent = await processMarkdown(content);

        const meta: PageMeta = {
            title: (frontmatter.title as string) || baseName.replace(/-/g, ' '),
            permalink: (frontmatter.permalink as string) || `/${baseName}/`,
            layout: frontmatter.layout as PageMeta['layout'],
        };

        pages.push({
            meta,
            slots: {
                // Main slot renders the processed HTML content
                Main: () => <div dangerouslySetInnerHTML={{ __html: htmlContent }} />,
            },
        });
    }

    console.log(`  ✓ ${pages.length} Markdown pages`);
    return pages;
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation Data
// ─────────────────────────────────────────────────────────────────────────────

/** Build navigation data from posts and pages */
function buildNavigationData(posts: Post[], pages: PageSpec[]): NavigationData {
    // Group posts by year
    const postsByYear: NavigationData['postsByYear'] = {};
    for (const post of posts) {
        const year = post.date.substring(0, 4);
        if (!postsByYear[year]) postsByYear[year] = [];
        postsByYear[year].push({
            title: post.title,
            permalink: post.permalink,
            date: post.date,
            slug: post.slug,
        });
    }

    // Sort posts within each year (newest first)
    for (const year of Object.keys(postsByYear)) {
        postsByYear[year].sort((a, b) => b.date.localeCompare(a.date));
    }

    // Collect page links (excluding home)
    const pageLinks = pages
        .filter(p => p.meta.permalink !== '/')
        .map(p => ({ title: p.meta.title, permalink: p.meta.permalink }));

    return { postsByYear, pages: pageLinks };
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML Generation
// ─────────────────────────────────────────────────────────────────────────────

/** Render a page to HTML and write to dist */
async function renderPage(
    title: string,
    permalink: string,
    slotContent: Record<string, React.ReactNode>,
    navigationData: NavigationData,
    contentData: { type: 'post' | 'page' | 'home'; title: string; content: string },
    openGraph?: PageMeta['openGraph']
) {
    const html = fixWebComponentAttributes(renderToStaticMarkup(
        <Layout
            title={title}
            navigationData={navigationData}
            contentData={contentData}
            currentPath={permalink}
            slotContent={slotContent}
            openGraph={openGraph}
        />
    ));

    const outputPath = permalink === '/'
        ? 'dist/index.html'
        : join('dist', permalink.slice(1), 'index.html');

    await writeHtmlFile(outputPath, html);
}

/** Generate all blog post pages */
async function generatePostPages(posts: Post[], navigationData: NavigationData) {
    console.log('📝 Generating post pages...');

    // Process all markdown content
    for (const post of posts) {
        post.processedContent = await processMarkdown(post.content);
    }

    // Sort by date (newest first)
    posts.sort((a, b) => b.date.localeCompare(a.date));

    // Generate each post page
    for (const post of posts) {
        const postData = {
            ...post,
            content: post.processedContent!,
            isFavorite: siteConfig.favoritePosts.includes(post.slug),
        };

        await renderPage(
            `${post.title} | zachwill.com`,
            post.permalink,
            {
                main: React.createElement(PostMain, { post: postData }),
                'main-footer': React.createElement(MainFooter),
            },
            navigationData,
            { type: 'post', title: post.title, content: '' }
        );
    }

    console.log(`  ✓ ${posts.length} post pages`);
}

/** Generate all static pages (TSX and MD) */
async function generateStaticPages(
    pages: PageSpec[],
    posts: Post[],
    navigationData: NavigationData
) {
    console.log('📄 Generating static pages...');

    for (const page of pages) {
        const { meta, slots } = page;
        const ctx = { path: meta.permalink, query: {} };

        // Special handling for home page - inject posts data
        let mainSlot: React.ReactNode;
        if (meta.permalink === '/') {
            const homeModule = await import(join(process.cwd(), 'content/pages/home.tsx'));
            mainSlot = React.createElement(homeModule.Main, {
                posts,
                favoritePostSlugs: siteConfig.favoritePosts,
            });
        } else {
            mainSlot = slots.Main(ctx);
        }

        // Build slot content including optional Scripts and Styles
        const slotContent: Record<string, React.ReactNode> = { main: mainSlot };
        if (slots.Scripts) slotContent.scripts = slots.Scripts(ctx);
        if (slots.Styles) slotContent.styles = slots.Styles(ctx);

        await renderPage(
            meta.title,
            meta.permalink,
            slotContent,
            navigationData,
            {
                type: meta.permalink === '/' ? 'home' : 'page',
                title: meta.title,
                content: '',
            },
            meta.openGraph
        );
    }

    console.log(`  ✓ ${pages.length} static pages`);
}

/** Generate RSS feed */
async function generateRssFeed(posts: Post[]) {
    console.log('📡 Generating RSS feed...');
    const rssXml = generateRssXml({ posts });
    await writeFile('dist/atom.xml', rssXml);
    console.log('  ✓ RSS feed');
}

/** Copy static assets */
async function copyAssets() {
    console.log('📦 Copying assets...');
    await ensureDir('dist/assets');
    await cp('src/assets', 'dist/assets', { recursive: true });
    await cp('CNAME', 'dist/CNAME').catch(() => { });
    console.log('  ✓ Assets copied');
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Build
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
    console.log('\n🚀 Building static site...\n');
    await ensureDir('dist');

    // 1. Process all content
    const posts = await processPosts();
    const tsxPages = await processTsxPages();
    const mdPages = await processMdPages();
    const allPages = [...tsxPages, ...mdPages];

    // 2. Build navigation data
    const navigationData = buildNavigationData(posts, allPages);

    // 3. Generate HTML pages
    await generatePostPages(posts, navigationData);
    await generateStaticPages(allPages, posts, navigationData);

    // 4. Generate RSS and copy assets
    await generateRssFeed(posts);
    await copyAssets();

    console.log(`\n✅ Build complete!`);
    console.log(`   ${posts.length} posts, ${allPages.length} pages\n`);
}

build().catch(console.error); 