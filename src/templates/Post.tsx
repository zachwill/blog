import React from 'react';
import Layout from './Layout';

interface PostProps {
  title: string;
  children: React.ReactNode;
  date?: string;
  permalink?: string;
}

export default function Post({ title, children, date, permalink }: PostProps) {
  return (
    <Layout title={title}>
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