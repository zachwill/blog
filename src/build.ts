import { readdir, readFile, writeFile, mkdir, cp } from 'fs/promises';
import { join, basename, dirname } from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Post from './templates/Post';
import Page from './templates/Page';
import Layout from './templates/Layout';

interface PostData {
    title: string;
    date: string;
    permalink: string;
    content: string;
    slug: string;
    filePath: string;
}

interface PageData {
    title: string;
    permalink: string;
    content: string;
    layout?: string;
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

// Process blog posts
async function processPosts() {
    console.log('Processing blog posts...');
    const posts: PostData[] = [];

    try {
        const postFiles = await readdir('_posts');

        for (const filename of postFiles) {
            if (!filename.endsWith('.md')) continue;

            console.log(`Processing post: ${filename}`);
            const filePath = join('_posts', filename);
            const fileContent = await readFile(filePath, 'utf-8');
            const { data: frontmatter, content } = matter(fileContent);

            // Extract date and slug from filename (YYYY-MM-DD-slug.md)
            const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
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
                filePath
            };

            posts.push(post);

            // Generate individual post HTML
            const processedContent = await processMarkdownContent(content);
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

        console.log(`Processed ${posts.length} posts`);
        return posts;

    } catch (error) {
        console.error('Error processing posts:', error);
        return [];
    }
}

// Process static pages
async function processPages() {
    console.log('Processing static pages...');

    try {
        // Process resume page
        const resumeContent = await readFile('resume.md', 'utf-8');
        const { data: resumeFrontmatter, content: resumeMarkdown } = matter(resumeContent);

        const processedResumeContent = await processMarkdownContent(resumeMarkdown);
        const resumeHtml = renderToStaticMarkup(
            React.createElement(Page, {
                title: resumeFrontmatter.title || 'Resume',
                showHeader: resumeFrontmatter.layout !== 'resume', // Resume layout doesn't show header
                children: React.createElement('div', {
                    dangerouslySetInnerHTML: { __html: processedResumeContent }
                })
            })
        );

        await writeHtmlFile('dist/resume/index.html', resumeHtml);
        console.log('Processed resume page');

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
            const processedContent = await processMarkdownContent(post.content);
            return {
                ...post,
                processedContent
            };
        })
    );

    const homeContent = React.createElement('div', null,
        processedPosts.map(post =>
            React.createElement('section', { key: post.slug },
                React.createElement('h2', null,
                    React.createElement('a', { href: post.permalink }, post.title)
                ),
                React.createElement('div', {
                    dangerouslySetInnerHTML: { __html: post.processedContent }
                })
            )
        )
    );

    const homeHtml = renderToStaticMarkup(
        React.createElement(Layout, {
            title: 'zachwill.com',
            showHeader: true,
            children: homeContent
        })
    );

    await writeHtmlFile('dist/index.html', homeHtml);
    console.log('Generated homepage');
}

// Copy assets
async function copyAssets() {
    console.log('Copying assets...');
    try {
        await ensureDir('dist/assets');
        await cp('src/assets', 'dist/assets', { recursive: true });

        // Also copy favicon and other root assets
        try {
            await cp('favicon.ico', 'dist/favicon.ico');
            await cp('CNAME', 'dist/CNAME');
            await cp('atom.xml', 'dist/atom.xml');
        } catch (error) {
            // These files might not exist, that's okay
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
    await copyAssets();

    console.log(`✅ Build complete! Generated ${posts.length} posts and static pages.`);
}

// Run the build
build().catch(console.error); 