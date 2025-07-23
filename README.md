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
blog/
├── .github/
│   └── workflows/
│       └── pages.yml          # GitHub Actions deployment
├── docs/
│   ├── MIGRATION.md           # Migration documentation
│   └── examples/              # Usage examples
├── content/
│   └── pages/                 # Future .mdx pages
├── drafts/                    # Draft posts (unpublished)
├── src/
│   ├── templates/             # React components
│   │   ├── Layout.tsx         # Main layout wrapper
│   │   ├── Post.tsx           # Blog post template
│   │   └── Page.tsx           # Static page template
│   ├── assets/                # All static assets
│   │   ├── style.css          # Main stylesheet
│   │   ├── pygments.css       # Code syntax highlighting
│   │   ├── favicon.ico        # Site icon
│   │   ├── resume.pdf         # Resume PDF
│   │   └── *.png              # Images and icons
│   ├── build.ts               # Main build script
│   ├── dev.ts                 # Development server
│   └── site.config.ts         # Site configuration
├── _posts/                    # Blog posts (.md and .mdx)
├── dist/                      # Generated static files (git-ignored)
├── package.json               # Dependencies and scripts
├── bunfig.toml               # Bun configuration
├── CNAME                     # GitHub Pages domain
├── README.md                 # This file
└── resume.md                 # Resume page source
```

## 🛠️ Development

```bash
# Hot-reload development server (recommended)
bun run dev

# Manual build and serve
bun run build
cd dist && python3 -m http.server 8000
```

The development server will:
- 🔨 Build the site automatically on file changes
- 📁 Watch for changes in `_posts/`, `src/`, and root `.md`/`.mdx` files
- 🚀 Serve the site at http://localhost:8000
- 🔄 Show build status in the terminal

### Writing Content

#### Blog Posts

Create new posts in the `_posts/` directory with the filename format:
```
YYYY-MM-DD-slug.md     # For regular Markdown posts
YYYY-MM-DD-slug.mdx    # For MDX posts with React components
```

Example frontmatter:
```yaml
---
layout: post
title: My Great Post
permalink: /my-great-post/
---
```

#### MDX Posts

MDX posts support all Markdown features plus React components:

```mdx
---
layout: post
title: Interactive Post
permalink: /interactive-example/
---

# Regular Markdown works

- Lists
- **Bold text**
- Code blocks

## Add React Components

<div style={{
  background: 'linear-gradient(45deg, #007aff, #00d4ff)',
  color: 'white',
  padding: '20px',
  borderRadius: '8px'
}}>
  This is a React component in your post!
</div>
```

#### Static Pages

Add Markdown or MDX files to the root directory:
- `about.md` or `about.mdx`
- `resume.md` or `resume.mdx`

## 🔧 Features

- **⚡ Fast Builds**: Powered by Bun for lightning-fast processing
- **🔥 Hot Reload**: Development server with automatic rebuilds
- **⚛️ React Components**: Customizable layouts and MDX support
- **📝 Dual Format**: Both Markdown (.md) and MDX (.mdx) support
- **🎨 Syntax Highlighting**: Code blocks with syntax highlighting
- **📡 RSS Feed**: Automatically generated at `/rss.xml`
- **🚀 GitHub Actions**: Automated deployment to GitHub Pages
- **🔗 Pretty URLs**: Clean permalink structure maintained from Jekyll

## 🎯 Future Enhancements

- [ ] Hot-reload development server ✅ **DONE**
- [ ] MDX support for interactive components ✅ **DONE**
- [ ] RSS feed generation ✅ **DONE**
- [ ] Sitemap.xml generation
- [ ] Tag pages and filtering
- [ ] Search functionality

## 📝 Migration Notes

This site was migrated from Jekyll in 2025. Key improvements:

- **Speed**: Build times reduced from ~30s to ~3s
- **Modern Stack**: React components with TypeScript
- **Simplified**: No Ruby dependencies, just Bun and Node.js
- **Future-Ready**: Easy to extend with MDX support for interactive content

## 🏗️ Technical Details

- **Runtime**: Bun
- **Templates**: React with TypeScript
- **Markdown**: Unified/Remark pipeline with GFM support
- **Styling**: CSS (converted from LESS)
- **Deployment**: GitHub Actions + GitHub Pages
