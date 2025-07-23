# Blog - Bun Static Site Generator

This blog has been migrated from Jekyll to a custom Bun-based static site generator with React components and Markdown support.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Build the site
bun run build

# Preview locally
cd dist && python3 -m http.server 8000
```

## 📁 Directory Structure

```
├── src/
│   ├── templates/        # React components for layouts
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   ├── Post.tsx      # Blog post template
│   │   └── Page.tsx      # Static page template
│   ├── assets/           # CSS, images, and other assets
│   ├── build.ts          # Main build script
│   ├── dev.ts            # Development script
│   └── site.config.ts    # Site configuration
├── _posts/               # Blog posts (Markdown)
├── dist/                 # Generated static files (git-ignored)
└── .github/workflows/    # GitHub Actions for deployment
```

## ✍️ Writing Content

### Blog Posts

Create new posts in the `_posts/` directory with the filename format:
```
YYYY-MM-DD-slug.md
```

Example frontmatter:
```yaml
---
layout: post
title: My Great Post
permalink: /my-great-post/
---
```

### Static Pages

Add Markdown files to the root directory (like `resume.md`). They'll be processed automatically.

## 🔧 Features

- **Fast Builds**: Powered by Bun for lightning-fast processing
- **React Components**: Customizable layouts and templates
- **Markdown Support**: Full GitHub Flavored Markdown with syntax highlighting
- **Asset Processing**: Automatic copying of CSS, images, and other assets
- **GitHub Actions**: Automated deployment to GitHub Pages
- **Pretty URLs**: Clean permalink structure maintained from Jekyll

## 🚀 Deployment

The site automatically deploys to GitHub Pages when you push to the `main` or `gh-pages` branch via GitHub Actions.

### Manual Deployment

```bash
# Build the site
bun run build

# The dist/ directory contains all static files ready for deployment
```

## 🛠️ Development

```bash
# Run the build system
bun run build

# Start a local server for testing
cd dist && python3 -m http.server 8000
```

## 📝 Migration Notes

This site was migrated from Jekyll in 2025. Key improvements:

- **Speed**: Build times reduced from ~30s to ~3s
- **Modern Stack**: React components with TypeScript
- **Simplified**: No Ruby dependencies, just Bun and Node.js
- **Future-Ready**: Easy to extend with MDX support for interactive content

## 🎯 Future Enhancements

- [ ] Hot-reload development server
- [ ] MDX support for interactive components
- [ ] RSS feed generation
- [ ] Sitemap.xml generation
- [ ] Tag pages and filtering
- [ ] Search functionality

## 🏗️ Technical Details

- **Runtime**: Bun
- **Templates**: React with TypeScript
- **Markdown**: Unified/Remark pipeline with GFM support
- **Styling**: CSS (converted from LESS)
- **Deployment**: GitHub Actions + GitHub Pages
