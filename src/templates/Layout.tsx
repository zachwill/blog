import React from 'react';
import siteConfig from '../site.config';

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

interface ContentData {
  type: 'post' | 'page' | 'home';
  title: string;
  content: string;
  metadata?: {
    date?: string;
    isFavorite?: boolean;
  };
}

interface AppShellProps {
  title?: string;
  navigationData: NavigationData;
  contentData: ContentData;
  currentPath: string;
}

export default function AppShell({
  title,
  navigationData,
  contentData,
  currentPath
}: AppShellProps) {
  const pageTitle = title || siteConfig.title;
  const isHomePage = currentPath === '/';

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <meta name="author" content={siteConfig.author} />
        <meta name="description" content={siteConfig.description} />

        {/* RSS Feed */}
        <link href="/atom.xml" rel="alternate" title="zachwill" type="application/atom+xml" />

        {/* WebAwesome CSS */}
        <link rel="stylesheet" href={`${siteConfig.webawesome.cdnBase}/styles/webawesome.css`} />

        {/* Custom CSS for content styling */}
        <link rel="stylesheet" href="/assets/content.css" />

        {/* WebAwesome JavaScript */}
        <script type="module" src={`${siteConfig.webawesome.cdnBase}/webawesome.ssr-loader.js`}></script>

        {/* Content data for client-side routing */}
        <script
          type="application/json"
          id="navigation-data"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationData) }}
        />
        <script
          type="application/json"
          id="content-data"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contentData) }}
        />
      </head>

      <body className={siteConfig.webawesome.theme}>
        <wa-page view="desktop" disable-navigation-toggle="" mobile-breakpoint="1180">
          {/* Header */}
          <header slot="header" className="wa-split">
            <div id="app-branding" className="wa-align-items-center">
              <wa-button appearance="plain" size="small" data-toggle-nav="">
                <wa-icon name="bars" label="Toggle navigation"></wa-icon>
              </wa-button>
              <a href="/">
                <div className="wa-flex wa-align-items-center wa-gap-s">
                  <wa-icon name="bolt" style={{ color: 'var(--wa-color-brand)' }}></wa-icon>
                  <span className="wa-heading-m">Zach Williams</span>
                </div>
              </a>
            </div>

            <div id="app-toolbar" className="wa-cluster">
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">
                <wa-button appearance="plain" size="small">
                  <wa-icon name="brand-twitter" label="Twitter/X"></wa-icon>
                </wa-button>
              </a>

              <wa-divider className="wa-mobile-only" orientation="vertical"></wa-divider>

              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                <wa-button appearance="plain" size="small">
                  <wa-icon name="brand-github" label="GitHub"></wa-icon>
                </wa-button>
              </a>

              <wa-divider className="wa-mobile-only" orientation="vertical"></wa-divider>

              <a href={`mailto:${siteConfig.social.email}`}>
                <wa-button appearance="plain" size="small">
                  <wa-icon name="envelope" label="Email"></wa-icon>
                </wa-button>
              </a>
            </div>
          </header>

          {/* Navigation Sidebar */}
          <div slot="navigation" id="nav">
            <div className="navigation-content">
              {/* Home Link */}
              <div className="nav-section">
                <h3><a href="/" className={isHomePage ? 'current' : ''}>Home</a></h3>
              </div>

              {/* Pages */}
              {navigationData.pages.length > 0 && (
                <div className="nav-section">
                  <h3>Pages</h3>
                  <ul>
                    {navigationData.pages.map(page => (
                      <li key={page.permalink}>
                        <a
                          href={page.permalink}
                          className={currentPath === page.permalink ? 'current' : ''}
                        >
                          {page.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Posts by Year */}
              <div className="nav-section">
                <h3>Posts</h3>
                {Object.entries(navigationData.postsByYear)
                  .sort(([a], [b]) => b.localeCompare(a)) // Sort years descending
                  .map(([year, posts]) => (
                    <details key={year} open={year === new Date().getFullYear().toString()}>
                      <summary className="year-header">{year}</summary>
                      <ul className="posts-list">
                        {posts.map(post => (
                          <li key={post.permalink}>
                            <a
                              href={post.permalink}
                              className={currentPath === post.permalink ? 'current' : ''}
                            >
                              {post.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main>
            {/* Main Header */}
            <div slot="main-header" className="wa-flex wa-align-items-center wa-gap-m"
              style={{ marginBlockEnd: 'var(--wa-space-l)' }}>
              <wa-badge appearance="filled"
                style={{
                  fontSize: 'var(--wa-font-size-xl)',
                  backgroundColor: 'var(--wa-color-purple-90)'
                }}>
                <wa-icon name="bolt" style={{ color: 'var(--wa-color-purple-50)' }}></wa-icon>
              </wa-badge>
              <span className="wa-heading-xl">{contentData.title}</span>
            </div>

            {/* Content Area */}
            <div className="content-area">
              <div dangerouslySetInnerHTML={{ __html: contentData.content }} />
            </div>
          </main>
        </wa-page>

        {/* Client-side routing script for future enhancement */}
        <script dangerouslySetInnerHTML={{
          __html: `
          // Basic navigation handling - can be enhanced later
          document.addEventListener('DOMContentLoaded', function() {
            console.log('WebAwesome blog shell loaded');
          });
        ` }} />
      </body>
    </html>
  );
} 