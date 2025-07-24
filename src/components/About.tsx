import React from 'react';

export function About() {
  return (
    <div className="wa-stack wa-gap-m about">
      <div className="wa-flex wa-align-items-center wa-gap-m">
        <wa-badge appearance="filled" className="icon purple">
          <wa-icon name="laptop-code" className="icon purple"></wa-icon>
        </wa-badge>
        <span className="wa-heading-xl">About</span>
      </div>

      <div style={{ fontSize: 'var(--wa-font-size-l)' }}>
        <wa-tooltip for="zach-linkedin">LinkedIn</wa-tooltip>
        <wa-tooltip for="zach-nba">NBA.com</wa-tooltip>
        I'm currently <a id="zach-linkedin" href="https://linkedin.com/in/heyzachwill">Director of Data Science</a> for the <a id="zach-nba" href="https://www.nba.com/blazers/zach-williams">Portland Trail Blazers</a>.
      </div>
      <div style={{ fontSize: 'var(--wa-font-size-l)' }}>
        <wa-tooltip for="zach-github-repos">GitHub</wa-tooltip>
        Several of my open-source projects are on <a id="zach-github-repos" href="https://github.com/zachwill">GitHub</a>.
      </div>
    </div>
  );
}