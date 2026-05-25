import React, { ReactNode } from 'react';
import siteConfig from '../site.config';
import { Header, Nav } from '../components';

interface NavigationData {
  postsByYear: Record<string, Array<{
    title: string;
    permalink: string;
    date: string;
    slug: string;
  }>>;
}

interface ContentData {
  type: 'post' | 'page' | 'home';
  title: string;
  content: string;
}

interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article';
  siteName?: string;
  locale?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  twitterCreator?: string;
}

type SlotContent = {
  main?: ReactNode;
  'main-footer'?: ReactNode;
  scripts?: ReactNode;
  styles?: ReactNode;
};

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
        <link rel="icon" href="/assets/favicon.svg" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        <link rel="manifest" href="/assets/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="zachwill" />

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

        <meta name="twitter:card" content={ogData.twitterCard} />
        <meta name="twitter:title" content={ogData.title} />
        <meta name="twitter:description" content={ogData.description} />
        {ogData.twitterSite && <meta name="twitter:site" content={ogData.twitterSite} />}
        {ogData.twitterCreator && <meta name="twitter:creator" content={ogData.twitterCreator} />}
        {ogData.image && <meta name="twitter:image" content={ogData.image} />}
        {ogData.imageAlt && <meta name="twitter:image:alt" content={ogData.imageAlt} />}

        <link rel="stylesheet" href={`${siteConfig.webawesome.cdnBase}/styles/webawesome.css`} />
        <link rel="stylesheet" href="/assets/content.css" />
        {slotContent?.styles}
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
          if (nav && article) {
            nav.scrollIntoView({ behavior: 'smooth' });
            article.scrollIntoView({ behavior: 'instant' });
          }
        }"
        {...{
          "data-on-load__delay.200ms": "$webawesome = !document.querySelector('body').classList.contains('wa-cloak')"
        }}
      >
        <wa-page mobile-breakpoint="1080px">
          <Header />
          <Nav navigationData={navigationData} currentPath={currentPath} />

          <main>
            {slotContent?.main || <div dangerouslySetInnerHTML={{ __html: contentData.content }} />}
          </main>

          {slotContent?.['main-footer'] && (
            <footer slot="main-footer">
              {slotContent['main-footer']}
            </footer>
          )}
        </wa-page>

        {slotContent?.scripts}
      </body>
    </html>
  );
}
