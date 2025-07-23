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
import Post from './templates/Post';
import Page from './templates/Page';
import Home from './templates/Home';
import generateRssXml from './templates/Rss';

interface PostData {
    title: string;
    date: string;
    permalink: string;
    content: string;
    slug: string;
    filePath: string;
    isMdx: boolean;
}



// Ensure directory exists
async function ensureDir(dirPath: string) {
    try {
        await mkdir(dirPath, { recursive: true });
    } catch (error) {
        // Directory might already exist
    }
}

// Write HTML file
async function writeHtmlFile(filePath: string, content: string) {
    await ensureDir(dirname(filePath));
    await writeFile(filePath, `<!DOCTYPE html>${content}`);
}

// Process Markdown content to HTML using unified/remark
async function processMarkdownContent(markdownContent: string) {
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
        // Fallback to treating as HTML
        return markdownContent;
    }
}

// Process MDX content to HTML
async function processMdxContent(mdxContent: string) {
    try {
        // Use evaluate approach instead of compile for simpler MDX handling
        const { default: MdxComponent } = await evaluate(mdxContent, {
            development: false,
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
            jsx: React.createElement,
            jsxs: React.createElement,
            Fragment: React.Fragment
        });

        return renderToStaticMarkup(React.createElement(MdxComponent));
    } catch (error) {
        console.error('Error processing MDX:', error);
        // Fallback to Markdown processing
        return await processMarkdownContent(mdxContent);
    }
}

// Process blog posts (supports both .md and .mdx)
async function processPosts() {
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

            // Extract date and slug from filename (YYYY-MM-DD-slug.md/mdx)
            const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.(md|mdx)$/);
            if (!match) {
                console.warn(`Skipping file with invalid name format: ${filename}`);
                continue;
            }

            const [, date, slug] = match;
            const permalink = frontmatter.permalink || `/${slug}/`;

            const post: PostData = {
                title: frontmatter.title || slug,
                date,
                permalink,
                content,
                slug,
                filePath,
                isMdx
            };

            posts.push(post);

            // Generate individual post HTML
            const processedContent = isMdx
                ? await processMdxContent(content)
                : await processMarkdownContent(content);

            const postHtml = renderToStaticMarkup(
                React.createElement(Post, {
                    title: post.title,
                    date: post.date,
                    permalink: post.permalink,
                    children: React.createElement('div', {
                        dangerouslySetInnerHTML: { __html: processedContent }
                    })
                })
            );

            // Write post file
            const outputPath = join('dist', permalink.slice(1), 'index.html');
            await writeHtmlFile(outputPath, postHtml);
        }

        console.log(`Processed ${posts.length} posts (${posts.filter(p => p.isMdx).length} MDX, ${posts.filter(p => !p.isMdx).length} Markdown)`);
        return posts;

    } catch (error) {
        console.error('Error processing posts:', error);
        return [];
    }
}

// Process static pages (supports both .md and .mdx)
async function processPages() {
    console.log('Processing static pages...');

    try {
        // Process all pages in content/pages/
        const pageFiles = await readdir('content/pages');

        for (const filename of pageFiles) {
            const ext = extname(filename);
            if (!ext.match(/\.(md|mdx)$/)) continue;

            const isMdx = ext === '.mdx';
            console.log(`Processing ${isMdx ? 'MDX' : 'Markdown'} page: ${filename}`);

            const filePath = join('content/pages', filename);
            const pageContent = await readFile(filePath, 'utf-8');
            const { data: frontmatter, content } = matter(pageContent);

            const processedContent = isMdx
                ? await processMdxContent(content)
                : await processMarkdownContent(content);

            const pageHtml = renderToStaticMarkup(
                React.createElement(Page, {
                    title: frontmatter.title || filename.replace(/\.(md|mdx)$/, ''),
                    showHeader: frontmatter.layout !== 'resume',
                    children: React.createElement('div', {
                        dangerouslySetInnerHTML: { __html: processedContent }
                    })
                })
            );

            // Determine output path from filename or frontmatter
            const baseName = filename.replace(/\.(md|mdx)$/, '');
            const permalink = frontmatter.permalink || `/${baseName}/`;
            const outputPath = join('dist', permalink.slice(1), 'index.html');

            await writeHtmlFile(outputPath, pageHtml);
            console.log(`Processed page: ${filename}`);
        }

    } catch (error) {
        console.error('Error processing pages:', error);
    }
}

// Generate homepage
async function generateHomepage(posts: PostData[]) {
    console.log('Generating homepage...');

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => b.date.localeCompare(a.date));

    // Process content for each post for the homepage
    const processedPosts = await Promise.all(
        sortedPosts.map(async (post) => {
            const processedContent = post.isMdx
                ? await processMdxContent(post.content)
                : await processMarkdownContent(post.content);
            return {
                ...post,
                processedContent
            };
        })
    );

    const homeHtml = renderToStaticMarkup(
        React.createElement(Home, {
            posts: processedPosts,
            title: 'zachwill.com'
        })
    );

    await writeHtmlFile('dist/index.html', homeHtml);
    console.log('Generated homepage');
}

// Generate RSS feed
async function generateRssFeed(posts: PostData[]) {
    console.log('Generating RSS feed...');

    const rssXml = generateRssXml({ posts });
    await writeFile('dist/atom.xml', rssXml);

    const postCount = posts.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 20).length;
    console.log(`Generated RSS feed with ${postCount} posts`);
}

// Copy assets
async function copyAssets() {
    console.log('Copying assets...');
    try {
        await ensureDir('dist/assets');
        await cp('src/assets', 'dist/assets', { recursive: true });

        // Copy root assets that GitHub Pages needs
        try {
            await cp('src/assets/favicon.ico', 'dist/favicon.ico');
            await cp('CNAME', 'dist/CNAME');
        } catch (error) {
            console.warn('Some optional assets not found:', error);
        }

        console.log('Assets copied');
    } catch (error) {
        console.error('Error copying assets:', error);
    }
}

// Main build function
async function build() {
    console.log('Starting build...');

    // Ensure dist directory exists
    await ensureDir('dist');

    // Process content
    const posts = await processPosts();
    await processPages();
    await generateHomepage(posts);
    await generateRssFeed(posts);
    await copyAssets();

    console.log(`✅ Build complete! Generated ${posts.length} posts, static pages, and RSS feed.`);
}

// Run the build
build().catch(console.error); 