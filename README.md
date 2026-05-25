# [zachwill.com](https://zachwill.com)

Custom static site generator built with Bun.

## Quick Start

```bash
# Install dependencies
bun install

# Development with hot reloading
bun run dev       # → http://localhost:8000

# Build for production  
bun run build     # → outputs to dist/

# Build with per-file logging
BUILD_VERBOSE=1 bun run build
```

## Content Structure

```
content/
├── posts/        # Blog posts: YYYY-MM-DD-slug.md/mdx
├── drafts/       # Unpublished drafts (same naming)
└── pages/        # Static pages: page-name.md/mdx
```

### Writing Posts

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
<wa-callout variant="brand" appearance="plain">
  <wa-icon slot="icon" name="font"></wa-icon>
  No bells and whistles on this <strong>plain</strong> callout
</wa-callout>
```

### MDX Support

Use `.mdx` extension for React components in Markdown:

```jsx
---
title: Interactive Post
---

# Regular Markdown

<CustomComponent prop="value" />

More markdown...
```