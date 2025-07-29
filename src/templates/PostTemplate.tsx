import React from 'react';
import { formatDate } from '../components';

interface Post {
  title: string;
  date: string;
  permalink: string;
  content: string;
  slug: string;
  isFavorite?: boolean;
}

export const config = {
  type: 'post' as const
};

export function Main({ post }: { post: Post }) {
  return (
    <main>
      <article>
        <header>
          <div className="wa-desktop-only wa-split wa-align-items-baseline" style={{ marginBottom: 'var(--wa-space-l)' }}>
            <h1 className="wa-heading-xl">
              {post.title}
            </h1>
            <time className="wa-body-s">
              {formatDate(post.date)}
            </time>
          </div>
          <div className="wa-mobile-only wa-stack wa-gap-s" style={{ marginBottom: 'var(--wa-space-m)' }}>
            <a href={post.permalink}>
              <h3 className="wa-heading-l">
                {post.title}
              </h3>
            </a>
            <time className="wa-body-s">
              {formatDate(post.date)}
            </time>
          </div>
        </header>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  );
} 