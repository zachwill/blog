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

  return (
    <html lang="en" className="wa-cloak">
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
      </head>

      <body
        className="wa-palette-zach wa-theme-zach"
        data-class-wa-dark="window.matchMedia('(prefers-color-scheme: dark)').matches"
      >
        {/*
          WHY THIS IS BETTER:
          - We remove `disable-navigation-toggle` and `view="desktop"`. The component handles these automatically.
          - We set the mobile breakpoint directly.
        */}
        <wa-page mobile-breakpoint="1080px">
          {/* 
            WHY THIS IS BETTER:
            - This is a direct child of wa-page.
            - We use `wa-split` as the top-level layout primitive for the header. No extra divs needed.
            - We use `wa-cluster` to group related items. It's more declarative than a div with flex properties.
          */}
          <header slot="header" className="wa-split">
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

          {/*
            - This content will ONLY appear at the top of the mobile navigation drawer.
            - We add `data-drawer="close"` to the link so it closes the menu if the user clicks it.
          */}
          <div slot="navigation-header" className="wa-mobile-only">
            <wa-tooltip for="zachwill-dot-com">Home</wa-tooltip>
            <a href="/" id="zachwill-dot-com" className="wa-cluster wa-align-items-center wa-gap-s" data-drawer="close">
              <wa-icon label="Home" name="home" style={{ color: 'var(--wa-color-brand)' }}></wa-icon>
              <span className="wa-heading-m">zachwill.com</span>
            </a>
          </div>

          {/*
            WHY THIS IS BETTER:
            - The `navigation` content is now wrapped in a semantic `<nav>` tag.
            - The component will automatically move this into a drawer on mobile.
          */}
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

          {/* 
            CORRECTED SLOT PLACEMENT:
            - The main content area is now correctly composed of three *direct children* of `<wa-page>`.
            - 1. A header for the main area (`main-header` slot)
            - 2. The main content itself (`main` in the default slot)
            - 3. A footer for the main area (`main-footer` slot)
          */}

          {/* This is an optional header that appears *above* your main content. We can leave it empty if not needed. */}
          {/* <header slot="main-header">
              ... could put a title here ...
          </header> */}

          {/* The default slot is for your primary content. */}
          <main>
            {contentData.type === 'post' ? (
              <Post contentData={contentData} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: contentData.content }} />
            )}
          </main>

          {/* This footer appears directly below the main content, but before the page footer. */}
          <footer slot="main-footer">
            {/* <About /> */}
          </footer>

        </wa-page>
      </body>
    </html>
  );
}