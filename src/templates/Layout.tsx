import React from 'react';
import siteConfig from '../site.config';
import { formatDate } from '../components';

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
    <html lang="en" className="wa-cloak">
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
              <wa-tooltip for="zachwill">zachwill.com</wa-tooltip>
              <a href="/">
                <wa-button id="zachwill" appearance="plain" size="small">
                  <div className="wa-flex wa-align-items-center wa-gap-s">
                    <wa-icon name="bolt" style={{ color: 'var(--wa-color-brand)' }}></wa-icon>
                    <span className="wa-heading-m">Zach Williams</span>
                  </div>
                </wa-button>
              </a>
            </div>

            <div id="app-toolbar" className="wa-flex wa-gap-xs">
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">
                <wa-tooltip for="zach-twitter">Twitter</wa-tooltip>
                <wa-button id="zach-twitter" appearance="plain" size="small">
                  <wa-icon name="at" label="Twitter"></wa-icon>
                </wa-button>
              </a>

              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                <wa-tooltip for="zach-github">GitHub</wa-tooltip>
                <wa-button id="zach-github" appearance="plain" size="small">
                  <wa-icon name="code" label="GitHub"></wa-icon>
                </wa-button>
              </a>
            </div>
          </header>

          <div slot="navigation-header" className="wa-mobile-only">
            <wa-tooltip for="zachwill-mobile">zachwill.com</wa-tooltip>
            <a href="/">
              <wa-button id="zachwill-mobile" appearance="plain" size="small">
                <div className="wa-flex wa-align-items-center wa-gap-s">
                  <wa-icon name="home" style={{ color: 'var(--wa-color-brand)' }}></wa-icon>
                  <span className="wa-heading-m">zachwill.com</span>
                </div>
              </wa-button>
            </a>
          </div>

          {/* Navigation Sidebar */}
          <div slot="navigation" id="nav">
            {/* Posts by Year */}
            <div className="nav-section">
              {Object.entries(navigationData.postsByYear)
                .sort(([a], [b]) => b.localeCompare(a)) // Sort years descending
                .map(([year, posts]) => (
                  <div>
                    <h2>{year}</h2>
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
                  </div>
                ))}
            </div>
          </div>

          {/* Main Content */}
          <main>
            {/* Main Header */}
            <div id="main" slot="main-content">
              {/* if this is a post, show the title */}
              {contentData.type === 'post' && (
                <>
                  <div className="wa-desktop-only wa-split wa-align-items-baseline" style={{ marginBottom: 'var(--wa-space-l)' }}>
                    <h1 className="wa-heading-xl">{contentData.title}</h1>
                    {contentData.metadata?.date && (
                      <time className="wa-body-s"
                        style={{
                          color: 'var(--wa-color-neutral-500)',
                          fontStyle: 'italic'
                        }}>
                        {formatDate(contentData.metadata.date)}
                      </time>
                    )}
                  </div>
                  <div className="wa-mobile-only wa-stack wa-gap-s" style={{ marginBottom: 'var(--wa-space-m)' }}>
                    <h1 className="wa-heading-xl">{contentData.title}</h1>
                    {contentData.metadata?.date && (
                      <time className="wa-body-s"
                        style={{
                          color: 'var(--wa-color-neutral-500)',
                          fontStyle: 'italic'
                        }}>
                        {formatDate(contentData.metadata.date)}
                      </time>
                    )}
                  </div>
                </>
              )}
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
    </html >
  );
} 