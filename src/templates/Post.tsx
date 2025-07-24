import React from 'react';
import { formatDate, About } from '@/components';

interface ContentData {
  type: 'post' | 'page' | 'home';
  title: string;
  content: string;
  metadata?: {
    date?: string;
    isFavorite?: boolean;
  };
}

export function Post({ contentData }: { contentData: ContentData }) {
  return (
    <>
      {contentData.type === 'post' && (
        <>
          <div className="wa-desktop-only wa-split wa-align-items-baseline" style={{ marginBottom: 'var(--wa-space-l)' }}>
            <h1 className="wa-heading-xl">{contentData.title}</h1>
            {contentData.metadata?.date && (
              <time className="wa-body-s">
                {formatDate(contentData.metadata.date)}
              </time>
            )}
          </div>
          <div className="wa-mobile-only wa-stack wa-gap-s" style={{ marginBottom: 'var(--wa-space-m)' }}>
            <h1 className="wa-heading-xl">{contentData.title}</h1>
            {contentData.metadata?.date && (
              <time className="wa-body-s">
                {formatDate(contentData.metadata.date)}
              </time>
            )}
          </div>
        </>
      )}
      <div dangerouslySetInnerHTML={{ __html: contentData.content }} />

      <div style={{ margin: 'var(--wa-space-3xl) 0' }}>
        <wa-divider orientation="horizontal"></wa-divider>
      </div>

      <About />
    </>
  )
}