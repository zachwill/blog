# [zachwill.com](https://zachwill.com)

Custom static site generator built with Bun.

## Quick Start

```bash
# Install dependencies
bun install

# Development with watch rebuilds and browser reload
bun run dev       # → http://localhost:8000

# Build for production
bun run build     # → outputs to dist/
```

## Web Awesome

Web Awesome Pro **3.14.0** loads from the version-pinned kit CDN configured in
`src/site.config.ts`. Do not copy the licensed Pro distribution into this public
repository. The build needs no local Web Awesome package; visitors need access to
the kit CDN for component JavaScript/styles and the Font Awesome CDN for icons.

`src/templates/Layout.tsx` uses `webawesome.loader.js`: React generates static HTML,
not Lit declarative-shadow-root SSR. The loader discovers components and removes
`wa-cloak` (with its built-in two-second fallback). Initial post scrolling waits for
`wa-discovery-complete`, rather than assuming the components load within 200 ms.
System dark mode is applied before the components load and follows OS changes.
Datastar remains unchanged and is not required for theme/loader initialization.

Keep `wa-palette-zach` and `wa-theme-zach` in `src/assets/theme.css`; their palette,
typography, and spacing are intentional. The theme retains the beta-era heading
utility scale (one step larger than body text). Callout copy stays in normal inline
flow; 3.14's alignment utilities now create flex containers.
`src/assets/content.css` preserves the previous native blockquote, list-marker,
and code-block styling. Keep the custom
cascade-layer order aligned with Web Awesome's `styles/layers.css` when upgrading.

## Content Structure

```
content/
├── posts/        # Blog posts: YYYY-MM-DD-slug.md
├── drafts/       # Unpublished drafts
└── pages/        # Static pages: page-name.md or custom TSX pages
```

## Writing Posts

Create `content/posts/2025-01-01-my-post.md`:

```markdown
---
title: My Great Post
permalink: /custom-url/    # Optional; defaults to /my-post/
---

Your content here...
```

Raw HTML and WebAwesome custom elements are allowed in Markdown posts, so callouts work directly:

```html
<wa-callout variant="brand" appearance="outlined">
  <wa-icon slot="icon" name="font"></wa-icon>
  No bells and whistles on this <strong>outlined</strong> callout
</wa-callout>
```

## Custom Pages

Use `.tsx` pages in `content/pages/` for bespoke layouts, local components, page-specific styles/scripts, and WebAwesome-heavy pages. Each TSX page exports a `config` object and a `Main` component.
