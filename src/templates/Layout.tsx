import React from 'react';
import siteConfig from '../site.config';
import { Header, Nav } from '../components';
import { SlotContent, OpenGraphData } from '@/types/slots';

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

interface LayoutProps {
  title?: string;
  navigationData: NavigationData;
  contentData: ContentData;
  currentPath: string;
  slotContent?: SlotContent;
  openGraph?: OpenGraphData;
}


export default function Layout({
  title,
  navigationData,
  contentData,
  currentPath,
  slotContent,
  openGraph
}: LayoutProps) {
  const pageTitle = title || siteConfig.title;

  // Build OpenGraph metadata with sensible defaults
  const ogData = {
    title: openGraph?.title || pageTitle,
    description: openGraph?.description || siteConfig.description,
    image: openGraph?.image ? `${siteConfig.url}${openGraph.image}` : undefined,
    imageAlt: openGraph?.imageAlt,
    url: openGraph?.url || `${siteConfig.url}${currentPath}`,
    type: openGraph?.type || 'website',
    siteName: openGraph?.siteName || siteConfig.title,
    locale: openGraph?.locale || 'en_US',
    twitterCard: openGraph?.twitterCard || 'summary_large_image',
    twitterSite: openGraph?.twitterSite || '@zachwill',
    twitterCreator: openGraph?.twitterCreator || '@zachwill',
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <meta name="author" content={siteConfig.author} />
        <meta name="description" content={ogData.description} />
        <link href="/atom.xml" rel="alternate" title="zachwill" type="application/atom+xml" />

        {/* Favicon links */}
        <link rel="icon" href="/assets/favicon.svg" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/assets/manifest.json" />

        {/* Apple Touch Icon and PWA meta tags for iOS */}
        <link rel="apple-touch-icon" href="/assets/Icon.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/assets/Icon.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/assets/Icon@2x.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="zachwill" />

        {/* OpenGraph meta tags */}
        <meta property="og:title" content={ogData.title} />
        <meta property="og:description" content={ogData.description} />
        <meta property="og:url" content={ogData.url} />
        <meta property="og:type" content={ogData.type} />
        <meta property="og:site_name" content={ogData.siteName} />
        <meta property="og:locale" content={ogData.locale} />
        {ogData.image && (
          <>
            <meta property="og:image" content={ogData.image} />
            {ogData.imageAlt && <meta property="og:image:alt" content={ogData.imageAlt} />}
          </>
        )}

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content={ogData.twitterCard} />
        <meta name="twitter:title" content={ogData.title} />
        <meta name="twitter:description" content={ogData.description} />
        {ogData.twitterSite && <meta name="twitter:site" content={ogData.twitterSite} />}
        {ogData.twitterCreator && <meta name="twitter:creator" content={ogData.twitterCreator} />}
        {ogData.image && <meta name="twitter:image" content={ogData.image} />}
        {ogData.imageAlt && <meta name="twitter:image:alt" content={ogData.imageAlt} />}
        <link rel="stylesheet" href={`${siteConfig.webawesome.cdnBase}/styles/webawesome.css`} />
        <link rel="stylesheet" href="/assets/content.css" />
        <script type="module" src={`${siteConfig.webawesome.cdnBase}/webawesome.ssr-loader.js`}></script>
        <script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"></script>
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
          "data-on-load__delay.200ms": "$webawesome = !document.querySelector('body').classList.contains('wa-cloak')"
        }}
      >
        <wa-page mobile-breakpoint="1080px">
          {/* Render custom banner slot if provided */}
          {slotContent?.banner && (
            <div slot="banner">
              {slotContent.banner}
            </div>
          )}

          {/* Render custom header or default header */}
          {slotContent?.header ? (
            <div>{slotContent.header}</div>
          ) : (
            <Header />
          )}

          {/* Render custom subheader slot if provided */}
          {slotContent?.subheader && (
            <div slot="subheader">
              {slotContent.subheader}
            </div>
          )}

          {/* Render custom navigation or default */}
          {slotContent?.navigation || slotContent?.['navigation-header'] ? (
            <>
              {slotContent['navigation-header'] && (
                <div>{slotContent['navigation-header']}</div>
              )}
              {slotContent.navigation && (
                <div>{slotContent.navigation}</div>
              )}
            </>
          ) : (
            <Nav navigationData={navigationData} currentPath={currentPath} />
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
            <main>{slotContent.main}</main>
          ) : (
            <main>
              <div dangerouslySetInnerHTML={{ __html: contentData.content }} />
            </main>
          )}

          {/* Render custom main-footer or default */}
          {slotContent?.['main-footer'] && (
            <footer slot="main-footer">
              {slotContent['main-footer']}
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
