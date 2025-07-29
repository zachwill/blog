import React from 'react';
import siteConfig from '../site.config';
import { Post } from './Post';
import { About } from '@/components/About';
import { SlotContent } from '@/types/slots';

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
  slotContent?: SlotContent;
}


export default function AppShell({
  title,
  navigationData,
  contentData,
  currentPath,
  slotContent
}: AppShellProps) {
  const pageTitle = title || siteConfig.title;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>⚡️ {pageTitle}</title>
        <meta name="author" content={siteConfig.author} />
        <meta name="description" content={siteConfig.description} />
        <link href="/atom.xml" rel="alternate" title="zachwill" type="application/atom+xml" />
        <link rel="stylesheet" href={`${siteConfig.webawesome.cdnBase}/styles/webawesome.css`} />
        <link rel="stylesheet" href="/assets/content.css" />
        <script type="module" src={`${siteConfig.webawesome.cdnBase}/webawesome.ssr-loader.js`}></script>
        <script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"></script>
        <script type="module" src="/assets/inspector.js"></script>
      </head>

      <body
        className="wa-palette-zach wa-theme-zach wa-cloak"
        data-signals-webawesome="!document.querySelector('body').classList.contains('wa-cloak')"
        data-class-wa-dark="window.matchMedia('(prefers-color-scheme: dark)').matches"
        data-effect="if ($webawesome) {
          const nav = document.querySelector('nav .current');
          const article = document.querySelector('main h1');
          if (nav) {
            nav.scrollIntoView({ behavior: 'smooth' });
            article.scrollIntoView({ behavior: 'instant' });
          }
        }"
        {...{
          "data-on-wa-discovery-complete": "$webawesome = !document.querySelector('body').classList.contains('wa-cloak')"
        }}
      >
        <datastar-inspector></datastar-inspector>
        <wa-page mobile-breakpoint="1080px">
          {/* Render custom banner slot if provided */}
          {slotContent?.banner && (
            <div slot="banner">
              {slotContent.banner}
            </div>
          )}

          {/* Render custom header or default header */}
          {slotContent?.header ? (
            <header slot="header">
              {slotContent.header}
            </header>
          ) : (
            <header slot="header" className="wa-split top-header">
              <div className="wa-cluster wa-align-items-center">
                {/* This toggle button is now simpler and correctly placed. */}
                <wa-button appearance="plain" size="small" data-toggle-nav>
                  <wa-icon name="bars" label="Toggle navigation"></wa-icon>
                </wa-button>

                {/*
                WHY THIS IS BETTER:
                - The home link is a simple `<a>` tag styled with layout utilities. 
                - No need for a complex button-within-a-button structure.
                - This is more semantic and accessible.
              */}
                <wa-tooltip for="zachwill">zachwill.com</wa-tooltip>
                <a href="/" id="zachwill" className="wa-cluster wa-align-items-center wa-gap-s">
                  <wa-icon label="Lightning" name="bolt" style={{ color: 'var(--wa-color-brand)' }}></wa-icon>
                  <span className="wa-heading-m">Zach Williams</span>
                </a>
              </div>

              <div className="wa-cluster wa-gap-xs">
                <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">
                  <wa-button id="zach-twitter" appearance="plain" size="small" aria-label="Twitter">
                    <wa-icon label="Twitter" name="at"></wa-icon>
                  </wa-button>
                  <wa-tooltip for="zach-twitter">Twitter</wa-tooltip>
                </a>
                <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                  <wa-button id="zach-github" appearance="plain" size="small" aria-label="GitHub">
                    <wa-icon label="GitHub" name="code"></wa-icon>
                  </wa-button>
                  <wa-tooltip for="zach-github">GitHub</wa-tooltip>
                </a>
              </div>
            </header>
          )}

          {/* Render custom subheader slot if provided */}
          {slotContent?.subheader && (
            <div slot="subheader">
              {slotContent.subheader}
            </div>
          )}

          {/* Render custom navigation-header or default */}
          {slotContent?.['navigation-header'] ? (
            <div slot="navigation-header">
              {slotContent['navigation-header']}
            </div>
          ) : (
            <div slot="navigation-header" className="wa-mobile-only">
              <wa-tooltip for="zachwill-dot-com">Home</wa-tooltip>
              <a href="/" id="zachwill-dot-com" className="wa-cluster wa-align-items-center wa-gap-s" data-drawer="close">
                <wa-icon label="Home" name="home" style={{ color: 'var(--wa-color-brand)' }}></wa-icon>
                <span className="wa-heading-m">zachwill.com</span>
              </a>
            </div>
          )}

          {/* Render custom navigation or default */}
          {slotContent?.navigation ? (
            <nav slot="navigation">
              {slotContent.navigation}
            </nav>
          ) : (
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
                            // This is the "pro-tip" for closing the drawer on navigation
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
          )}

          {/* Render custom navigation-footer slot if provided */}
          {slotContent?.['navigation-footer'] && (
            <div slot="navigation-footer">
              {slotContent['navigation-footer']}
            </div>
          )}

          {/* 
            CORRECTED SLOT PLACEMENT:
            - The main content area is now correctly composed of three *direct children* of `<wa-page>`.
            - 1. A header for the main area (`main-header` slot)
            - 2. The main content itself (`main` in the default slot)
            - 3. A footer for the main area (`main-footer` slot)
          */}

          {/* Render custom main-header slot if provided */}
          {slotContent?.['main-header'] && (
            <header slot="main-header">
              {slotContent['main-header']}
            </header>
          )}

          {/* Render custom main content or default content */}
          {slotContent?.main ? (
            <main>
              {slotContent.main}
            </main>
          ) : (
            <main>
              {contentData.type === 'post' ? (
                <Post contentData={contentData} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: contentData.content }} />
              )}
            </main>
          )}

          {/* Render custom main-footer or default */}
          {slotContent?.['main-footer'] ? (
            <footer slot="main-footer">
              {slotContent['main-footer']}
            </footer>
          ) : (
            <footer slot="main-footer">
              {contentData.type === 'post' && (
                <div className="wa-stack wa-gap-l" style={{ width: '80ch', margin: '0 auto', padding: '0 var(--wa-space-l)' }}>
                  <wa-divider></wa-divider>
                  <About heading="m" fontSize="m" gap="s" />
                </div>
              )}
            </footer>
          )}

          {/* Render custom aside slot if provided */}
          {slotContent?.aside && (
            <aside slot="aside">
              {slotContent.aside}
            </aside>
          )}

          {/* Render custom footer slot if provided */}
          {slotContent?.footer && (
            <footer slot="footer">
              {slotContent.footer}
            </footer>
          )}

        </wa-page>
      </body>
    </html >
  );
}
