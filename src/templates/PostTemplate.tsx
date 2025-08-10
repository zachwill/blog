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
          <h3 className="wa-heading-l">
            {post.title}
          </h3>
          <time className="wa-body-s">
            {formatDate(post.date)}
          </time>
        </div>
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
        <div className="wa-align-items-baseline">
          <span style={{ fontFamily: 'var(--wa-font-family-longform)', fontWeight: 'var(--wa-font-weight-normal)', fontStyle: 'italic' }}>Author's Note:&nbsp;</span> Check out my recent deep dive on Datastar here &nbsp;<wa-icon name="arrow-up-right-from-square" style={{ fontSize: 'var(--wa-font-size-xs)' }}></wa-icon>
        </div>
      </wa-callout>
    </a>
  );
}