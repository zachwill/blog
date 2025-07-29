import React from 'react';
import siteConfig from '../site.config';

export function Header() {
  return (
    <header slot="header" className="wa-split top-header">
      <div className="wa-cluster wa-align-items-center">
        <wa-button appearance="plain" size="small" data-toggle-nav>
          <wa-icon name="bars" label="Toggle navigation"></wa-icon>
        </wa-button>

        <wa-tooltip for="zachwill">zachwill.com</wa-tooltip>
        <a href="/" id="zachwill" className="wa-cluster wa-align-items-center wa-gap-s">
          <wa-icon label="Lightning" name="bolt" style={{ color: 'var(--wa-color-brand)' }}></wa-icon>
          <span className="wa-heading-m">Zach Williams</span>
        </a>
      </div>

      <div className="wa-cluster wa-gap-xs">
        <wa-button id="zach-twitter" appearance="plain" size="small" aria-label="Twitter" href={siteConfig.social.twitter} target="_blank">
          <wa-icon label="Twitter" name="at"></wa-icon>
        </wa-button>
        <wa-tooltip for="zach-twitter">Twitter</wa-tooltip>
        <wa-button id="zach-github" appearance="plain" size="small" aria-label="GitHub" href={siteConfig.social.github} target="_blank">
          <wa-icon label="GitHub" name="code"></wa-icon>
        </wa-button>
        <wa-tooltip for="zach-github">GitHub</wa-tooltip>
      </div>
    </header>
  );
} 