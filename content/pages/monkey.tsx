import React from 'react';

export const config = {
  title: "data-monkey 🐵",
  permalink: "/monkey/"
};

function Monkey() {
  return (
    <div className="wa-cluster wa-gap-m">
      <script type="module" src="/assets/monkey.js" />
      <wa-button
        variant="brand"
        data-on-click="@monkey('/assets/mock.html')"
        data-monkey="{
          patch: '#target',
          select: '#fragment-one',
          swap: 'inner',
          url: '?bananas'
        }"
      >
        Fetch 1 🍌
      </wa-button>

      <wa-button
        data-on-click="@monkey('/assets/mock.html')"
        data-monkey="{
          patch: '#target',
          select: '#fragment-two',
          swap: 'inner',
          url: '?monkeypatched'
        }"
      >
        Fetch 2 🐒
      </wa-button>

      <wa-button
        variant="danger"
        data-on-click="@monkey('/assets/mock.html')"
        data-monkey="{
          patch: '#target',
          select: '#reset',
          swap: 'inner',
          url: '?reset'
        }"
      >
        Reset
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

      <div id="target" style={{
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
with boring manager Rob`.trim()}
        </pre>
      </div>

      <wa-card>
        <div slot="header">
          <h3>🍌 Monkey Controls</h3>
        </div>

        <div className="wa-stack wa-gap-m">
          <p>Use these buttons to test dynamic content loading:</p>
          <Monkey />
        </div>
      </wa-card>

      <wa-card>
        <wa-tab-group>
          <wa-tab panel="one">Fetch 1</wa-tab>
          <wa-tab panel="two">Fetch 2</wa-tab>

          <wa-tab-panel name="one">
            <pre>
              {`
<wa-button
  data-on-click="@hx-get('/assets/mock.html')"
  data-hx="{
    patch: '#target-div',
    select: '#fragment-one,
    swap: 'inner',
    url: '?bananas',
  }"
>
  Fetch 1 🍌
</wa-button>
`.trim()}
            </pre>
          </wa-tab-panel>

          <wa-tab-panel name="two">
            <pre>
              {`
<wa-button
  data-on-click="@hx-get('/assets/mock.html')"
  data-hx="{
    patch: '#target-div',
    select: '#fragment-two,
    swap: 'inner',
    url: '?monkeypatched',
  }"
>
  Fetch 2 🐒
</wa-button>
`.trim()}
            </pre>
          </wa-tab-panel>

        </wa-tab-group>
      </wa-card>
    </div>
  );
}