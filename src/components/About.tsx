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
        <wa-tooltip for="zach-linkedin">NBA.com</wa-tooltip>
        <wa-tooltip for="zach-nba">🏀 Rip City</wa-tooltip>
        I'm currently <a id="zach-linkedin" href="https://www.nba.com/blazers/zach-williams">Director of Data Science</a> for the <a id="zach-nba" href="https://www.nba.com/blazers/zach-williams">Portland Trail Blazers</a>.
      </div>

      <a href="/datastar">
        <wa-callout variant="brand">
          <wa-icon slot="icon" name="rocket"></wa-icon>
          <div className="wa-align-items-baseline">
            <span style={{ fontFamily: 'var(--wa-font-family-longform)', fontWeight: 'var(--wa-font-weight-normal)', fontStyle: 'italic' }}>Author's Note:&nbsp;</span> Check out my recent deep dive on Datastar here &nbsp;<wa-icon name="arrow-up-right-from-square" style={{ fontSize: 'var(--wa-font-size-xs)' }}></wa-icon>
          </div>
        </wa-callout>
      </a>
    </div >
  );
}