import React from 'react';

export function About({ heading = 'xl', fontSize = 'l', gap = 'm' }) {
  return (
    <div className={`wa-stack wa-gap-${gap} about`}>
      <div className={`wa-flex wa-align-items-center wa-gap-${gap} about-heading`}>
        <wa-badge appearance="filled" className={`wa-heading-${heading} purple`}>
          <wa-icon name="laptop-code" className="purple"></wa-icon>
        </wa-badge>
        <span className={`wa-heading-${heading} about-title`}>About</span>
      </div>

      <div className="about-copy" style={{ fontSize: `var(--about-copy-size, var(--wa-font-size-${fontSize}))` }}>
        <wa-tooltip for="zach-linkedin">NBA.com</wa-tooltip>
        <wa-tooltip for="zach-nba">🏀 Rip City</wa-tooltip>
        I'm currently <a id="zach-linkedin" href="https://www.nba.com/blazers/zach-williams">Director of Data Science</a> for the <a id="zach-nba" href="https://www.nba.com/blazers/zach-williams">Portland Trail Blazers</a>.
      </div>
    </div >
  );
}
