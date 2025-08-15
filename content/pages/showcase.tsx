import React from 'react';

export const config = {
  title: "Showcase",
  permalink: "/showcase/"
};

function ShoppingCart() {
  return (
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
}

function QuoteCard() {
  return (
    <wa-card>
      <wa-avatar shape="rounded" style={{ '--size': '1.8lh', float: 'left', marginRight: 'var(--wa-space-m)' } as React.CSSProperties}>
        <wa-icon slot="icon" name="hat-wizard" style={{ fontSize: '1.75em' }}></wa-icon>
      </wa-avatar>
      <p className="wa-body-l" style={{ margin: 0, fontFamily: 'var(--wa-font-family-longform)', fontWeight: 'var(--wa-font-weight-longform)' }}>
        &ldquo;All we have to decide is what to do with the time that is given to us. There are other forces at work
        in this world, Frodo, besides the will of evil.&rdquo;
      </p>
    </wa-card>
  );
}

function SignInForm() {
  return (
    <wa-card>
      <div className="wa-stack">
        <h3 className="wa-heading-m">Sign In</h3>
        <wa-input tabIndex={-1} label="Email" placeholder="ddjarin@mandalore.gov" {...{ inert: true } as any}>
          <wa-icon slot="start" name="envelope"></wa-icon>
        </wa-input>
        <wa-input tabIndex={-1} label="Password" type="password" {...{ inert: true } as any}>
          <wa-icon slot="start" name="lock"></wa-icon>
        </wa-input>
        <wa-button tabIndex={-1} variant="brand">Sign In</wa-button>
        <a href="#" tabIndex={-1} className="wa-body-s">I forgot my password</a>
      </div>
    </wa-card>
  );
}

function TodoList() {
  return (
    <wa-card>
      <div className="wa-stack">
        <div className="wa-split">
          <h3 className="wa-heading-m">To-Do</h3>
          <wa-button appearance="plain" size="small" tabIndex={-1}>
            <wa-icon name="plus" label="Add task"></wa-icon>
          </wa-button>
        </div>
        <wa-checkbox tabIndex={-1} checked>Umbrella for Adelard</wa-checkbox>
        <wa-checkbox tabIndex={-1} checked>Waste-paper basket for Dora</wa-checkbox>
        <wa-checkbox tabIndex={-1} checked>Pen and ink for Milo</wa-checkbox>
        <wa-checkbox tabIndex={-1}>Mirror for Angelica</wa-checkbox>
        <wa-checkbox tabIndex={-1}>Silver spoons for Lobelia</wa-checkbox>
      </div>
      <div slot="footer">
        <a href="" tabIndex={-1}>View all completed</a>
      </div>
    </wa-card>
  );
}

function MusicPlayer() {
  return (
    <wa-card>
      <img
        slot="media"
        src="https://images.unsplash.com/photo-1667514627762-521b1c815a89?q=20"
        style={{ aspectRatio: '2/1', objectFit: 'cover' }}
        alt="Album art"
      />
      <div className="wa-stack">
        <div className="wa-flank:end wa-align-items-start">
          <div className="wa-stack wa-gap-3xs">
            <div className="wa-cluster wa-gap-xs" style={{ height: '2.25em' }}>
              <strong>The Stone Troll</strong>
              <small><wa-badge variant="neutral" appearance="filled">E</wa-badge></small>
            </div>
            <span className="wa-caption-m">Samwise G</span>
          </div>
          <wa-button appearance="plain" size="small" tabIndex={-1}>
            <wa-icon name="ellipsis" label="Options"></wa-icon>
          </wa-button>
        </div>
        <div className="wa-stack wa-gap-2xs">
          <wa-progress-bar value={34}></wa-progress-bar>
          <div className="wa-split">
            <span className="wa-caption-xs">1:01</span>
            <span className="wa-caption-xs">-1:58</span>
          </div>
        </div>
        <div className="wa-grid wa-align-items-center" style={{ '--min-column-size': '1em', justifyItems: 'center' } as React.CSSProperties}>
          <wa-button appearance="plain" tabIndex={-1}>
            <wa-icon name="backward" label="Skip backward"></wa-icon>
          </wa-button>
          <wa-button appearance="plain" size="large" tabIndex={-1}>
            <wa-icon name="pause" label="Pause"></wa-icon>
          </wa-button>
          <wa-button appearance="plain" tabIndex={-1}>
            <wa-icon name="forward" label="Skip forward"></wa-icon>
          </wa-button>
        </div>
      </div>
    </wa-card>
  );
}

function RestaurantCard() {
  return (
    <wa-card>
      <div className="wa-stack">
        <h3 className="wa-heading-m">Chalmun's Spaceport Cantina</h3>
        <div className="wa-cluster wa-gap-xs">
          <wa-rating value={4.6} readonly tabIndex={-1}></wa-rating>
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
}

function CalloutExamples() {
  return (
    <wa-card appearance="plain" style={{ '--spacing': '0' } as React.CSSProperties}>
      <div className="wa-stack wa-gap-s">
        <wa-callout variant="success">
          <wa-icon slot="icon" name="rocket"></wa-icon>
          <div className="wa-split">
            <span>This is the way.</span>
            <wa-button variant="success" size="small">
              Follow the Creed
            </wa-button>
          </div>
        </wa-callout>
        <wa-callout variant="warning">
          <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
          <div className="wa-split">
            <span>It's a trap!</span>
            <wa-button variant="warning" size="small">
              Take Evasive Action
            </wa-button>
          </div>
        </wa-callout>
        <wa-callout variant="danger">
          <wa-icon slot="icon" name="moon"></wa-icon>
          <div className="wa-split">
            <span>That's no moon.</span>
            <wa-button variant="danger" size="small">
              Turn Around
            </wa-button>
          </div>
        </wa-callout>
      </div>
    </wa-card>
  );
}

function SettingsToggle() {
  return (
    <wa-card>
      <div className="wa-stack">
        <div className="wa-flank:end">
          <h3 id="odds-label" className="wa-heading-m">Tell Me the Odds</h3>
          <wa-switch size="large" aria-labelledby="odds-label" tabIndex={-1}></wa-switch>
        </div>
        <p className="wa-body-s">
          Allow protocol droids to inform you of probabilities, such as the success rate of navigating an asteroid
          field. We recommend setting this to "Never."
        </p>
      </div>
    </wa-card>
  );
}

function InvoiceCard() {
  return (
    <wa-card>
      <div className="wa-stack">
        <div className="wa-split wa-align-items-start">
          <dl className="wa-stack wa-gap-2xs">
            <dt className="wa-heading-s">Amount</dt>
            <dd className="wa-heading-l">$5,610.00</dd>
          </dl>
          <wa-badge appearance="outlined" variant="success">Paid</wa-badge>
        </div>
        <wa-divider></wa-divider>
        <dl className="wa-stack">
          <div className="wa-flank wa-align-items-center">
            <dt><wa-icon name="user" label="Name" fixed-width></wa-icon></dt>
            <dd>Tom Bombadil</dd>
          </div>
          <div className="wa-flank wa-align-items-center">
            <dt><wa-icon name="calendar-days" label="Date" fixed-width></wa-icon></dt>
            <dd><wa-format-date {...{ date: "2025-03-15" } as any}></wa-format-date></dd>
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
}

function PricingCard() {
  return (
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
}

function CodeSample() {
  return (
    <wa-card className="showcase-code-sample">
      <pre>
        &lt;<span className="tag">div</span> <span className="attribute">class</span>="<span className="value">fellowship</span>"&gt;
        &lt;<span className="tag">p</span> <span className="attribute">class</span>="<span className="value">ring-bearer</span>"&gt;Frodo carries the &lt;<span className="tag">span</span> <span className="attribute">id</span>="<span className="value">one-ring</span>"&gt;One Ring&lt;/<span className="tag">span</span>&gt;&lt;/<span className="tag">p</span>&gt;
        &lt;<span className="tag">ul</span> <span className="attribute">class</span>="<span className="value">companions</span>"&gt;
        &lt;<span className="tag">li</span> <span className="attribute">data-race</span>="<span className="value">wizard</span>"&gt;Gandalf the Grey&lt;/<span className="tag">li</span>&gt;
        &lt;<span className="tag">li</span> <span className="attribute">data-race</span>="<span className="value">elf</span>"&gt;Legolas&lt;/<span className="tag">li</span>&gt;
        &lt;<span className="tag">li</span> <span className="attribute">data-race</span>="<span className="value">dwarf</span>"&gt;Gimli&lt;/<span className="tag">li</span>&gt;
        &lt;/<span className="tag">ul</span>&gt;
        &lt;/<span className="tag">div</span>&gt;</pre>
    </wa-card>
  );
}

function UserProfile() {
  return (
    <wa-card>
      <div className="wa-flank:end">
        <div className="wa-stack wa-gap-xs">
          <div className="wa-cluster wa-gap-xs">
            <h3 className="wa-heading-s">Migs Mayfeld</h3>
            <wa-badge pill>Admin</wa-badge>
          </div>
          <span className="wa-caption-m">Imperial Sharpshooter</span>
        </div>
        <wa-avatar
          image="https://images.unsplash.com/photo-1633268335280-a41fbde58707?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          label="Avatar of a man wearing a sci-fi helmet (Photograph by Nandu Vasudevan)"
        ></wa-avatar>
      </div>
      <div slot="footer" className="wa-grid wa-gap-xs" style={{ '--min-column-size': '10ch' } as React.CSSProperties}>
        <wa-button appearance="outlined" tabIndex={-1}>
          <wa-icon slot="start" name="at"></wa-icon>
          Email
        </wa-button>
        <wa-button appearance="outlined" tabIndex={-1}>
          <wa-icon slot="start" name="phone"></wa-icon>
          Phone
        </wa-button>
      </div>
    </wa-card>
  );
}

function FolderCard() {
  return (
    <wa-card>
      <div className="wa-flank:end">
        <a href="" className="wa-flank wa-link-plain" tabIndex={-1}>
          <wa-avatar
            shape="rounded"
            style={{ backgroundColor: 'var(--wa-color-warning-fill-normal)', color: 'var(--wa-color-warning-on-quiet)' }}
          >
            <wa-icon slot="icon" name="mug-saucer"></wa-icon>
          </wa-avatar>
          <div className="wa-gap-2xs wa-stack">
            <span className="wa-heading-s">Second Breakfast</span>
            <span className="wa-caption-m">19 Items</span>
          </div>
        </a>
        <wa-dropdown>
          <wa-button id="more-actions-2" slot="trigger" appearance="plain" size="small" tabIndex={-1}>
            <wa-icon name="ellipsis-vertical" label="View menu"></wa-icon>
          </wa-button>
          <wa-dropdown-item>Copy link</wa-dropdown-item>
          <wa-dropdown-item>Rename</wa-dropdown-item>
          <wa-dropdown-item>Move to trash</wa-dropdown-item>
        </wa-dropdown>
        <wa-tooltip for="more-actions-2">View menu</wa-tooltip>
      </div>
    </wa-card>
  );
}

function DeckSelection() {
  return (
    <wa-card>
      <div slot="header" className="wa-stack wa-gap-xs">
        <h2 className="wa-heading-m">Decks</h2>
      </div>
      <div className="wa-stack wa-gap-xl">
        <p className="wa-caption-m">
          You haven't created any decks yet. Get started by selecting an aspect that matches your play style.
        </p>
        <div className="wa-grid wa-gap-xl" style={{ '--min-column-size': '30ch' } as React.CSSProperties}>
          <a href="" className="wa-flank wa-align-items-start wa-link-plain" tabIndex={-1}>
            <wa-avatar
              shape="rounded"
              style={{ backgroundColor: 'var(--wa-color-brand-fill-normal)', color: 'var(--wa-color-brand-on-quiet)' }}
            >
              <wa-icon slot="icon" name="shield"></wa-icon>
            </wa-avatar>
            <div className="wa-stack wa-gap-2xs">
              <span className="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
                Vigilance <wa-icon name="arrow-right"></wa-icon>
              </span>
              <p className="wa-caption-m">Protect, defend, and restore as you ready heavy-hitters.</p>
            </div>
          </a>
          <a href="" className="wa-flank wa-align-items-start wa-link-plain" tabIndex={-1}>
            <wa-avatar
              shape="rounded"
              style={{ backgroundColor: 'var(--wa-color-success-fill-normal)', color: 'var(--wa-color-success-on-quiet)' }}
            >
              <wa-icon slot="icon" name="tower-observation"></wa-icon>
            </wa-avatar>
            <div className="wa-stack wa-gap-2xs">
              <span className="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
                Command <wa-icon name="arrow-right"></wa-icon>
              </span>
              <p className="wa-caption-m">Build imposing armies and stockpile resources.</p>
            </div>
          </a>
          <a href="" className="wa-flank wa-align-items-start wa-link-plain" tabIndex={-1}>
            <wa-avatar
              shape="rounded"
              style={{ backgroundColor: 'var(--wa-color-danger-fill-normal)', color: 'var(--wa-color-danger-on-quiet)' }}
            >
              <wa-icon slot="icon" name="explosion"></wa-icon>
            </wa-avatar>
            <div className="wa-stack wa-gap-2xs">
              <span className="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
                Aggression <wa-icon name="arrow-right"></wa-icon>
              </span>
              <p className="wa-caption-m">Relentlessly deal damage and apply pressure to your opponent.</p>
            </div>
          </a>
          <a href="" className="wa-flank wa-align-items-start wa-link-plain" tabIndex={-1}>
            <wa-avatar
              shape="rounded"
              style={{ backgroundColor: 'var(--wa-color-warning-fill-normal)', color: 'var(--wa-color-warning-on-quiet)' }}
            >
              <wa-icon slot="icon" name="hand-sparkles"></wa-icon>
            </wa-avatar>
            <div className="wa-stack wa-gap-2xs">
              <span className="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
                Cunning <wa-icon name="arrow-right"></wa-icon>
              </span>
              <p className="wa-caption-m">Disrupt and frustrate your opponent with dastardly tricks.</p>
            </div>
          </a>
        </div>
      </div>
    </wa-card>
  );
}

export function Main() {
  return (
    <>
      <style>{`
      main {
        background-color: var(--wa-color-surface-lowered);
      }
        .showcase-examples-wrapper {
          container-type: inline-size;
          inline-size: 100%;
          min-block-size: 100%;
          box-sizing: border-box;
        }

        .showcase-examples {
          column-count: 1;
          column-gap: var(--wa-space-m);
        }

        .showcase-examples wa-card {
          display: inline-flex;
          width: 100%;
        }

        .showcase-examples wa-card:has(+ wa-card) {
          margin-block-end: var(--wa-space-m);
        }

        .showcase-examples wa-card[appearance='plain'] {
          background-color: transparent !important;
          border-color: transparent !important;
        }

        /* Responsive column counts via @media queries */
        @media (min-width: 750px) {
          .showcase-examples {
            column-count: 2;
          }
        }

        @media (min-width: 950px) {
          main {
            padding: var(--wa-space-l);
          }
          .showcase-examples {
            column-count: auto;
            column-gap: var(--wa-space-l);
            column-width: 22rem;
            & wa-card:has(+ wa-card) {
              margin-block-end: var(--wa-space-l);
            }
          }
        }

        /* Code sample colour overrides */
        .showcase-code-sample {
          --spacing: ;
          overflow: hidden;
        }

        .showcase-code-sample pre {
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
      <div className="showcase-examples-wrapper">
        <div className="showcase-examples">

          <ShoppingCart />
          <QuoteCard />
          <SignInForm />
          <TodoList />
          <MusicPlayer />
          <RestaurantCard />
          <CalloutExamples />
          <SettingsToggle />
          <InvoiceCard />
          <PricingCard />
          <CodeSample />
          <UserProfile />
          <FolderCard />
          <DeckSelection />

        </div>
      </div >
    </>
  );
}