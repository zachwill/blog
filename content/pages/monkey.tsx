import React from 'react';

export const config = {
  title: "data-monkey 🐵",
  permalink: "/monkey/"
};

function Monkey() {
  return (
    <div className="wa-cluster wa-gap-m">
      <script type="module" src="/assets/monkey.js"></script>
      <wa-button
        variant="brand"
        data-on-click="@monkey('/assets/mock.html')"
        data-monkey="{
          patch: '#target-div',
          select: '#fragment-one,
          swap: 'inner',
          url: '?bananas',
        }"
      >
        Fetch Fragment 1 🍌
      </wa-button>

      <wa-button
        data-on-click="@monkey('/assets/mock.html')"
        data-monkey="{
          patch: '#target-div',
          select: '#fragment-two,
          swap: 'inner',
          url: '?monkeypatched',
        }"
      >
        Fetch Fragment 2 🐒
      </wa-button>
    </div>
  );
}

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