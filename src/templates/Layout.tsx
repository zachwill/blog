import React from 'react';
import siteConfig from '../site.config';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
  showHeader?: boolean;
}

export default function Layout({ title, children, showHeader = true }: LayoutProps) {
  const pageTitle = title ? title : siteConfig.title;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title>{pageTitle}</title>
        <meta name="author" content={siteConfig.author} />
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=960" />

        {/* RSS */}
        <link href="http://feeds.feedburner.com/zachwill" rel="alternate" title="zachwill" type="application/atom+xml" />

        <link rel="stylesheet" href="/assets/style.css" />
      </head>
      <body>
        <div className="wrapper">
          {showHeader && (
            <header>
              <h2><a href="https://twitter.com/zachwill">@zachwill</a></h2>
              <p>I'm currently <a href="https://www.linkedin.com/in/heyzachwill/">Director of Data Science</a> for the <a href="https://www.nba.com/blazers/zach-williams">Portland Trail Blazers</a>. Several of my open-source projects are on <a href="https://github.com/zachwill">GitHub</a>.</p>
            </header>
          )}
          {children}
        </div>
      </body>
    </html>
  );
} 