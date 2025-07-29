import React from 'react';

export function About({ heading = 'xl', fontSize = 'l', gap = 'm' }) {
  return (
    <div className={`wa-stack wa-gap-${gap} about`}>
      <div className={`wa-flex wa-align-items-center wa-gap-${gap}`}>
        <wa-badge appearance="filled" className={`wa-heading-${heading} purple`}>
          <wa-icon name="laptop-code" className="purple"></wa-icon>
        </wa-badge>
        <span className={`wa-heading-${heading}`}>About</span>
      </div>

      <div style={{ fontSize: `var(--wa-font-size-${fontSize})` }}>
        <wa-tooltip for="zach-linkedin">LinkedIn</wa-tooltip>
        <wa-tooltip for="zach-nba">NBA.com</wa-tooltip>
        I'm currently <a id="zach-linkedin" href="https://linkedin.com/in/heyzachwill">Director of Data Science</a> for the <a id="zach-nba" href="https://www.nba.com/blazers/zach-williams">Portland Trail Blazers</a>.
      </div>
      <div style={{ fontSize: `var(--wa-font-size-${fontSize})` }}>
        <wa-tooltip for="zach-github-repos">GitHub</wa-tooltip>
        Several of my open-source projects are on <a id="zach-github-repos" href="https://github.com/zachwill">GitHub</a>.
      </div>
    </div >
  );
}