import React from 'react';

export function AboutDrawer() {
  return (
    <wa-drawer
      id="about-zach"
      {...{ class: 'about-drawer' }}
      label="About Zach"
      placement="end"
      light-dismiss
    >
      <span className="az-identity" slot="label">
        <img
          className="az-portrait"
          src="/assets/zach-williams.jpg"
          alt=""
          width="84"
          height="84"
        />
        <span>
          <span className="az-name">Zach Williams</span>
          <span className="az-role">
            Director of Data Science<br />
            Portland Trail Blazers
          </span>
        </span>
      </span>
      <article>
        <p className="az-blog">This blog is a collection of notes on software, data, and ideas.</p>
        <ol className="az-timeline">
          <li>
            <h3 className="az-job">Director of Data Science</h3>
            <span className="az-date">Jan 2022–present · Trail Blazers</span>
            <div className="az-overlap">
              <strong>G League Liaison</strong><br />
              Dec 2022–Jun 2023, alongside my current role. Helped launch the franchise during expansion.
            </div>
          </li>
          <li>
            <h3 className="az-job">Director of Basketball Analytics</h3>
            <span className="az-date">Jun 2014–Jan 2022 · Trail Blazers</span>
            <p className="az-detail">Led analytics for coaches and the front office. Built tools for coaches and scouts.</p>
          </li>
          <li>
            <h3 className="az-job">Basketball Data Analyst</h3>
            <span className="az-date">Jan 2013–Jun 2014 · Trail Blazers</span>
            <p className="az-detail">Built coaching and scouting websites and database tools.</p>
          </li>
          <li>
            <h3 className="az-job">Python developer → Fellow</h3>
            <span className="az-date">2011–2012 · Code for America</span>
            <p className="az-detail">API access and civic apps for local government.</p>
          </li>
        </ol>
      </article>
      <div className="az-actions" slot="footer">
        <wa-button appearance="outlined" variant="neutral" href="mailto:hey@zachwill.com" with-start>
          <svg {...{ slot: 'start' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 6 9 7 9-7" />
          </svg>
          <span className="az-email-address">hey@zachwill.com</span>
          <span className="az-email-short">Email</span>
        </wa-button>
        <wa-button
          {...{ class: 'az-linkedin' }}
          appearance="accent"
          variant="brand"
          href="https://www.linkedin.com/in/heyzachwill/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn (opens in a new tab)"
          with-start
        >
          <svg {...{ slot: 'start' }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8v-4.64c0-1.11-.02-2.53-1.54-2.53-1.54 0-1.78 1.2-1.78 2.45v4.72H9.53V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.8-1.52 3 0 3.55 1.97 3.55 4.53v5.24Z" />
          </svg>
          LinkedIn
        </wa-button>
      </div>
    </wa-drawer>
  );
}
