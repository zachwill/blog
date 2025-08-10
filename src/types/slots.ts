import { ReactNode } from 'react';

// OpenGraph metadata for social media sharing
export interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article' | 'video' | 'music';
  siteName?: string;
  locale?: string;
  // Twitter-specific fields
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
}

// Available slots in wa-page component
export type PageSlot =
  | 'banner'
  | 'header'
  | 'subheader'
  | 'menu'
  | 'navigation-header'
  | 'navigation'
  | 'navigation-footer'
  | 'main-header'
  | 'main'
  | 'main-footer'
  | 'aside'
  | 'footer'
  | 'navigation-toggle'
  | 'skip-to-content';

// Configuration for slot-based TSX pages
export interface SlotPageConfig {
  title: string;
  permalink?: string;
  description?: string;
  layout?: 'default' | 'full-width' | 'minimal';
  openGraph?: OpenGraphData;
}

// Slot content mapping
export type SlotContent = Partial<Record<PageSlot, ReactNode>>;

// Interface that TSX page components should implement
export interface SlotBasedPage {
  config: SlotPageConfig;
  slots: SlotContent;
}

// Helper type for TSX page exports
export interface SlotPageExports {
  config: SlotPageConfig;
  [key: string]: React.ComponentType<any> | SlotPageConfig | undefined;
}

// Extended page data to include slot information
export interface SlotPageData {
  title: string;
  permalink: string;
  slots: SlotContent;
  config: SlotPageConfig;
  openGraph?: OpenGraphData;
  isSlotBased: true;
} 