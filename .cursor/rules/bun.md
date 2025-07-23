# Bun Static Site Generator - Development Guide

This project is a custom static site generator built with Bun, React, and Markdown/MDX processing. Here are the key patterns and conventions to follow when working on this codebase.

## 🏗️ Project Architecture

### Core Philosophy
- **Bun-first**: Leverage Bun's native capabilities for bundling, serving, and TypeScript execution
- **React SSR**: Use React components to template HTML, rendered server-side with `renderToStaticMarkup`
- **Markdown/MDX**: Support both regular Markdown (.md) and MDX (.mdx) for content with React components
- **Static output**: Generate a completely static site in `dist/` for deployment

### Directory Structure
```
blog/
├── content/                    # All content files
│   ├── posts/                  # Published blog posts (YYYY-MM-DD-slug.md/mdx)
│   ├── drafts/                 # Unpublished drafts (same naming)
│   └── pages/                  # Static pages (resume.md, about.md, etc.)
├── src/
│   ├── templates/              # React components for rendering
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   ├── Post.tsx            # Blog post template
│   │   └── Page.tsx            # Static page template
│   ├── assets/                 # Static assets (CSS, images, fonts)
│   ├── build.ts                # Main build script
│   ├── dev.ts                  # Development server
│   └── site.config.ts          # Site configuration
├── dist/                       # Generated static site (git-ignored)
├── package.json                # Bun dependencies and scripts
└── bunfig.toml                 # Bun configuration
```

## 📝 Content Conventions

### Blog Posts
- **Location**: `content/posts/`
- **Naming**: `YYYY-MM-DD-slug.md` or `YYYY-MM-DD-slug.mdx`
- **Frontmatter**: Always include `title`, optionally `permalink`
- **Date extraction**: Date comes from filename, not frontmatter
- **Slug generation**: Auto-generated from filename unless `permalink` specified

Example post:
```markdown
---
layout: post
title: My Great Post
permalink: /custom-url/  # Optional
---

Content goes here...
```

### Static Pages
- **Location**: `content/pages/`
- **Naming**: `page-name.md` or `page-name.mdx`
- **Special handling**: `resume.md` gets `layout: resume` treatment (no header)

### MDX Support
- Use `.mdx` extension for files that need React components
- All MDX files are processed with `@mdx-js/mdx` and `remarkGfm`
- Fallback to Markdown processing if MDX compilation fails

## 🔧 Development Patterns

### Build System (`src/build.ts`)
- **Unified pipeline**: Use `unified()` with `remarkParse`, `remarkGfm`, `remarkRehype`, `rehypeHighlight`, `rehypeStringify`
- **MDX compilation**: Use `@mdx-js/mdx` with `outputFormat: 'function-body'`
- **React rendering**: All templates use `renderToStaticMarkup` for static HTML
- **Asset copying**: Copy `src/assets/` to `dist/assets/` and root-level assets
- **RSS generation**: Auto-generate `dist/atom.xml` from latest 20 posts

### Development Server (`src/dev.ts`)
- **Use Bun.serve()**: Never spawn external servers like Python's http.server
- **Static file serving**: Handle via `fetch` handler, not `static` option (which doesn't exist)
- **File watching**: Use Node.js built-in `fs.watch()`, not external libraries like chokidar
- **Rebuild triggers**: Watch `content/` and `src/` directories for changes
- **Port**: Default to 3000 for development

### Package.json Scripts
```json
{
  "scripts": {
    "build": "bun run src/build.ts",
    "dev": "bun run src/dev.ts"
  }
}
```

## 🎯 Bun-Specific Patterns

### Development Server Setup
```typescript
import { serve } from 'bun';

const server = serve({
  port: 3000,
  development: true, // Enable dev mode
  
  async fetch(req) {
    const url = new URL(req.url);
    let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
    
    // Try exact file first
    const file = Bun.file(`./dist${filePath}`);
    if (await file.exists()) {
      return new Response(file);
    }
    
    // Fallback patterns for clean URLs
    // ... handle various fallbacks
  }
});
```

### File Watching
```typescript
import { watch } from 'fs';

// Watch content files
const contentWatcher = watch('./content', { recursive: true }, async (eventType, filename) => {
  if (filename && filename.match(/\.(md|mdx)$/)) {
    await buildSite();
  }
});
```

### TypeScript Execution
- Always use `bun run` for TypeScript files
- No need for `tsx` or `ts-node`
- Bun handles TypeScript compilation automatically

## ⚠️ Common Pitfalls & Solutions

### Don't Use These Patterns
- ❌ `static: { '/': './dist' }` in `Bun.serve()` (doesn't exist)
- ❌ `chokidar` for file watching (use built-in `fs.watch`)
- ❌ Spawning Python servers or other external servers
- ❌ Custom hot reload scripts (Bun handles this)
- ❌ Complex bundling setup (let Bun handle it)

### Do Use These Patterns
- ✅ `Bun.file()` for serving static files
- ✅ `renderToStaticMarkup()` for React SSR
- ✅ `unified()` pipeline for Markdown processing
- ✅ Built-in Node.js APIs where possible
- ✅ Proper error handling with fallbacks

### Dependencies Management
- **Runtime deps**: React, unified ecosystem, @mdx-js/mdx, gray-matter
- **Dev deps**: @types/bun, @types/react, @types/node
- **Avoid**: chokidar, express, other web servers, webpack, rollup

## 🚀 Adding New Features

### New Content Type
1. Add directory under `content/`
2. Update `build.ts` with processing logic
3. Create React template in `src/templates/`
4. Add to file watcher in `dev.ts`

### New Template Component
1. Create in `src/templates/`
2. Follow existing patterns (accept props, return JSX)
3. Use `renderToStaticMarkup()` in build script
4. Handle both Markdown and MDX content via `dangerouslySetInnerHTML`

### New Asset Type
1. Add to `src/assets/`
2. Update asset copying logic in `build.ts`
3. Reference via `/assets/filename` in templates

## 🔍 Debugging Tips

### Build Issues
- Check `bun run build` output for specific errors
- Verify file paths and frontmatter format
- Test Markdown/MDX compilation separately

### Dev Server Issues
- Ensure `dist/` directory exists and has content
- Check file path resolution logic in `fetch` handler
- Verify port 3000 isn't in use

### Content Issues
- Validate frontmatter YAML syntax
- Check filename format for posts (YYYY-MM-DD-slug.ext)
- Ensure MDX syntax is valid React/JSX

This project prioritizes simplicity and leverages Bun's capabilities rather than fighting against them. When in doubt, check if Bun has a built-in solution before adding external dependencies. 