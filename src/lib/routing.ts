import type { ReactNode } from 'react';

export type PageContext = {
  path: string;
  query: Record<string, string>;
};

export type PageMeta = {
  title: string;
  permalink: string;
  description?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    type?: 'website' | 'article';
    twitterCard?: 'summary' | 'summary_large_image';
  };
};

export type PageSlots = {
  Main: (ctx: PageContext) => ReactNode;
  MainFooter?: (ctx: PageContext) => ReactNode;
  Scripts?: (ctx: PageContext) => ReactNode;
  Styles?: (ctx: PageContext) => ReactNode;
};

export type PageSpec = {
  meta: PageMeta;
  slots: PageSlots;
};

type PageSlot = ((ctx: PageContext) => ReactNode) | (() => ReactNode);

export type ComponentModule = {
  config: PageMeta;
  Main: PageSlot;
  MainFooter?: PageSlot;
  Scripts?: PageSlot;
  Styles?: PageSlot;
};

function normalizeSlot(slot: PageSlot | undefined): ((ctx: PageContext) => ReactNode) | undefined {
  if (!slot) return undefined;

  return (ctx: PageContext) => {
    if (slot.length > 0) {
      return (slot as (ctx: PageContext) => ReactNode)(ctx);
    }

    return (slot as () => ReactNode)();
  };
}

export function normalizePermalink(permalink: string): string {
  if (permalink === '/') return permalink;

  const withLeadingSlash = permalink.startsWith('/') ? permalink : `/${permalink}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function specFromModule(mod: ComponentModule): PageSpec {
  return {
    meta: {
      ...mod.config,
      permalink: normalizePermalink(mod.config.permalink),
    },
    slots: {
      Main: normalizeSlot(mod.Main)!,
      MainFooter: normalizeSlot(mod.MainFooter),
      Scripts: normalizeSlot(mod.Scripts),
      Styles: normalizeSlot(mod.Styles),
    },
  };
}
