import React from 'react';

export const config = {
  title: "Datastar Test",
  permalink: "/datatheme/"
};

export function Main() {
  return (
    <div className="wa-stack wa-gap-m">
      <h2>Datastar Test</h2>

      <wa-card
        data-signals="{darkmode: false}"
        data-computed-theme="$darkmode ? 'sunset' : 'light'"
        data-attr-data-theme="$theme"
        data-persist="darkmode"
      >
        <div slot="header">
          <strong>Datastar Theme Toggle</strong>
        </div>

        <div className="wa-stack wa-gap-m">
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--wa-space-s)' }}>
            <input
              type="checkbox"
              className="toggle"
              data-bind="darkmode"
            />
            Dark Mode
          </label>

          <div style={{
            fontFamily: 'var(--wa-font-family-code)',
          }}>
            Current theme: <span data-text="$theme" style={{ fontWeight: 'var(--wa-font-weight-bold)' }}></span>
          </div>

          <wa-divider></wa-divider>

          <p>This uses <code>data-*</code> attributes for reactive theme switching:</p>
          <ul>
            <li><code>data-signals="{`{darkmode: false}`}"</code> - Initialize reactive state</li>
            <li><code>data-attr-data-theme="$darkmode ? 'sunset' : 'light'"</code> - Set data-theme attribute</li>
            <li><code>data-bind="darkmode"</code> - Bind checkbox to darkmode signal</li>
            <li><code>data-text="$theme"</code> - Update text content reactively</li>
          </ul>
        </div>
      </wa-card>
    </div>
  );
}

export function MainFooter() {
  return (
    <div className="wa-cluster wa-justify-content-center wa-gap-m">
      <wa-badge variant="brand">🚀 Built with Datastar</wa-badge>
      <wa-badge variant="neutral">🎯 Zero JS Otherwise</wa-badge>
    </div>
  );
} 