import React, { ReactNode } from 'react';

export const config = {
  title: "Timeline",
  permalink: "/timeline",
};

export function Main() {
  return (
    <>
      <wa-card style={{ maxWidth: '42rem', margin: '0 auto' }}>
        <div className="wa-timeline wa-stack wa-gap-xs">
          {/* Group: Aug 1 */}
          <section className="wa-timeline__group">
            <h3 className="wa-timeline__date">1 Aug, 2023</h3>
            <ol className="wa-timeline__list" role="list">
              <li className="wa-timeline__item">
                <div className="wa-timeline__rail">
                  <div className="wa-timeline__icon">
                    <wa-avatar
                      image="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?q=80&w=320&auto=format&fit=crop"
                      label="James Collins"
                    ></wa-avatar>
                  </div>
                </div>
                <div className="wa-timeline__body">
                  <h4 className="wa-timeline__title wa-cluster">
                    <wa-icon name="file-lines" label="Document"></wa-icon>
                    Created “Preline in React” task
                  </h4>
                  <p className="wa-timeline__desc">Find more detailed instructions here</p>
                  <div className="wa-timeline__meta">
                    <wa-avatar
                      image="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?q=80&w=64&auto=format&fit=crop"
                      label="James Collins"
                    ></wa-avatar>
                    <span>James Collins</span>
                    <time dateTime="2023-08-01T09:00:00-04:00">9:00 AM</time>
                  </div>
                </div>
              </li>

              <li className="wa-timeline__item">
                <div className="wa-timeline__rail">
                  <div className="wa-timeline__icon">
                    <div className="wa-timeline__icon wa-timeline__icon--ring">
                      <wa-icon name="bug" label="Bug"></wa-icon>
                    </div>
                  </div>
                </div>
                <div className="wa-timeline__body">
                  <h4 className="wa-timeline__title">Release v5.2.0 quick bug fix</h4>
                  <p className="wa-timeline__desc">This release includes a few quick fixes for...</p>
                  <div className="wa-timeline__meta">
                    <wa-avatar initials="A" label="Alex Gregarov"></wa-avatar>
                    <span>Alex Gregarov</span>
                    <time dateTime="2023-08-01T11:35:00-04:00">11:35 AM</time>
                  </div>
                </div>
              </li>

              <li className="wa-timeline__item">
                <div className="wa-timeline__rail">
                  <div className="wa-timeline__icon">
                    <wa-avatar
                      image="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?q=80&w=320&auto=format&fit=crop"
                      label="James Collins"
                    ></wa-avatar>
                  </div>
                </div>
                <div className="wa-timeline__body">
                  <h4 className="wa-timeline__title">Marked “Install Charts” completed</h4>
                  <p className="wa-timeline__desc">Finally! You can check it out here</p>
                  <div className="wa-timeline__meta">
                    <wa-avatar
                      image="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?q=80&w=64&auto=format&fit=crop"
                      label="James Collins"
                    ></wa-avatar>
                    <span>James Collins</span>
                    <time dateTime="2023-08-01T15:10:00-04:00">3:10 PM</time>
                  </div>
                </div>
              </li>
            </ol>
          </section>

          {/* Group: Jul 31 (ringed icon example) */}
          <section className="wa-timeline__group">
            <h3 className="wa-timeline__date">31 Jul, 2023</h3>
            <ol className="wa-timeline__list" role="list">
              <li className="wa-timeline__item">
                <div className="wa-timeline__rail">
                  <div className="wa-timeline__icon wa-timeline__icon--ring">
                    <wa-icon name="wand-magic-sparkles" label="Magic"></wa-icon>
                  </div>
                </div>
                <div className="wa-timeline__body">
                  <h4 className="wa-timeline__title">Take a break ⛳️</h4>
                  <p className="wa-timeline__desc">Just chilling for now...</p>
                </div>
              </li>
            </ol>
          </section>

          {/* Minimal dot section + "Show older" */}
          <wa-details appearance="plain">
            <span slot="summary">
              Show older
            </span>
            <section className="wa-timeline__group">
              <h3 className="wa-timeline__date">30 Jul, 2023</h3>
              <ol className="wa-timeline__list" role="list">
                <li className="wa-timeline__item">
                  <div className="wa-timeline__rail">
                    <div className="wa-timeline__icon">
                      <span className="wa-timeline__dot" aria-hidden="true"></span>
                    </div>
                  </div>
                  <div className="wa-timeline__body">
                    <h4 className="wa-timeline__title">Final touch ups</h4>
                    <p className="wa-timeline__desc">Double check everything and make sure we're ready to go.</p>
                  </div>
                </li>
              </ol>
            </section>
          </wa-details>
        </div>
      </wa-card>
    </>
  );
}