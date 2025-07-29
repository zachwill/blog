import React from 'react';

interface NavigationData {
  postsByYear: {
    [year: string]: {
      title: string;
      permalink: string;
      date: string;
      slug: string;
    }[];
  };
  pages: {
    title: string;
    permalink: string;
  }[];
}

interface NavProps {
  navigationData: NavigationData;
  currentPath: string;
}

export function Nav({ navigationData, currentPath }: NavProps) {
  return (
    <>
      <div slot="navigation-header" className="wa-mobile-only">
        <wa-tooltip for="zachwill-dot-com">Home</wa-tooltip>
        <a href="/" id="zachwill-dot-com" className="wa-cluster wa-align-items-center wa-gap-s" data-drawer="close">
          <wa-icon label="Home" name="home" style={{ color: 'var(--wa-color-brand)' }}></wa-icon>
          <span className="wa-heading-m">zachwill.com</span>
        </a>
      </div>

      <nav slot="navigation">
        {Object.entries(navigationData.postsByYear)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([year, posts]) => (
            <div className="nav-section" key={year}>
              <h2>{year}</h2>
              <ul className="posts-list">
                {posts.map(post => (
                  <li key={post.permalink}>
                    <a
                      href={post.permalink}
                      className={currentPath === post.permalink ? 'current' : ''}
                      data-drawer="close"
                    >
                      {post.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </nav>
    </>
  );
} 