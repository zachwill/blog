import React from 'react';
import { Post } from './types';

interface RecentPostsProps {
  posts: Post[];
  count?: number;
}

export function RecentPosts({ posts, count = 80 }: RecentPostsProps) {
  const recentPosts = posts.slice(0, count);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="wa-stack wa-gap-xl">
      {recentPosts.map((post, index) => (
        <div key={post.slug} className="post-content">
          {/* Post Header */}
          <header>
            <div className="wa-desktop-only wa-split wa-align-items-baseline" style={{ marginBottom: 'var(--wa-space-l)' }}>
              <a href={post.permalink}>
                <h3 className="wa-heading-xl">
                  {post.title}
                </h3>
              </a>
              <time className="wa-body-s"
                style={{
                  color: 'var(--wa-color-neutral-500)',
                  fontStyle: 'italic'
                }}>
                {formatDate(post.date)}
              </time>
            </div>
            <div className="wa-mobile-only wa-stack wa-gap-s" style={{ marginBottom: 'var(--wa-space-m)' }}>
              <a href={post.permalink}>
                <h3 className="wa-heading-l">
                  {post.title}
                </h3>
              </a>
              <time className="wa-body-s"
                style={{
                  color: 'var(--wa-color-neutral-500)',
                  fontStyle: 'italic'
                }}>
                {formatDate(post.date)}
              </time>
            </div>
          </header>

          {/* Post Content */}
          <div className="post-body"
            dangerouslySetInnerHTML={{ __html: post.processedContent }} />

          {/* Post Separator */}
          {index < recentPosts.length - 1 && (
            <div style={{
              margin: 'var(--wa-space-xl) 0',
              borderBottom: '2px solid var(--wa-color-neutral-200)',
              width: '100%'
            }} />
          )}
        </div>
      ))}
    </div>
  );
} 