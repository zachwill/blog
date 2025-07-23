// Export all MDX components
export { FavoritePosts } from './FavoritePosts';
export { RecentPosts } from './RecentPosts';

// Export types
export type { Post } from './types';

// Create the mdxComponents object for use in MDX evaluation
import { FavoritePosts } from './FavoritePosts';
import { RecentPosts } from './RecentPosts';

export const mdxComponents = {
    FavoritePosts,
    RecentPosts,
}; 