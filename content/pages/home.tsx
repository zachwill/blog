import React from 'react';
import { About, RecentPosts } from '../../src/components';
import type { Post } from '../../src/components/types';

export const config = {
  title: "Zach Williams",
  permalink: "/"
};

interface MainProps {
  posts: Post[];
  favoritePostSlugs: string[];
}

export function Main({ posts }: MainProps) {
  return (
    <div className="wa-stack wa-gap-xl">
      <About />
      <wa-divider></wa-divider>
      <RecentPosts posts={posts} count={80} />
    </div>
  );
} 