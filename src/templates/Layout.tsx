import React from 'react';
import siteConfig from '../site.config';
import { Post } from './Post';
import { About } from '@/components/About';

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
        <title>⚡️ Zach Williams</title>
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
        {/* Datastar */}
        <script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"></script>
      </head>

      <body
        className={siteConfig.webawesome.theme}
        data-class-wa-dark="window.matchMedia('(prefers-color-scheme: dark)').matches"
      >
        <wa-page view="desktop" disable-navigation-toggle={true} mobile-breakpoint="1080">
          {/* Header */}
          <header slot="header" className="wa-split wa-align-items-center">
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
              {contentData.type === 'post' ? (
                <Post contentData={contentData} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: contentData.content }} />
              )}
            </div>

            <div id="main-footer" slot="main-footer">
              <div style={{ margin: 'var(--wa-space-2xl) 0 0' }}>
                <wa-divider orientation="horizontal"></wa-divider>
              </div>
              <div className="about">
                <About />
              </div>
            </div>
          </main>
        </wa-page>
      </body>
    </html >
  );
} 