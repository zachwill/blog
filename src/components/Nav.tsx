import React from 'react';
import { AboutButton } from './AboutButton';

interface NavigationData {
  postsByYear: {
    [year: string]: {
      title: string;
      permalink: string;
      date: string;
      slug: string;
    }[];
  };
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
          <wa-icon label="Home" name="bolt" style={{ color: 'var(--wa-color-brand)' }}></wa-icon>
          <span className="wa-heading-m">Zach Williams</span>
        </a>
      </div>

      <nav slot="navigation" aria-label="Post archive">
        <div className="wa-stack">
          {Object.entries(navigationData.postsByYear)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([year, posts]) => (
              <React.Fragment key={year}>
                <wa-details appearance="plain" open>
                  <div slot="summary">
                    <span className="wa-heading-s">{year}</span>
                  </div>
                  <ul>
                    {posts.map(post => (
                      <li key={post.permalink}>
                        <a
                          href={post.permalink}
                          className={currentPath === post.permalink ? 'current' : ''}
                          aria-current={currentPath === post.permalink ? 'page' : undefined}
                          data-drawer="close"
                        >
                          {post.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </wa-details>
              </React.Fragment>
            ))}
        </div>
      </nav>

      <div id="about-navigation-footer" slot="navigation-footer">
        <AboutButton location="sidebar" />
      </div>
    </>
  );
} 