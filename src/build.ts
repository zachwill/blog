import { readdir, readFile, writeFile, mkdir, cp } from 'fs/promises';
import { join, basename, dirname, extname } from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { compile } from '@mdx-js/mdx';
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
    isMdx: boolean;
}

interface PageData {
    title: string;
    permalink: string;
    content: string;
    layout?: string;
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
        const compiledMdx = await compile(mdxContent, {
            outputFormat: 'function-body',
            development: false,
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight]
        });

        // Create a simple function to execute the compiled MDX
        const mdxFunction = new Function('React', String(compiledMdx));
        const MdxComponent = mdxFunction(React);

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
        const postFiles = await readdir('_posts');

        for (const filename of postFiles) {
            const ext = extname(filename);
            if (!ext.match(/\.(md|mdx)$/)) continue;

            const isMdx = ext === '.mdx';
            console.log(`Processing ${isMdx ? 'MDX' : 'Markdown'} post: ${filename}`);

            const filePath = join('_posts', filename);
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
        // Check for both .md and .mdx versions of pages
        const pageFiles = ['resume.md', 'resume.mdx', 'about.md', 'about.mdx'];

        for (const filename of pageFiles) {
            try {
                const isMdx = filename.endsWith('.mdx');
                const pageContent = await readFile(filename, 'utf-8');
                const { data: frontmatter, content } = matter(pageContent);

                console.log(`Processing ${isMdx ? 'MDX' : 'Markdown'} page: ${filename}`);

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

            } catch (error) {
                // File doesn't exist, skip silently
                continue;
            }
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

    const homeContent = React.createElement('div', null,
        processedPosts.map(post =>
            React.createElement('section', { key: post.slug },
                React.createElement('h2', null,
                    React.createElement('a', { href: post.permalink }, post.title),
                    post.isMdx && React.createElement('small', {
                        style: { marginLeft: '8px', fontSize: '0.6em', color: '#007aff', fontWeight: 'normal' }
                    }, 'MDX')
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

// Generate RSS feed
async function generateRssFeed(posts: PostData[]) {
    console.log('Generating RSS feed...');

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => b.date.localeCompare(a.date));
    const latestPosts = sortedPosts.slice(0, 20); // Latest 20 posts

    // Get the latest post date for the feed
    const lastBuildDate = latestPosts[0]?.date ? new Date(latestPosts[0].date).toUTCString() : new Date().toUTCString();

    const rssItems = latestPosts.map(post => {
        const postDate = new Date(post.date).toUTCString();
        const fullUrl = `http://zachwill.com${post.permalink}`;

        return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${fullUrl}</link>
      <guid>${fullUrl}</guid>
      <pubDate>${postDate}</pubDate>
      <description>${escapeXml(post.content.substring(0, 200) + '...')}</description>
    </item>`;
    }).join('\n');

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>zachwill.com</title>
    <link>http://zachwill.com</link>
    <description>Zach Williams is a superhero currently based in Portland.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="http://zachwill.com/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

    await writeFile('dist/rss.xml', rssXml);
    console.log(`Generated RSS feed with ${latestPosts.length} posts`);
}

// Helper function to escape XML characters
function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
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
    await generateRssFeed(posts);
    await copyAssets();

    console.log(`✅ Build complete! Generated ${posts.length} posts, static pages, and RSS feed.`);
}

// Run the build
build().catch(console.error); 