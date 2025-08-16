# [zachwill.com](https://zachwill.com)

Custom static site generator built with Bun.

## Quick Start

```bash
# Install dependencies
bun install

# Development with hot reloading
bun run dev       # → http://localhost:3000

# Build for production  
bun run build     # → outputs to dist/
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
permalink: /custom-url/    # Optional
---

Your content here...
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