import React from 'react';

export const config = {
  title: "Data Theme Testing 🎨",
  permalink: "/data-theme/"
};

export function Main() {
  return (
    <div className="wa-stack wa-gap-m">
      <h2>Data Theme Testing 🎨</h2>
      <p>
        Testing out data-theme attribute switching functionality using data-star.
        This page demonstrates reactive theme switching with persistent state.
      </p>

      <wa-card
        data-signals="{darkmode: false}"
        data-computed-theme="$darkmode ? 'sunset' : 'light'"
        data-attr-data-theme="$theme"
        data-persist="darkmode"
      >
        <div slot="header">Data-Star Theme Toggle</div>

        <div className="wa-stack wa-gap-m">
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--wa-space-s)' }}>
            <input
              type="checkbox"
              className="toggle"
              data-bind="darkmode"
              style={{ marginRight: 'var(--wa-space-s)' }}
            />
            Dark Mode
          </label>

          <div style={{
            padding: 'var(--wa-space-m)',
            backgroundColor: 'var(--wa-color-bg-tertiary)',
            borderRadius: 'var(--wa-border-radius)',
            fontFamily: 'monospace',
          }}>
            Current theme: <span data-text="$theme"></span>
          </div>
        </div>
      </wa-card>

      <wa-divider></wa-divider>

      <wa-card>
        <div slot="header">
          <h3>Data-Star Implementation</h3>
        </div>

        <div className="wa-stack wa-gap-s">
          <p>This uses data-star attributes for reactive theme switching:</p>
          <ul>
            <li><code>data-signals="{`{darkmode: false}`}"</code> - Initialize reactive state</li>
            <li><code>data-persist="darkmode"</code> - Persist state to localStorage</li>
            <li><code>data-attr-data-theme="$darkmode ? 'sunset' : 'light'"</code> - Set data-theme attribute</li>
            <li><code>data-bind="darkmode"</code> - Bind checkbox to darkmode signal</li>
            <li><code>data-text="$theme"</code> - Update text content reactively</li>
          </ul>
        </div>
      </wa-card>
    </div>
  );
}

export function Aside() {
  return (
    <div className="wa-stack wa-gap-m">
      <wa-card>
        <div slot="header">
          <h3>🎨 Theme Controls</h3>
        </div>

        <div className="wa-stack wa-gap-s">
          <p>Toggle between light and dark themes using the checkbox above. Your preference will be saved automatically.</p>

          <wa-callout variant="brand">
            The theme state persists across page reloads using <code>data-persist</code>.
          </wa-callout>
        </div>

        <div slot="footer">
          <wa-badge variant="brand" pill>Reactive Themes</wa-badge>
        </div>
      </wa-card>

      <wa-card>
        <div slot="header">
          <h3>🔧 Technical Details</h3>
        </div>

        <div className="wa-stack wa-gap-xs">
          <p><strong>Framework:</strong> Data-Star + React</p>
          <p><strong>Components:</strong> WebAwesome</p>
          <p><strong>State Management:</strong> Data-Star Signals</p>
          <p><strong>Persistence:</strong> localStorage</p>
          <p><strong>Themes:</strong></p>
          <ul>
            <li><code>light</code> - Default light theme</li>
            <li><code>sunset</code> - Dark theme variant</li>
          </ul>
        </div>
      </wa-card>
    </div>
  );
}

export function Footer() {
  return (
    <div className="wa-cluster wa-justify-content-center wa-gap-m">
      <wa-badge variant="brand">🎨 Built with Data-Star</wa-badge>
      <wa-badge variant="success">✨ Persistent Theme State</wa-badge>
      <wa-badge variant="neutral">🎯 Zero JavaScript Required</wa-badge>
    </div>
  );
} 