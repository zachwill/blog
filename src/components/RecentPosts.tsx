import React from 'react';
import type { Post } from './types';
import { formatDate } from './';

interface RecentPostsProps {
  posts: Post[];
  count?: number;
}

export function RecentPosts({ posts, count = 80 }: RecentPostsProps) {
  const recentPosts = posts.slice(0, count);

  return (
    <div className="wa-stack wa-gap-l">
      {recentPosts.map((post, index) => (
        <div key={post.slug} className="post-content">
          {/* Post Header */}
          <header className="post-header">
            <a href={post.permalink}>
              <h3 className="wa-heading-xl post-title">
                {post.title}
              </h3>
            </a>
            <time className="wa-body-s">
              {formatDate(post.date)}
            </time>
          </header>

          {/* Post Content */}
          <div className="post-body"
            dangerouslySetInnerHTML={{ __html: post.processedContent }} />

          {/* Post Separator */}
          {index < recentPosts.length - 1 && (
            <div style={{ marginTop: 'var(--wa-space-2xl)' }}>
              <wa-divider orientation="horizontal"></wa-divider>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 