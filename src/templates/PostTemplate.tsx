import React from 'react';
import { About, AboutButton, formatDate } from '../components';

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
    <div id="about-post-footer">
      <div className="about-post-desktop">
        <About />
      </div>
      <AboutButton location="footer" />
    </div>
  );
}