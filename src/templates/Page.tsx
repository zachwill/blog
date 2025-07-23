import React from 'react';
import Layout from './Layout';

interface PageProps {
  title: string;
  children: React.ReactNode;
  showHeader?: boolean;
}

export default function Page({ title, children, showHeader = true }: PageProps) {
  return (
    <Layout title={title} showHeader={showHeader}>
      <article>
        <h1>{title}</h1>
        {children}
      </article>

      <footer>
        <p>
          <a className="home" href="/">Home</a>
        </p>
      </footer>
    </Layout>
  );
} 