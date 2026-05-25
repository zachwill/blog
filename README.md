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
