import React from 'react';
import { Post } from './types';

interface FavoritePostsProps {
  posts: Post[];
  favoritePostSlugs: string[];
}

export function FavoritePosts({ posts, favoritePostSlugs }: FavoritePostsProps) {
  const favoritePosts = posts.filter(post =>
    favoritePostSlugs.includes(post.slug)
  );

  if (favoritePosts.length === 0) {
    return (
      <div>
        <p><em>Coming soon - I'll curate some favorite posts here.</em></p>
      </div>
    );
  }

  return (
    <div className="favorites-grid">
      {favoritePosts.map(post => (
        <article key={post.slug} className="favorite-post">
          <h3><a href={post.permalink}>{post.title}</a></h3>
          <div className="post-excerpt">
            {post.processedContent.length > 200
              ? `${post.processedContent.substring(0, 200)}...`
              : post.processedContent
            }
          </div>
        </article>
      ))}
    </div>
  );
} 