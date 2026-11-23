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
        <ol className="az-timeline" role="list">
          <li>
            <h3 className="az-job">Director of Data Science</h3>
            <span className="az-date">Jan 2022–present · Trail Blazers</span>
            <div className="az-overlap">
              <strong>G League Liaison · Rip City Remix</strong>
              <span className="az-date">Dec 2022–Jun 2023</span>
              <p className="az-detail">Helped launch Portland’s G League team.</p>
            </div>
          </li>
          <li>
            <h3 className="az-job">Director of Basketball Analytics</h3>
            <span className="az-date">Jun 2014–Jan 2022 · Trail Blazers</span>
            <p className="az-detail">Led the analytics staff, budget, and strategy across coaching, the draft, and free agency.</p>
          </li>
          <li>
            <h3 className="az-job">Basketball Data Analyst</h3>
            <span className="az-date">Jan 2013–Jun 2014 · Trail Blazers</span>
            <p className="az-detail">Built Portland’s first coaching apps, scouting database, and live stats site.</p>
          </li>
          <li>
            <h3 className="az-job">Code for America Fellow</h3>
            <span className="az-date">Jan–Nov 2012</span>
            <p className="az-detail">Built civic apps for local governments.</p>
          </li>
        </ol>
      </article>
      <wa-button
        {...{ class: 'az-email' }}
        slot="footer"
        appearance="accent"
        variant="neutral"
        href="mailto:hey@zachwill.com"
        with-start
      >
        <svg {...{ slot: 'start' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </svg>
        Email Zach
      </wa-button>
    </wa-drawer>
  );
}
