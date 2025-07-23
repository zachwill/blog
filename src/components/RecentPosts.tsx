import React from 'react';
import { Post } from './types';

interface RecentPostsProps {
  posts: Post[];
  count?: number;
}

export function RecentPosts({ posts, count = 10 }: RecentPostsProps) {
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
    <div>
      <ul className="recent-posts-list">
        {recentPosts.map(post => (
          <li key={post.slug}>
            <a href={post.permalink}>{post.title}</a>
            <span className="post-date">{formatDate(post.date)}</span>
          </li>
        ))}
      </ul>
      <p><a href="/archive/">View all posts →</a></p>
    </div>
  );
} 