# Blog - Bun Static Site Generator

A custom static site generator built with Bun, React SSR, and Markdown/MDX support.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Development with hot reloading
bun run dev          # → http://localhost:3000

# Build for production  
bun run build        # → outputs to dist/
```

## 📁 Content Structure

```
content/
├── posts/           # Blog posts: YYYY-MM-DD-slug.md/mdx
├── drafts/          # Unpublished drafts (same naming)
└── pages/           # Static pages: page-name.md/mdx
```

### Writing Posts

Create `content/posts/2024-01-01-my-post.md`:

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

## 🔧 Architecture

- **Build**: React SSR with `renderToStaticMarkup()` 
- **Content**: Unified pipeline (remark → rehype → highlight)
- **Dev Server**: Bun.serve() with file watching
- **Output**: Static HTML/CSS/assets in `dist/`

## 🛠️ Development

- **File watching**: Auto-rebuilds on content/src changes
- **Static serving**: All files served from `dist/`
- **Clean URLs**: `/my-post/` → `/my-post/index.html`
- **Assets**: `src/assets/` → `dist/assets/`

Built with Bun's native capabilities - no external bundlers or servers needed.