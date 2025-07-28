import React from 'react';
import { Monkey } from '@/components/Monkey';

export const config = {
  title: "data-monkey 🐵",
  permalink: "/monkey/"
};

export function Main() {
  return (
    <div className="wa-stack wa-gap-m">
      <h2>data-monkey</h2>
      <p>
        This page demonstrates the new slot-based TSX system. The monkey component
        below can interact with DOM fragments and update content dynamically.
      </p>

      <div id="target-div" style={{
        border: '1px solid var(--wa-color-surface-border)',
        padding: 'var(--wa-space-l)',
        backgroundColor: 'var(--wa-color-bg-secondary)',
        borderRadius: 'var(--wa-border-radius-m)',
        overflow: 'hidden',
      }}>
        <pre className="wa-code-block">
          {`data-monkey get up, get data
data-monkey patch the DOM

data-monkey got boring meeting
with boring manager Rob`}
        </pre>
      </div>

      <div className="wa-cluster wa-justify-content-center wa-gap-m">
        <wa-badge variant="brand">🚀 Built with slot-based TSX</wa-badge>
        <wa-badge variant="success">✨ Zero MDX stubs needed</wa-badge>
        <wa-badge variant="neutral">🎯 Direct slot targeting</wa-badge>
      </div>
    </div>
  );
}

export function Aside() {
  return (
    <div className="wa-stack wa-gap-m">
      <wa-card>
        <div slot="header">
          <h3>🍌 Monkey Controls</h3>
        </div>

        <div className="wa-stack wa-gap-s">
          <p>Use these buttons to test dynamic content loading:</p>
          <Monkey />
        </div>

        <div slot="footer">
          <wa-badge variant="neutral" pill>Interactive Demo</wa-badge>
        </div>
      </wa-card>

      <wa-card>
        <div slot="header">
          <h3>🔧 Technical Details</h3>
        </div>

        <div className="wa-stack wa-gap-xs">
          <p><strong>Framework:</strong> React + Bun</p>
          <p><strong>Components:</strong> WebAwesome</p>
          <p><strong>Slots Used:</strong></p>
          <ul>
            <li><code>main</code> - Primary content</li>
            <li><code>aside</code> - This sidebar</li>
          </ul>
        </div>
      </wa-card>
    </div>
  );
}

export function Footer() {
  return (
  );
} 