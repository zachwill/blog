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
        <a href="/datastar">
          <wa-callout variant="brand">
            <wa-icon slot="icon" name="rocket"></wa-icon>
            <div className="wa-align-items-baseline">
              Notes on Datastar &nbsp;<wa-icon name="arrow-up-right-from-square" style={{ fontSize: 'var(--wa-font-size-xs)' }}></wa-icon>
            </div>
          </wa-callout>
        </a>
        <wa-divider></wa-divider>
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