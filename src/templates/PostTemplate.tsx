import React from 'react';
import { About, AboutButton, formatDate } from '../components';

import type { Post } from '../components/types';

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
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.processedContent }} />
    </article>
  );
}

export function MainFooter() {
  return (
    <div id="about-post-footer">
      <div className="about-post-desktop">
        <About />
      </div>
      <AboutButton location="footer" />
    </div>
  );
}