import type { ComponentProps, ComponentType, ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import type { Post } from './components/types';
import Layout from './templates/Layout';
import { Main as PostMain, MainFooter as PostFooter } from './templates/PostTemplate';
import generateRssXml from './templates/Rss';

type LayoutProps = ComponentProps<typeof Layout>;
type PageModule = {
    config: { title: string; permalink: string; openGraph?: LayoutProps['openGraph'] };
    Main: ComponentType<{ posts: Post[] }>;
    MainFooter?: ComponentType;
};

function permalinkFor(path: string) {
    const parts = path.split('/').filter(Boolean);
    if (parts.some(part => part === '.' || part === '..') || /[?#\\]/.test(path)) {
        throw new Error(`Invalid permalink: ${path}`);
    }
    return parts.length ? `/${parts.join('/')}/` : '/';
}

async function readMarkdown(path: string) {
    const { data, content } = matter(await Bun.file(path).text());
    return { data, content, processedContent: Bun.markdown.html(content, { autolinks: true }) };
}

const [postFiles, pageFiles] = await Promise.all([readdir('content/posts'), readdir('content/pages')]);
const posts: (Post & { content: string })[] = [];
for (const file of postFiles.filter(file => file.endsWith('.md'))) {
    const match = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/.exec(file);
    if (!match) throw new Error(`Expected YYYY-MM-DD-slug.md: content/posts/${file}`);
    const [, date, slug] = match;
    const { data, content, processedContent } = await readMarkdown(`content/posts/${file}`);
    posts.push({
        title: data.title || slug.replace(/-/g, ' '),
        permalink: permalinkFor(data.permalink || slug),
        date, slug, content, processedContent,
    });
}
posts.sort((a, b) => b.date.localeCompare(a.date));

const postsByYear: LayoutProps['navigationData']['postsByYear'] = {};
for (const post of posts) (postsByYear[post.date.slice(0, 4)] ??= []).push(post);

const outputPaths = new Set<string>();
async function writePage(title: string, permalink: string, main: ReactNode, footer?: ReactNode, openGraph?: LayoutProps['openGraph']) {
    const output = join('dist', permalink.slice(1), 'index.html');
    if (outputPaths.has(output)) throw new Error(`Duplicate permalink: ${permalink}`);
    outputPaths.add(output);
    const html = renderToStaticMarkup(
        <Layout title={title} currentPath={permalink} navigationData={{ postsByYear }} footer={footer} openGraph={openGraph}>
            {main}
        </Layout>,
    );
    // React 18 emits className for custom elements.
    await Bun.write(output, `<!DOCTYPE html>${html.replace(/className=/g, 'class=')}`);
}

await rm('dist', { recursive: true, force: true });
for (const post of posts) {
    await writePage(`${post.title} | zachwill.com`, post.permalink, <PostMain post={post} />, <PostFooter />);
}
for (const file of pageFiles) {
    if (file.endsWith('.md')) {
        const slug = file.slice(0, -3);
        const { data, processedContent } = await readMarkdown(`content/pages/${file}`);
        await writePage(data.title || slug.replace(/-/g, ' '), permalinkFor(data.permalink || slug),
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />);
    } else if (file.endsWith('.tsx')) {
        const { config, Main, MainFooter }: PageModule = await import(`../content/pages/${file}`);
        if (!config?.title || typeof config.permalink !== 'string' || !config.permalink || !Main) {
            throw new Error(`content/pages/${file} must export config (title and permalink) and Main`);
        }
        await writePage(config.title, permalinkFor(config.permalink), <Main posts={posts} />,
            MainFooter && <MainFooter />, config.openGraph);
    }
}

await Bun.write('dist/atom.xml', generateRssXml({ posts }));
await Bun.write('dist/CNAME', await Bun.file('CNAME').text());
// Bun's fs.cp can emit source watch events on macOS and trigger another rebuild.
const copy = Bun.spawn(['cp', '-R', 'src/assets', 'dist'], { stderr: 'inherit' });
if (await copy.exited !== 0) throw new Error('Could not copy site assets');
console.log(`Built ${posts.length} posts and ${outputPaths.size - posts.length} pages into dist/`);
