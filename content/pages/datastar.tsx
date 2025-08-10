import React, { ReactNode } from 'react';

export const config = {
  title: "Notes on Datastar",
  permalink: "/datastar/",
  openGraph: {
    title: "My notes on Datastar",
    description: "Datastar is a framework focused on interactivity and streaming updates through HTML attributes. The server owns persistent state and logic; the client handles reactive UI with signals.",
    image: "/assets/datastar-blast.jpg",
    imageAlt: "Datastar framework logo",
    type: "article" as const,
    twitterCard: "summary_large_image" as const
  }
};

// NOTE: Linter errors are present in this file but are being ignored
// for now to focus on the layout changes, as requested.

const PageCSS = () => (
  <style>{`
        main {
          background-color: var(--wa-color-surface-lowered);
          padding: var(--wa-space-m);
        }

        .datastar-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--wa-space-m);
          align-items: start;
        }
        
        .datastar-layout + .datastar-layout {
          margin-top: var(--wa-space-xl);
        }

        @media (min-width: 950px) {
          main {
            padding: var(--wa-space-l);
          }
          .datastar-layout {
            grid-template-columns: 4fr 3fr;
            gap: var(--wa-space-l);
          }
        }
        
        .datastar-column {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--wa-space-l);
        }

        @media (min-width: 1080px) {
          .datastar-column.is-sticky {
            position: -webkit-sticky;
            position: sticky;
            top: calc(57px + var(--wa-space-l)); /* Header height + padding */
          }
        }
        
        /* Code sample colour overrides */
        .showcase-code-sample {
          --spacing: 0;
          overflow-x: scroll;
          overflow-y: hidden;
        }

        .showcase-code-sample pre {
          background-color: var(--wa-color-surface-default);
          color: var(--wa-color-text-quiet);
        }

        .showcase-code-sample .tag {
          color: var(--wa-color-indigo-40);
        }

        .showcase-code-sample .attribute {
          color: var(--wa-color-green-40);
        }

        .showcase-code-sample .value {
          color: var(--wa-color-brand-40);
        }

        .showcase-code-sample .comment {
          color: var(--wa-color-text-quiet);
          font-style: italic;
        }

        /* Dark mode tweaks */
        .wa-dark .showcase-code-sample .tag {
          color: var(--wa-color-indigo-70);
        }

        .wa-dark .showcase-code-sample .attribute {
          color: var(--wa-color-green-70);
        }

        .wa-dark .showcase-code-sample .value {
          color: var(--wa-color-brand-70);
        }
      `}</style>
);

const Prose = ({ children }: { children: ReactNode }) => (
  <p className="wa-body-m" style={{ margin: 0, fontFamily: 'var(--wa-font-family-longform)', fontWeight: 'var(--wa-font-weight-longform)', fontStyle: 'italic' }}>
    {children}
  </p>
);

const LongformQuote = ({ icon, quote, href, tooltip }: { icon: string; quote: string; href: string; tooltip: string }) => {
  const buttonId = `longform-quote-${icon.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <>
      <wa-divider></wa-divider>
      <div className="wa-flank wa-align-items-start">
        <wa-tooltip for={buttonId}>{tooltip}</wa-tooltip>
        <wa-button id={buttonId} href={href} target="_blank" size="large" appearance="filled">
          <wa-icon name={icon} label={tooltip} style={{ fontSize: 'var(--wa-font-size-xl)' }}></wa-icon>
        </wa-button>
        <p className="wa-body-l" style={{
          fontFamily: 'var(--wa-font-family-longform)',
          fontWeight: 'var(--wa-font-weight-longform)',
          fontStyle: 'italic'
        }}>
          {quote}
        </p>
      </div>
      <wa-divider></wa-divider>
    </>
  );
};

const CodeSampleCard = () => (
  <wa-card className="showcase-code-sample">
    <pre dangerouslySetInnerHTML={{
      __html: `
<span class="comment">&lt;!-- Hobbit Autocomplete --&gt;</span>
&lt;<span class="tag">input</span>
  <span class="attribute">type</span>="<span class="value">text</span>"
  <span class="attribute">placeholder</span>="<span class="value">Search meals (e.g. elevenses)</span>"
  <span class="attribute">data-bind-search</span>
  <span class="attribute">data-on-input__debounce.150ms</span>="<span class="value">@get('/hobbit/meals')</span>"
/&gt;
`.trim()
    }} />
  </wa-card>
);

const MentalModelsCard = () => (
  <wa-card>
    <div slot="header" className="wa-split wa-align-items-center">
      <h3 className="wa-heading-m">Mental Models</h3>
      <wa-tooltip for="data-star-dev">https://data-star.dev</wa-tooltip>
      <wa-button id="data-star-dev" href="https://data-star.dev" target="_blank" appearance="plain" size="small" tabIndex={-1}>
        <wa-icon name="rocket" label="Datastar website"></wa-icon>
      </wa-button>
    </div>
    <div className="wa-stack wa-gap-xl">
      <p className="wa-caption-m">
        Datastar's focus on hypermedia, reactivity, and speed leads to some fun mental models.
      </p>
      <div className="wa-grid wa-gap-xl" style={{ '--min-column-size': '30ch' }}>
        <a href="#intro" data-on-click="event.preventDefault(); document.querySelector('#intro').scrollIntoView({ behavior: 'smooth' })" className="wa-flank wa-align-items-start wa-link-plain" tabIndex={-1}>
          <wa-avatar
            shape="rounded"
            style={{ backgroundColor: 'var(--wa-color-brand-fill-normal)', color: 'var(--wa-color-brand-on-quiet)' }}
          >
            <wa-icon slot="icon" name="rocket"></wa-icon>
          </wa-avatar>
          <div className="wa-stack wa-gap-2xs">
            <span className="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
              Intro <wa-icon name="arrow-right"></wa-icon>
            </span>
            <p className="wa-caption-m">General ideas about why Datastar is awesome.</p>
          </div>
        </a>

        <a href="#htmx" data-on-click="event.preventDefault(); document.querySelector('#htmx').scrollIntoView({ behavior: 'smooth' })" className="wa-flank wa-align-items-start wa-link-plain" tabIndex={-1}>
          <wa-avatar
            shape="rounded"
            style={{ backgroundColor: 'var(--wa-color-warning-fill-normal)', color: 'var(--wa-color-warning-on-quiet)' }}
          >
            <wa-icon slot="icon" name="file-code"></wa-icon>
          </wa-avatar>
          <div className="wa-stack wa-gap-2xs">
            <span className="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
              htmx <wa-icon name="arrow-right"></wa-icon>
            </span>
            <p className="wa-caption-m">Yes, both Datastar and htmx use declarative attributes.</p>
          </div>
        </a>

        <a href="#spreadsheets" data-on-click="event.preventDefault(); document.querySelector('#spreadsheets').scrollIntoView({ behavior: 'smooth' })" className="wa-flank wa-align-items-start wa-link-plain" tabIndex={-1}>
          <wa-avatar
            shape="rounded"
            style={{ backgroundColor: 'var(--wa-color-success-fill-normal)', color: 'var(--wa-color-success-on-quiet)' }}
          >
            <wa-icon slot="icon" name="table"></wa-icon>
          </wa-avatar>
          <div className="wa-stack wa-gap-2xs">
            <span className="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
              Spreadsheets <wa-icon name="arrow-right"></wa-icon>
            </span>
            <p className="wa-caption-m">My favorite analogy revolves around spreadsheet cell updates.</p>
          </div>
        </a>

        <a href="#duckdb" data-on-click="event.preventDefault(); document.querySelector('#duckdb').scrollIntoView({ behavior: 'smooth' })" className="wa-flank wa-align-items-start wa-link-plain" tabIndex={-1}>
          <wa-avatar
            shape="rounded"
            style={{ backgroundColor: 'var(--wa-color-purple-fill-normal)', color: 'var(--wa-color-purple-on-quiet)' }}
          >
            <wa-icon slot="icon" name="feather-pointed"></wa-icon>
          </wa-avatar>
          <div className="wa-stack wa-gap-2xs">
            <span className="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
              DuckDB <wa-icon name="arrow-right"></wa-icon>
            </span>
            <p className="wa-caption-m">Both have a focus on executable size, speed, and productivity.</p>
          </div>
        </a>

      </div>
    </div>
  </wa-card>
);

const MorpheusMatrixCard = () => (
  <wa-card
    data-signals-slider="85"
    data-computed-morpheus="$slider >= 50"
    data-computed-morpheus-quote="$morpheus ? 'Stay in Wonderland' : 'The story ends...'"
    data-computed-morpheus-subquote="$morpheus ? 'See how deep the rabbit hole goes...' : 'You wake up in your bed.'"
    data-on-intersect="$keepScrolling = true"
  >
    <div className="wa-stack">
      <div className="wa-flank:end">
        <div className="wa-stack wa-gap-xs">
          <h3 id="odds-label" className="wa-heading-m" data-text="$morpheusQuote"></h3>
          <p className="wa-caption-m" data-text="$morpheusSubquote"></p>
        </div>
        <wa-switch
          disabled
          data-attr-checked="$slider >= 50 ? true : false"
          data-on-click="event.preventDefault()"
          size="medium"
          aria-labelledby="odds-label"
          tabIndex={-1}
          style={{ '--wa-form-control-activated-color': 'var(--wa-color-danger-fill-loud)' }}></wa-switch>
      </div>
      <wa-comparison
        position={85}
        data-on-mousemove="$slider = el.position"
        data-on-touchmove="$slider = el.position"
      >
        <img slot="before" src="/assets/morpheus-htmx.jpg" alt="Morpheus + htmx" />
        <img slot="after" src="/assets/morpheus-datastar.jpg" alt="Morpheus + Datastar" />
      </wa-comparison>
    </div>
  </wa-card>
);

const MorpheusSpreadsheetCard = () => (
  <wa-card
    data-signals-spreadsheet="85"
    data-computed-morpheus-excel="$spreadsheet >= 50"
    data-computed-morpheus-excel-quote="$morpheusExcel ? 'You have to understand...' : 'Stay in Wonderland'"
    data-computed-morpheus-excel-subquote="$morpheusExcel ? 'Most are not ready to be unplugged' : 'See how deep the rabbit hole goes...'"
  >
    <div className="wa-stack">
      <div className="wa-flank:end">
        <div className="wa-stack wa-gap-xs">
          <h3 id="odds-label" className="wa-heading-m" data-text="$morpheusExcelQuote"></h3>
          <p className="wa-caption-m" data-text="$morpheusExcelSubquote"></p>
        </div>
      </div>
      <wa-comparison
        position={85}
        data-on-mousemove="$spreadsheet = el.position"
        data-on-touchmove="$spreadsheet = el.position"
      >
        <img slot="before" src="/assets/morpheus-datastar.jpg" alt="Morpheus + Datastar" />
        <img slot="after" src="/assets/matrix-datastar.jpg" alt="Morpheus + htmx" />
      </wa-comparison>
    </div>
  </wa-card>
);

const MorpheusDuckDBCard = () => (
  <wa-card
    data-signals-duckdb="85"
    data-computed-morpheus-duckdb="$duckdb >= 50"
    data-computed-morpheus-duckdb-quote="$morpheusDuckdb ? 'Deja vu is usually a glitch...' : 'Stay in Wonderland'"
    data-computed-morpheus-duckdb-subquote="$morpheusDuckdb ? 'It happens when they change something' : 'See how deep the rabbit hole goes...'"
  >
    <div className="wa-stack">
      <div className="wa-flank:end">
        <div className="wa-stack wa-gap-xs">
          <h3 id="odds-label" className="wa-heading-m" data-text="$morpheusDuckdbQuote"></h3>
          <p className="wa-caption-m" data-text="$morpheusDuckdbSubquote"></p>
        </div>
      </div>
      <wa-comparison
        position={85}
        data-on-mousemove="$duckdb = el.position"
        data-on-touchmove="$duckdb = el.position"
      >
        <img slot="before" src="/assets/morpheus-datastar.jpg" alt="Morpheus + Datastar" />
        <img slot="after" src="/assets/matrix-rocket.jpg" alt="Morpheus + htmx" />
      </wa-comparison>
    </div>
  </wa-card>
);

const TodoCard = () => (
  <wa-card data-signals-keep-scrolling="false">
    <div slot="header" className="wa-split">
      <h3 className="wa-heading-m">TodoMVC</h3>
      <wa-tooltip for="todo-example">View Datastar example</wa-tooltip>
      <wa-button id="todo-example" href="https://data-star.dev/examples/todomvc" target="_blank" appearance="plain" size="small" tabIndex={-1}>
        <wa-icon name="rocket" label="Datastar TodoMVC"></wa-icon>
      </wa-button>
    </div>
    <div className="wa-stack">
      <wa-checkbox tabIndex={-1} checked>Read the introduction</wa-checkbox>
      <wa-checkbox tabIndex={-1} checked>Enjoy the Gandalf quote</wa-checkbox>
      <wa-checkbox tabIndex={-1}>Check off an example todo</wa-checkbox>
      <wa-checkbox tabIndex={-1}>Check out the Datastar docs</wa-checkbox>
      <wa-checkbox tabIndex={-1} data-attr-checked="$keepScrolling">Keep scrolling for more comparisons</wa-checkbox>
    </div>
  </wa-card>
);

const UserCard = () => (
  <wa-card>
    <div className="wa-flank:end">
      <div className="wa-stack wa-gap-xs">
        <span className="wa-caption-m">Thanks for following along!</span>
        <div className="wa-cluster wa-gap-xs">
          <h3 className="wa-heading-m">Zach Williams</h3>
          <wa-badge pill>Author</wa-badge>
        </div>
      </div>
      <wa-avatar
        image="/assets/zach.png"
        label="Zach Williams"
      ></wa-avatar>
    </div>
    <div slot="footer" className="wa-grid wa-gap-xs" style={{ '--min-column-size': '10ch' }}>
      <wa-button href="https://twitter.com/zachwill" target="_blank" appearance="outlined" tabIndex={-1}>
        <wa-icon slot="start" name="at"></wa-icon>
        Twitter
      </wa-button>
      <wa-button href="https://github.com/zachwill" target="_blank" appearance="outlined" tabIndex={-1}>
        <wa-icon slot="start" name="code"></wa-icon>
        Github
      </wa-button>
    </div>
  </wa-card>
);

const DatastarIntro = () => (
  <wa-card id="intro">
    <img
      slot="media"
      src="/assets/datastar-blast.jpg"
      style={{ aspectRatio: '2/1', objectFit: 'cover' }}
      alt="Album art"
    />
    <div className="wa-stack">
      <div className="wa-flank:end wa-align-items-center">
        <dl className="wa-stack wa-gap-2xs">
          <dt className="wa-caption-m">
            Intro
          </dt>
          <dd className="wa-heading-l">Datastar</dd>
        </dl>
        <wa-badge>Hypermedia Framework</wa-badge>
      </div>
      <wa-divider></wa-divider>
      <p>
        <a href="https://data-star.dev" target="_blank">Datastar is a framework</a> focused on interactivity and streaming updates through a <a href="https://data-star.dev/guide/reactive_signals" target="_blank">handful of HTML attributes</a>. <strong>The server owns persistent state and logic; the client handles reactive UI with signals.</strong>
      </p>
      <p>
        HTML is the contract between these two. Element <code>ids</code> are <a href="https://data-star.dev/examples/progressive_load" target="_blank">server targets</a>. Events trigger the server to <a href="https://data-star.dev/reference/sse_events" target="_blank">stream patches</a> — morphing elements or updating signals. There's little state to synchronize, as the frontend acts as a dumb, reactive terminal.
      </p>
      <p>
        <strong style={{ fontFamily: 'var(--wa-font-family-longform)', fontStyle: 'italic' }}>Datastar's philosophy</strong>
      </p>
      <ul>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Stream-first approach:</strong> Simple patches with <a href="https://data-star.dev/reference/sse_events" target="_blank">SSE</a>; real-time updates to elements or signals.
        </li>
        <li>
          <strong>Declarative reactivity:</strong> Interactive UI is handled through <a href="https://data-star.dev/guide/reactive_signals#frontend-reactivity" target="_blank">signals</a> and <a href="https://data-star.dev/reference/attributes" target="_blank">HTML attributes</a>.
        </li>
      </ul>
      <LongformQuote
        icon="hat-wizard"
        quote="All we have to decide is what to do with the time that is given to us. There are other forces at work in this world, Frodo, besides the will of evil."
        href="https://www.goodreads.com/quotes/7374580"
        tooltip="Wise words from Gandalf"
      />
      <p>
        <strong>Datastar includes reactivity as a core idea.</strong> The result is a hypermedia framework capable of handling simple <a href="/web-apps/" target="_blank">CRUD apps</a> or a <a href="https://checkboxes.andersmurphy.com" target="_blank"><em>billion</em> multiplayer checkboxes</a>.
      </p>
    </div>
  </wa-card>
);

const HTMXComparison = () => (
  <wa-card id="htmx">
    <img
      slot="media"
      src="/assets/htmx-up.jpg"
      style={{ aspectRatio: '2/1', objectFit: 'cover' }}
      alt="Album art"
    />
    <div className="wa-stack">
      <div className="wa-flank:end wa-align-items-center">
        <dl className="wa-stack wa-gap-2xs">
          <dt className="wa-caption-m">
            Compared to...
          </dt>
          <dd className="wa-heading-l">htmx</dd>
        </dl>
        <wa-badge variant="warning">Hypermedia OG</wa-badge>
      </div>
      <wa-divider></wa-divider>
      <p>
        <a href="https://htmx.org" target="_blank">htmx</a> extends <a href="https://www.youtube.com/watch?v=VKu3Dyyzzjg&t=9m20s" target="_blank">hypermedia</a>: any element makes requests; any event triggers them; any target receives updates. <a href="https://htmx.org/essays/locality-of-behaviour/" target="_blank">Locality of behavior</a> with <code>hx-*</code> attributes keeps the server in charge and the client minimal. <strong>For CRUD apps without heavy JavaScript, htmx excels.</strong> Its declarative approach makes request/response very easy to implement.
      </p>
      <p>
        But htmx strains with complex UI interactions. Updating multiple parts of the DOM requires <a href="https://htmx.org/attributes/hx-swap-oob/" target="_blank">out-of-band swaps</a> — a &ldquo;workable solution&rdquo; to a messy problem. Interactive UI requires <a href="https://www.reddit.com/r/htmx/search?q=alpine&restrict_sr=on" target="_blank">a good chunk of users</a> to bolt on <a href="https://alpinejs.dev" target="_blank">Alpine</a>. These trade-offs are from htmx's core approach: declarative request/response rather than declarative interactivity.
      </p>
      <p>
        <strong style={{ fontFamily: 'var(--wa-font-family-longform)', fontStyle: 'italic' }}>Where Datastar diverges</strong>
      </p>
      <ul>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Reactivity as core primitives:</strong> Signals, computed values, and effects handle ephemeral UI; no bolt-ons needed.
        </li>
        <li>
          <strong>Streaming updates:</strong> SSE delivers patches to multiple targets; no OOB workarounds required.
        </li>
      </ul>

      <LongformQuote
        icon="keyboard"
        quote="My basic rule is: analogies are great for a sympathetic audience and bad for an antagonistic one."
        href="https://zachwill.com/analogies/"
        tooltip="Bob Nystrom"
      />
      <p>
        Both embrace declarative HTML and the server as the source of truth, but their centers of gravity differ.
      </p>
      <ul>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          htmx extends hypermedia with <a href="https://github.com/search?q=hx-get&type=code" target="_blank">declarative request/response</a>: minimal client, server in charge.
        </li>
        <li>
          Datastar combines <a href="https://data-star.dev/examples/click_to_edit" target="_blank">declarative reactivity</a> with <a href="https://data-star.dev/examples/dbmon" target="_blank">streaming updates</a>: it assumes a responsive UI and makes it achievable in pragmatic ways.
        </li>
      </ul>
    </div>
  </wa-card>
);

const SpreadsheetComparison = () => (
  <wa-card id="spreadsheets">
    <img
      slot="media"
      src="/assets/matrix-clippy.jpg"
      style={{ aspectRatio: '2/1', objectFit: 'cover' }}
      alt="Album art"
    />
    <div className="wa-stack">
      <div className="wa-flank:end wa-align-items-center">
        <dl className="wa-stack wa-gap-2xs">
          <dt className="wa-caption-m">
            Compared to...
          </dt>
          <dd className="wa-heading-l">Spreadsheets</dd>
        </dl>
        <wa-badge variant="success">Reactivity & Effects</wa-badge>
      </div>
      <wa-divider></wa-divider>
      <p>
        My favorite mental model for Datastar is spreadsheets. <a href="/spreadsheets-realization/" target="_blank">Spreadsheets</a> are <a href="/competes-with/" target="_blank">incredibly useful</a> across domains. <strong>Yet the database remains the truth, while the spreadsheet provides a reactive view.</strong> In this analogy: signals are cells and computed values are formulas. Type in a cell (<code>data-bind</code>) for immediate updates — but the database owns persistent truth.
      </p>
      <p>
        <strong style={{ fontFamily: 'var(--wa-font-family-longform)', fontStyle: 'italic' }}>Datastar as a spreadsheet</strong>
      </p>
      <ul>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Signals as cells:</strong> Hold ephemeral values (inputs, toggles, flags); update instantly.
        </li>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Computed values as formulas:</strong> Derive from signals automatically; dependencies change, values recalculate.
        </li>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Effects as macros:</strong> Fire on signal changes; handle toasts, indicators, styling — never business logic.
        </li>
        <li>
          <strong>Bindings allow edits:</strong> Two-way flow between DOM and signals; input updates signal, signal updates DOM.
        </li>
      </ul>

      <LongformQuote
        icon="calendar-check"
        quote="All enterprise software competes with Excel. All productivity software competes with emailing things to yourself."
        href="https://zachwill.com/competes-with/"
        tooltip="Pavel Samsonov"
      />
      <p>
        Make no mistake: <strong>using spreadsheets requires discipline — otherwise an analyst's view can turn into a tangled mess.</strong> The same can happen with signals and effects. But if the server owns state and streams patches, then the client can act as an interactive terminal.
      </p>
    </div>
  </wa-card>
);

const DuckDBComparison = () => (
  <wa-card id="duckdb">
    <img
      slot="media"
      src="/assets/matrix-duckdb.jpg"
      style={{ aspectRatio: '2/1', objectFit: 'cover' }}
      alt="Album art"
    />
    <div className="wa-stack">
      <div className="wa-flank:end wa-align-items-center">
        <dl className="wa-stack wa-gap-2xs">
          <dt className="wa-caption-m">
            Compared to...
          </dt>
          <dd className="wa-heading-l">DuckDB</dd>
        </dl>
        <wa-badge style={{ backgroundColor: 'var(--wa-color-purple-fill-loud)' }}>Insanely Fast</wa-badge>
      </div>
      <wa-divider></wa-divider>
      <ul>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Hypermedia ≈ SQLite:</strong> embedded, straightforward, useful
        </li>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>React/Solid/Svelte ≈ MySQL/Postgres:</strong> full client applications
        </li>
        <li>
          <strong>Datastar ≈ DuckDB:</strong> embedded, powerful without a heavy burden
        </li>
      </ul>
      <p>
        Both <a href="https://duckdb.org" target="_blank">DuckDB</a> and Datastar handle hard cases (<a href="https://duckdb.org/why_duckdb" target="_blank">complex analytical queries</a>; real-time, multiplayer updates) while keeping the <a href="https://data-star.dev/examples/templ_counter" target="_blank">simple cases simple</a>.
      </p>
      <p>
        <strong style={{ fontFamily: 'var(--wa-font-family-longform)', fontStyle: 'italic' }}>Datastar as DuckDB</strong>
      </p>
      <ul>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Embedded, but powerful:</strong> Multi-target orchestration with SSE; interactivity with HTML attributes.
        </li>
        <li>
          <strong>Built for modern platforms:</strong> modern browser features (SSE, View Transitions, Web Components) narrow SPA advantages (interactive UI/UX); Datastar aims to reduce the reactivity UX gap.
        </li>
      </ul>

      <LongformQuote
        icon="feather-pointed"
        quote="Product design is making things simpler to achieve, not adding new features."
        href="https://zachwill.com/making-things-simpler/"
        tooltip="Ben Tossell"
      />
      <p>
        <strong>There are problems that neither SQLite or MySQL/Postgres are great for — and where DuckDB shines.</strong> Datastar is a good analogy. Choose the best tool for your problem; some demands require even heavier frameworks.
      </p>
    </div>
  </wa-card>
);

const DatastarRecap = () => (
  <wa-card id="recap">
    <img
      slot="media"
      src="/assets/datastar-blast.jpg"
      style={{ aspectRatio: '2/1', objectFit: 'cover' }}
      alt="Album art"
      data-on-load="console.log('⚡️ This site was built with Bun, Datastar, and WebAwesome 🚀')"
    />
    <div className="wa-stack">
      <div className="wa-flank:end wa-align-items-center">
        <dl className="wa-stack wa-gap-2xs">
          <dt className="wa-caption-m">
            Recap
          </dt>
          <dd className="wa-heading-l">Datastar</dd>
        </dl>
        <wa-badge>Hypermedia Framework</wa-badge>
      </div>
      <wa-divider></wa-divider>
      <p>
        Datastar enforces boundaries: persistent state on server; ephemeral in signals. Events trigger compute, SSE patches HTML, and the DOM morphs. This loop keeps the server in charge and the UI interactive.
      </p>
      <p>
        Datastar is designed for hypermedia's <a href="https://www.youtube.com/watch?v=xzC3g0qIRro" target="_blank">hard problems first</a>. Multi-target updates, real-time pushes, and reactive UX are core primitives. <strong>The framework assumes these capabilities and delivers a pragmatic set of tools.</strong>
      </p>
      <p>
        Handful of Datastar patterns: two-way forms (<code>data-bind</code>); <a href="https://github.com/andersmurphy/hyperlith/blob/master/examples/billion_cells/src/app/main.clj#L281" target="_blank">ephemeral toasts</a> (<code>data-on-load__delay</code>); <a href="https://github.com/andersmurphy/hyperlith/blob/master/examples/virtual_scroll_y/src/app/main.clj#L112-L113" target="_blank">virtual scrolling</a> (<code>data-ref</code> + throttling). Notice these aren't hacks, they're included.
      </p>
      <LongformQuote
        icon="arrows-rotate"
        quote="A complex system that works is invariably found to have evolved from a simple system that worked."
        href="https://zachwill.com/complex-systems/"
        tooltip="John Gall"
      />
      <p>
        When in doubt, <a href="/hobbit-software" target="_blank" rel="noopener noreferrer">write hobbit software</a> — treat browsers as interactive terminals; stream patches; ignore framework wars.
      </p>
      <p><strong style={{ fontFamily: 'var(--wa-font-family-longform)', fontStyle: 'italic' }}>Hypermedia Recap</strong></p>
      <ul>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Shared DNA:</strong> htmx and Datastar use declarative HTML attributes, embrace the server, and minimize client complexity.
        </li>
        <li>
          <strong>Different areas of focus:</strong> htmx extends hypermedia with request/response; Datastar adds spreadsheet reactivity and orchestrates streaming updates.
        </li>
      </ul>

    </div>
  </wa-card>
);

interface TwoColumnSectionProps {
  left: ReactNode;
  right: ReactNode;
}

const TwoColumnSection = ({ left, right }: TwoColumnSectionProps) => {
  return (
    <section className="datastar-layout">
      <div className="datastar-column">
        <div className="wa-stack wa-gap-m wa-mobile-only">
          {right}
        </div>
        {left}
      </div>
      <div className="datastar-column is-sticky wa-desktop-only">
        {right}
      </div>
    </section>
  );
};

export function Main() {
  return (
    <div className="wa-stack wa-gap-l">
      <PageCSS />

      <TwoColumnSection
        left={
          <>
            <DatastarIntro />
            <TodoCard />
          </>
        }
        right={
          <>
            <wa-callout variant="brand" appearance="accent">
              <wa-icon slot="icon" name="rocket"></wa-icon>
              <div>
                <span style={{ fontFamily: 'var(--wa-font-family-longform)', fontWeight: 'var(--wa-font-weight-normal)', fontStyle: 'italic' }}>Author's Note:&nbsp;</span> Datastar is pretty awesome
              </div>
            </wa-callout>
            <MentalModelsCard />
          </>
        }
      />

      <wa-divider></wa-divider>

      <TwoColumnSection
        left={
          <>
            <HTMXComparison />
            <CodeSampleCard />
          </>
        }
        right={
          <>
            <wa-callout variant="warning" appearance="accent">
              <wa-icon slot="icon" name="file-code"></wa-icon>
              <Prose>
                &ldquo;<strong>Hobbit software:</strong> Pretty chill, keeps to itself, tends to its databases, hangs out with other hobbit software at the pub, unbothered by the scheming of wizards and orcs...&rdquo;
              </Prose>
            </wa-callout>
            <MorpheusMatrixCard />
          </>
        }
      />

      <wa-divider></wa-divider>

      <TwoColumnSection
        left={
          <>
            <SpreadsheetComparison />
          </>
        }
        right={
          <>
            <wa-callout variant="success" appearance="accent">
              <wa-icon slot="icon" name="table"></wa-icon>
              <Prose>
                &ldquo;Spreadsheets really are the fullest realization we've seen of functional-programming-without-code... It's no wonder they kicked off the microcomputer era.&rdquo;
              </Prose>
            </wa-callout>
            <MorpheusSpreadsheetCard />
          </>
        }
      />

      <wa-divider></wa-divider>

      <TwoColumnSection
        left={
          <>
            <DuckDBComparison />
          </>
        }
        right={
          <>
            <wa-callout appearance="accent" style={{ backgroundColor: 'var(--wa-color-purple-fill-loud)' }}>
              <wa-icon slot="icon" name="keyboard"></wa-icon>
              <Prose>
                &ldquo;My basic rule is: analogies are great for a sympathetic audience and bad for an antagonistic one.&rdquo;
              </Prose>
            </wa-callout>
            <MorpheusDuckDBCard />
          </>
        }
      />

      <wa-divider></wa-divider>

      <TwoColumnSection
        left={
          <>
            <DatastarRecap />
            <UserCard />
          </>
        }
        right={
          <>
            <wa-callout appearance="accent">
              <wa-icon slot="icon" name="rocket"></wa-icon>
              Datastar is a hypermedia framework focused on reactivity and streaming updates.
            </wa-callout>
            <MentalModelsCard />
          </>
        }
      />

    </div>
  );
}
