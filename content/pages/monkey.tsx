import React from 'react';

export const config = {
  title: "data-monkey 🐵",
  permalink: "/monkey/"
};

function Monkey() {
  return (
    <div className="wa-cluster wa-gap-m" data-signals="{hxButton: 'intro'}">
      <wa-button
        data-on-click="$hxButton = 'intro'"
        data-effect="if ($hxButton === 'intro') @monkey('/assets/mock.html')"
        data-monkey="{
          patch: '#target',
          select: '#reset',
          swap: 'inner',
          url: '?reset'
        }"
      >
        Intro 🎹
      </wa-button>

      <wa-button
        variant="brand"
        data-on-click="$hxButton = 'one'"
        data-effect="if ($hxButton === 'one') @monkey('/assets/mock.html')"
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
        variant="success"
        data-on-click="$hxButton = 'two'"
        data-effect="if ($hxButton === 'two') @monkey('/assets/mock.html')"
        data-monkey="{
          patch: '#target',
          select: '#fragment-two',
          swap: 'inner',
          url: '?monkeypatched'
        }"
      >
        Fetch 2 🐒
      </wa-button>

    </div>
  );
}

export function Main() {
  return (
    <div className="wa-stack wa-gap-m">
      <script type="module" src="/assets/monkey.js" />
      <style jsx>{`
        main {
          background-color: var(--wa-color-surface-lowered);
        }
      `}</style>
      <wa-card>
        <div slot="header">
          <h2>data-monkey</h2>
        </div>

        <div className="wa-stack wa-gap-l">
          <Monkey />

          <div id="target" style={{
            border: '1px solid var(--wa-color-surface-border)',
            padding: 'var(--wa-space-l)',
            backgroundColor: 'var(--wa-color-bg-secondary)',
            borderRadius: 'var(--wa-border-radius-m)',
            overflow: 'hidden',
          }}>
            <pre className="wa-code-block">{`
data-monkey get up, get data
data-monkey patch the DOM

data-monkey got boring meeting
with boring manager Rob`.trim()}
            </pre>
          </div>
        </div>

        <wa-tab-group>
          <wa-tab panel="intro"
            data-on-click="$hxButton = 'intro'"
            data-attr-active="$hxButton === 'intro'"
          >
            Intro
          </wa-tab>
          <wa-tab panel="one"
            data-on-click="$hxButton = 'one'"
            data-attr-active="$hxButton === 'one'"
          >
            Fetch 1
          </wa-tab>
          <wa-tab panel="two"
            data-on-click="$hxButton = 'two'"
            data-attr-active="$hxButton === 'two'"
          >
            Fetch 2
          </wa-tab>

          <wa-tab-panel name="intro">
            <div class="wa-stack wa-gap-m">
              <strong>What if Datastar included <code>hx-get</code>?</strong>
              <p>That's the main gist of this...</p>
            </div>
          </wa-tab-panel>

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
    </div >
  );
}