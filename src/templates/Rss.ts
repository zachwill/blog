import siteConfig from '../site.config';

interface RssPost {
    title: string;
    date: string;
    permalink: string;
    content: string;
    slug: string;
}

interface RssTemplateProps {
    posts: RssPost[];
    maxPosts?: number;
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

export default function generateRssFeed({ posts, maxPosts = 20 }: RssTemplateProps): string {
    // Sort posts by date (newest first) and limit
    const sortedPosts = posts
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, maxPosts);

    // Get the latest post date for the feed
    const lastBuildDate = sortedPosts[0]?.date
        ? new Date(sortedPosts[0].date).toUTCString()
        : new Date().toUTCString();

    const rssItems = sortedPosts.map(post => {
        const postDate = new Date(post.date).toUTCString();
        const fullUrl = `${siteConfig.url}${post.permalink}`;
        const description = post.content.substring(0, 200) + '...';

        return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${fullUrl}</link>
      <guid>${fullUrl}</guid>
      <pubDate>${postDate}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteConfig.url}/atom.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;
} 