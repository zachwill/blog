import React, { ReactNode } from 'react';

export const config = {
  title: "Datastar",
  permalink: "/datastar/"
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
        <wa-button id={buttonId} href={href} size="large" appearance="filled">
          <wa-icon name={icon} style={{ fontSize: 'var(--wa-font-size-xl)' }}></wa-icon>
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
&lt;<span className="tag">div</span> <span className="attribute">class</span>="<span className="value">fellowship</span>"&gt;
  &lt;<span className="tag">p</span> <span className="attribute">class</span>="<span className="value">ring-bearer</span>"&gt;
    Frodo carries the &lt;<span className="tag">span</span> <span className="attribute">id</span>="<span className="value">one-ring</span>"&gt;One Ring&lt;/<span className="tag">span</span>&gt;
  &lt;/<span className="tag">p</span>&gt;
  &lt;<span className="tag">ul</span> <span className="attribute">class</span>="<span className="value">companions</span>"&gt;
    &lt;<span className="tag">li</span> <span className="attribute">data-race</span>="<span className="value">wizard</span>"&gt;Gandalf the Grey&lt;/<span className="tag">li</span>&gt;
    &lt;<span className="tag">li</span> <span className="attribute">data-race</span>="<span className="value">elf</span>"&gt;Legolas&lt;/<span className="tag">li</span>&gt;
    &lt;<span className="tag">li</span> <span className="attribute">data-race</span>="<span className="value">dwarf</span>"&gt;Gimli&lt;/<span className="tag">li</span>&gt;
  &lt;/<span className="tag">ul</span>&gt;
&lt;/<span className="tag">div</span>&gt;`.trim()
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
              HTMX <wa-icon name="arrow-right"></wa-icon>
            </span>
            <p className="wa-caption-m">Yes, both Datastar and HTMX use declarative attributes.</p>
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

const PricingCard = () => (
  <wa-card>
    <div className="wa-stack">
      <div className="wa-split">
        <div className="wa-cluster wa-heading-l">
          <wa-icon name="bookmark"></wa-icon>
          <h3>Fellowship</h3>
        </div>
        <wa-badge>Most Popular</wa-badge>
      </div>
      <span className="wa-flank wa-align-items-baseline wa-gap-2xs">
        <span className="wa-heading-2xl">$120</span>
        <span className="wa-caption-l">per year</span>
      </span>
      <p className="wa-caption-l">Carry great power (and great responsibility).</p>
      <wa-button variant="brand" tabIndex={-1}>Get this Plan</wa-button>
    </div>
    <div slot="footer" className="wa-stack wap-gap-s">
      <h4 className="wa-heading-s">What You Get</h4>
      <div className="wa-stack">
        <div className="wa-flank">
          <wa-icon name="user" fixed-width></wa-icon>
          <span className="wa-caption-m">9 users</span>
        </div>
        <div className="wa-flank">
          <wa-icon name="ring" fixed-width></wa-icon>
          <span className="wa-caption-m">1 ring</span>
        </div>
        <div className="wa-flank">
          <wa-icon name="chess-rook" fixed-width></wa-icon>
          <span className="wa-caption-m">API access to Isengard</span>
        </div>
        <div className="wa-flank">
          <wa-icon name="feather" fixed-width></wa-icon>
          <span className="wa-caption-m">Priority eagle support</span>
        </div>
      </div>
    </div>
  </wa-card>
);

const ReceiptCard = () => (
  <wa-card>
    <div className="wa-stack">
      <div className="wa-split wa-align-items-start">
        <dl className="wa-stack wa-gap-2xs">
          <dt className="wa-heading-s">Amount</dt>
          <dd className="wa-heading-l">$5,610.00</dd>
        </dl>
        <wa-badge appearance="filled outlined" variant="success">Paid</wa-badge>
      </div>
      <wa-divider></wa-divider>
      <dl className="wa-stack">
        <div className="wa-flank wa-align-items-center">
          <dt><wa-icon name="user" label="Name" fixed-width></wa-icon></dt>
          <dd>Tom Bombadil</dd>
        </div>
        <div className="wa-flank wa-align-items-center">
          <dt><wa-icon name="calendar-days" label="Date" fixed-width></wa-icon></dt>
          <dd><wa-format-date date="2025-03-15"></wa-format-date></dd>
        </div>
        <div className="wa-flank wa-align-items-center">
          <dt><wa-icon name="coins" fixed-width></wa-icon></dt>
          <dd>Paid with copper pennies</dd>
        </div>
      </dl>
    </div>
    <div slot="footer">
      <a href="" className="wa-cluster wa-gap-2xs" tabIndex={-1}>
        <span>Download Receipt</span>
        <wa-icon name="arrow-right"></wa-icon>
      </a>
    </div>
  </wa-card>
);

const RestaurantCard = () => (
  <wa-card>
    <div className="wa-stack">
      <h3 className="wa-heading-m">Chalmun's Spaceport Cantina</h3>
      <div className="wa-cluster wa-gap-xs">
        <wa-rating value="4.6" readonly tabIndex={-1}></wa-rating>
        <strong>4.6</strong>
        <span>(419 reviews)</span>
      </div>
      <div className="wa-cluster wa-gap-xs">
        <div className="wa-cluster wa-gap-3xs">
          <wa-icon name="dollar" style={{ color: 'var(--wa-color-green-60)' }}></wa-icon>
          <wa-icon name="dollar" style={{ color: 'var(--wa-color-green-60)' }}></wa-icon>
        </div>
        <span className="wa-caption-m">&bull;</span>
        <wa-tag size="small">Cocktail Bar</wa-tag>
        <wa-tag size="small">Gastropub</wa-tag>
        <wa-tag size="small">Local Fare</wa-tag>
      </div>
      <div className="wa-flank wa-gap-xs">
        <wa-icon name="location-dot"></wa-icon>
        <a href="#" className="wa-caption-m" tabIndex={-1}>Mos Eisley, Tatooine</a>
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
        <img slot="before" src="/assets/morpheus-htmx.jpg" alt="Morpheus + HTMX" />
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
        <img slot="after" src="/assets/matrix-datastar.jpg" alt="Morpheus + HTMX" />
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
        <img slot="after" src="/assets/matrix-rocket.jpg" alt="Morpheus + HTMX" />
      </wa-comparison>
    </div>
  </wa-card>
);


const ShoppingCartCard = () => (
  <wa-card>
    <div slot="header" className="wa-split">
      <h3 className="wa-heading-m">Your Cart</h3>
      <wa-button appearance="plain" size="small" tabIndex={-1}>
        <wa-icon name="xmark" label="Close"></wa-icon>
      </wa-button>
    </div>
    <div className="wa-stack wa-gap-l">
      <div className="wa-flank">
        <wa-avatar
          shape="rounded"
          style={{ backgroundColor: 'var(--wa-color-success-fill-normal)', color: 'var(--wa-color-success-on-quiet)' }}
        >
          <wa-icon slot="icon" name="jedi"></wa-icon>
        </wa-avatar>
        <div className="wa-stack wa-gap-2xs">
          <div className="wa-split wa-gap-2xs">
            <strong>Initiate Saber</strong>
            <strong>$179.99</strong>
          </div>
          <div className="wa-split wa-gap-2xs wa-caption-m">
            <span>Green</span>
            <a href="#" tabIndex={-1}>Remove</a>
          </div>
        </div>
      </div>
      <wa-divider></wa-divider>
      <div className="wa-flank">
        <wa-avatar
          shape="rounded"
          style={{ backgroundColor: 'var(--wa-color-purple-fill-normal)', color: 'var(--wa-color-purple-on-quiet)' }}
        >
          <wa-icon slot="icon" name="robot"></wa-icon>
        </wa-avatar>
        <div className="wa-stack wa-gap-2xs">
          <div className="wa-split wa-gap-2xs">
            <strong>Repair Droid</strong>
            <strong>$3,049.99</strong>
          </div>
          <div className="wa-split wa-gap-2xs wa-caption-m">
            <span>R-series</span>
            <a href="#" tabIndex={-1}>Remove</a>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" className="wa-stack">
      <div className="wa-split">
        <strong>Subtotal</strong>
        <strong>$3,229.98</strong>
      </div>
      <span className="wa-caption-m">Shipping and taxes calculated at checkout.</span>
      <wa-button tabIndex={-1} variant="brand">
        <wa-icon slot="start" name="shopping-bag"></wa-icon>
        Checkout
      </wa-button>
    </div>
  </wa-card>
);

const TodoCard = () => (
  <wa-card>
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
      <wa-checkbox tabIndex={-1} checked>Check off an example todo</wa-checkbox>
      <wa-checkbox tabIndex={-1}>Check out the Datastar docs</wa-checkbox>
      <wa-checkbox tabIndex={-1}>Keep scrolling for more comparisons</wa-checkbox>
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
      <wa-button href="https://github.com/zachwill" target="_blank" appearance="outlined" tabIndex={-1}>
        <wa-icon slot="start" name="code"></wa-icon>
        Github
      </wa-button>
      <wa-button href="https://twitter.com/zachwill" target="_blank" appearance="outlined" tabIndex={-1}>
        <wa-icon slot="start" name="at"></wa-icon>
        Twitter
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
        Datastar is a framework focused on interactivity and streaming updates through a handful of HTML attributes. The server owns persistent state and logic; the client handles reactive UI with signals. The server computes and streams patches; the client provides immediate feedback.
      </p>
      <p>
        HTML is the contract between these two. Stable element ids are server targets; the DOM is the update surface. Events trigger server actions that stream patches — morphing elements or updating signals. There's little state to synchronize, as the frontend acts as a dumb, reactive terminal.
      </p>
      <p>
        <strong>Datastar's philosophy</strong>
      </p>
      <ul>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Stream-first approach:</strong> Simple patches via SSE; real-time pushes and multi-target updates are first-class.
        </li>
        <li>
          <strong>Declarative reactivity:</strong> Interactive UI is handled through signals and HTML attributes.
        </li>
      </ul>
      <LongformQuote
        icon="hat-wizard"
        quote="All we have to decide is what to do with the time that is given to us. There are other forces at work in this world, Frodo, besides the will of evil."
        href="#"
        tooltip="Wise words from Gandalf"
      />
      <p>
        Designed for hard problems — multi-target updates, real-time state, reactive UX — easy problems solve themselves. Datastar treats client reactivity as a core primitive. The result is a hypermedia framework capable of handling simple CRUD apps or a million multiplayer checkboxes.
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
          <dd className="wa-heading-l">HTMX</dd>
        </dl>
        <wa-badge variant="warning">Hypermedia OG</wa-badge>
      </div>
      <wa-divider></wa-divider>
      <p>
        HTMX extends hypermedia: any element makes requests; any event triggers them; any target receives updates. Strong locality of behavior via hx-* attributes keeps the server authoritative and the client minimal. For CRUD and linear flows without heavy JavaScript, HTMX excels. Its declarative approach makes request/response very easy to implement.
      </p>
      <p>
        But HTMX strains with complex UI interactions. Multi-part updates require out-of-band swaps — a workable solution to a messy problem. Ephemeral UI state remains ad hoc, requiring a good chunk of users to bolt on Alpine. These trade-offs are from HTMX's core approach: declarative request/response rather than declarative interactivity.
      </p>
      <p>
        <strong>Where Datastar diverges</strong>
      </p>
      <ul>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Reactivity as a core primitive:</strong> Signals, computed values, and effects handle ephemeral UI; no bolt-ons needed.
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
          HTMX extends hypermedia with declarative request/response: minimal client, server in charge.
        </li>
        <li>
          Datastar combines declarative reactivity with streaming updates: it assumes a responsive UI and makes it achievable in pragmatic ways.
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
        My favorite mental model for Datastar is spreadsheets. Spreadsheets are incredibly useful across domains. Yet the database remains the truth, while the spreadsheet provides a reactive view. In this analogy: signals are cells and computed values are formulas. Type in a cell (data-bind) for immediate updates — but the database (server) owns persistent truth.
      </p>
      <p>
        <strong>Datastar as a spreadsheet</strong>
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
        Make no mistake: using spreadsheets requires discipline — otherwise an analyst's view can turn into a tangled mess. The same can happen with signals and effects. But if the server owns state and streams patches, then the client can act as an interactive terminal.
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
        Both DuckDB and Datastar handle hard cases (complex analytical queries; real-time, multiplayer updates) while aiming to keep the simple cases simple.
      </p>
      <p>
        <strong>Datastar as DuckDB</strong>
      </p>
      <ul>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Embedded, but powerful:</strong> Multi-target orchestration via SSE; interactivity via HTML attributes.
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
        There are problems that neither SQLite or MySQL/Postgres are great for — and where DuckDB shines. In my opinion, Datastar is a good analogy. On the other hand, some demands require heavier frameworks.
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
        Datastar enforces boundaries: persistent state on server; ephemeral in signals. Events trigger compute, the server streams patches, and the DOM morphs or signals update. This general loop centralizes truth while keeping UI interactive.
      </p>
      <p>
        Datastar is designed for hypermedia's hard problems first. Multi-target updates, real-time pushes, and reactive UX are core primitives. The framework assumes these capabilities and delivers a pragmatic set of tools.
      </p>
      <p>
        Handful of Datastar patterns: two-way forms (data-bind); ephemeral toasts (data-on-load__delay); virtual scrolling (data-ref + throttling). Notice these aren't hacks, they're included.
      </p>
      <LongformQuote
        icon="arrows-rotate"
        quote="A complex system that works is invariably found to have evolved from a simple system that worked."
        href="https://zachwill.com/complex-systems/"
        tooltip="John Gall"
      />
      <p>
        When in doubt, write hobbit software — treat browsers as interactive terminals; stream patches; ignore framework wars.
      </p>
      <p><strong>Hypermedia Recap</strong></p>
      <ul>
        <li style={{ marginBottom: 'var(--wa-space-s)' }}>
          <strong>Shared DNA:</strong> HTMX and Datastar use declarative HTML attributes, embrace the server, and minimize client complexity.
        </li>
        <li>
          <strong>Different areas of focus:</strong> HTMX extends hypermedia with request/response; Datastar adds spreadsheet reactivity and orchestrates streaming updates.
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
