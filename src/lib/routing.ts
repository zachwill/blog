import type { ReactNode } from 'react';

/**
 * Page context passed to slot functions during rendering.
 * For static site generation, this is simpler than server-side routing.
 */
export type PageContext = {
  /** Current page path */
  path: string;
  /** URL query parameters (for dev server) */
  query: Record<string, string>;
};

/**
 * Page metadata - similar to YAML frontmatter but as TypeScript exports.
 * This is what TSX pages export as `config`.
 */
export type PageMeta = {
  /** Page title */
  title: string;
  /** Page URL path (e.g., "/" or "/about/") */
  permalink: string;
  /** Meta description for SEO */
  description?: string;
  /** Open Graph image */
  ogImage?: string;
  /** Layout type - for special styling */
  layout?: 'default' | 'post' | 'resume' | 'full-width';
  /** For posts: publication date */
  date?: string;
  /** Open Graph configuration */
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    type?: 'website' | 'article';
    twitterCard?: 'summary' | 'summary_large_image';
  };
};

/**
 * Slot export functions that pages can define.
 * Each slot corresponds to a named area in the layout.
 */
export type SlotExports = {
  /** Main content area - REQUIRED */
  Main: (ctx: PageContext) => ReactNode;
  /** Header slot */
  Header?: (ctx: PageContext) => ReactNode;
  /** Navigation slot */
  Navigation?: (ctx: PageContext) => ReactNode;
  /** Navigation header (above nav) */
  NavigationHeader?: (ctx: PageContext) => ReactNode;
  /** Navigation footer (below nav) */
  NavigationFooter?: (ctx: PageContext) => ReactNode;
  /** Banner slot (top of page) */
  Banner?: (ctx: PageContext) => ReactNode;
  /** Subheader slot */
  Subheader?: (ctx: PageContext) => ReactNode;
  /** Main header (above main content) */
  MainHeader?: (ctx: PageContext) => ReactNode;
  /** Main footer (below main content) */
  MainFooter?: (ctx: PageContext) => ReactNode;
  /** Aside/sidebar slot */
  Aside?: (ctx: PageContext) => ReactNode;
  /** Footer slot */
  Footer?: (ctx: PageContext) => ReactNode;
  /** Additional scripts to inject */
  Scripts?: (ctx: PageContext) => ReactNode;
  /** Additional styles to inject */
  Styles?: (ctx: PageContext) => ReactNode;
};

/**
 * Complete page specification combining metadata and slots.
 */
export type PageSpec = {
  /** Page metadata (title, permalink, etc.) */
  meta: PageMeta;
  /** Slot render functions */
  slots: SlotExports;
};

/**
 * A component module is what a TSX page file exports.
 * It has a `config` object and slot component functions.
 */
export type ComponentModule = {
  config: PageMeta;
  Main: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  Header?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  Navigation?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  NavigationHeader?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  NavigationFooter?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  Banner?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  Subheader?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  MainHeader?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  MainFooter?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  Aside?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  Footer?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  Scripts?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
  Styles?: ((ctx: PageContext) => ReactNode) | (() => ReactNode);
};

/**
 * Normalize a slot function to always accept PageContext.
 * Some slots are defined without parameters, this wrapper handles both cases.
 */
function normalizeSlot(
  slot: ((ctx: PageContext) => ReactNode) | (() => ReactNode) | undefined
): ((ctx: PageContext) => ReactNode) | undefined {
  if (!slot) return undefined;
  // Check if the function expects arguments
  return (ctx: PageContext) => {
    // Call with context - if the function ignores it, that's fine
    return (slot as (ctx: PageContext) => ReactNode)(ctx);
  };
}

/**
 * Convert a component module (TSX page exports) to a PageSpec.
 */
export function specFromModule(mod: ComponentModule): PageSpec {
  return {
    meta: mod.config,
    slots: {
      Main: normalizeSlot(mod.Main)!,
      Header: normalizeSlot(mod.Header),
      Navigation: normalizeSlot(mod.Navigation),
      NavigationHeader: normalizeSlot(mod.NavigationHeader),
      NavigationFooter: normalizeSlot(mod.NavigationFooter),
      Banner: normalizeSlot(mod.Banner),
      Subheader: normalizeSlot(mod.Subheader),
      MainHeader: normalizeSlot(mod.MainHeader),
      MainFooter: normalizeSlot(mod.MainFooter),
      Aside: normalizeSlot(mod.Aside),
      Footer: normalizeSlot(mod.Footer),
      Scripts: normalizeSlot(mod.Scripts),
      Styles: normalizeSlot(mod.Styles),
    },
  };
}

/**
 * Create a PageSpec from Markdown frontmatter and content.
 * This allows MD files to work as a subset of TSX files.
 */
export function specFromMarkdown(
  frontmatter: Record<string, unknown>,
  content: string,
  renderContent: (html: string) => ReactNode
): PageSpec {
  const meta: PageMeta = {
    title: (frontmatter.title as string) || 'Untitled',
    permalink: (frontmatter.permalink as string) || '/',
    description: frontmatter.description as string | undefined,
    layout: (frontmatter.layout as PageMeta['layout']) || 'default',
    date: frontmatter.date as string | undefined,
  };

  return {
    meta,
    slots: {
      Main: () => renderContent(content),
    },
  };
}
