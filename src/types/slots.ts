import { ReactNode } from 'react';

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
  [key: string]: React.ComponentType<any> | SlotPageConfig;
}

// Extended page data to include slot information
export interface SlotPageData {
  title: string;
  permalink: string;
  slots: SlotContent;
  config: SlotPageConfig;
  isSlotBased: true;
} 