import React from 'react';

export function AboutButton({ location }: { location: 'sidebar' | 'footer' }) {
  return (
    <wa-button
      id={`about-${location}-trigger`}
      data-about-zach={location}
      type="button"
      variant="neutral"
      appearance="filled"
      size="s"
      with-start
      aria-haspopup="dialog"
      aria-controls="about-zach"
    >
      <svg {...{ slot: 'start' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9.25" />
        <circle cx="12" cy="9" r="3" />
        <path d="M5.7 18.7c.8-3 3-4.5 6.3-4.5s5.5 1.5 6.3 4.5" />
      </svg>
      About Zach
    </wa-button>
  );
}
