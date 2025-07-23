import React from 'react';
import Layout from './Layout';

interface ProcessedPost {
  title: string;
  date: string;
  permalink: string;
  content: string;
  slug: string;
  filePath: string;
  isMdx: boolean;
  processedContent: string;
}

interface HomeProps {
  posts: ProcessedPost[];
  title?: string;
}

export default function Home({ posts, title = 'zachwill.com' }: HomeProps) {
  return (
    <Layout title={title} showHeader={true}>
      <div>
        {posts.map(post => (
          <section key={post.slug}>
            <h2>
              <a href={post.permalink}>{post.title}</a>
            </h2>
            <div dangerouslySetInnerHTML={{ __html: post.processedContent }} />
          </section>
        ))}
      </div>
    </Layout>
  );
} 