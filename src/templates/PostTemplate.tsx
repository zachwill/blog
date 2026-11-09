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
    <article>
      <header className="post-header">
        <h1 className="wa-heading-xl post-title">
          {post.title}
        </h1>
        <time className="wa-body-s">
          {formatDate(post.date)}
        </time>
      </header>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export function MainFooter() {
  return (
    <a href="/datastar" style={{ width: 'var(--app-content-max-width)' }}>
      <wa-callout variant="brand" style={{ width: '100%' }}>
        <wa-icon slot="icon" name="rocket"></wa-icon>
        <div>
          <span style={{ fontFamily: 'var(--wa-font-family-longform)', fontWeight: 'var(--wa-font-weight-normal)', fontStyle: 'italic' }}>Author's Note:&nbsp;</span> Check out my recent deep dive on Datastar here &nbsp;<wa-icon name="arrow-up-right-from-square" style={{ fontSize: 'var(--wa-font-size-xs)' }}></wa-icon>
        </div>
      </wa-callout>
    </a>
  );
}