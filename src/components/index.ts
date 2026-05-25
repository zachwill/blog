// Export all MDX components
export { About } from './About';
export { RecentPosts } from './RecentPosts';

// Export layout components
export { Header } from './Header';
export { Nav } from './Nav';

// Export types
export type { Post } from './types';

// Shared utility functions
export const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Create the mdxComponents object for use in MDX evaluation
import { About } from './About';
import { RecentPosts } from './RecentPosts';

export const mdxComponents = {
    About,
    RecentPosts,
}; 