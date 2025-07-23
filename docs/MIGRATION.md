# Migration Game Plan: Jekyll to Bun Static Site Generator

## Phase 1: Preparation & Analysis
1. **Audit Current Jekyll Site**
   - List all post files in `_posts/` directory
   - List all page files (about, resume, etc.)
   - Document current permalink structure
   - Identify all assets (CSS, images, fonts)
   - Note any custom Jekyll plugins or features in use

2. **Create Migration Branch**
   ```bash
   git checkout -b migrate-to-bun
   ```

3. **Backup Current Site**
   - Create a `jekyll-backup` directory
   - Copy all Jekyll-specific files there for reference

## Phase 2: Initialize Bun Project

1. **Create package.json**
   ```json
   {
     "name": "blog-static-site",
     "type": "module",
     "scripts": {
       "build": "bun run src/build.ts",
       "dev": "bun --hot run src/dev.ts"
     },
     "dependencies": {
       "@mdx-js/mdx": "^3.0.0",
       "@types/react": "^18.0.0",
       "@types/react-dom": "^18.0.0",
       "gray-matter": "^4.0.3",
       "react": "^18.0.0",
       "react-dom": "^18.0.0",
       "rehype-stringify": "^10.0.0",
       "remark-parse": "^11.0.0",
       "remark-rehype": "^11.0.0",
       "unified": "^11.0.0"
     }
   }
   ```

2. **Create bunfig.toml** (empty file)

3. **Install dependencies**
   ```bash
   bun install
   ```

## Phase 3: Create Directory Structure

1. **Create directories**
   ```bash
   mkdir -p src/{templates,content/{posts,pages},assets}
   mkdir -p .github/workflows
   ```

2. **Create site.config.ts**
   ```typescript
   export default {
     pageMap: {
       about: '/about/',
       resume: '/resume/'
       // Add other pages as needed
     },
     tagPath(tag: string) {
       return `/tag/${tag}/`;
     }
   }
   ```

## Phase 4: Implement Core Components

1. **Create src/templates/Layout.tsx**
   - Copy from rough draft
   - Customize site title and footer

2. **Create src/templates/Post.tsx**
   - Copy from rough draft
   - Adjust date formatting if needed

3. **Create src/templates/Page.tsx**
   - Copy from rough draft

## Phase 5: Implement Build System

1. **Create src/build.ts**
   - Copy core structure from rough draft
   - Add error handling for missing files
   - Add logging for each processed file

2. **Create src/dev.ts** (simplified version for now)
   ```typescript
   console.log("Dev server not implemented yet - use build.ts");
   ```

## Phase 6: Migrate Content

1. **Convert Jekyll Posts**
   - For each file in `_posts/`:
     - Copy to `src/content/posts/`
     - Keep filename format: `YYYY-MM-DD-slug.md`
     - Add `permalink` field to frontmatter based on current Jekyll permalink
     - Convert any Jekyll-specific syntax (like `{% highlight %}`) to standard Markdown

2. **Convert Static Pages**
   - Copy about.md → `src/content/pages/about.mdx`
   - Copy resume.md → `src/content/pages/resume.mdx`
   - Update frontmatter as needed

3. **Migrate Assets**
   - Copy all CSS files to `src/assets/`
   - Copy all images to `src/assets/images/`
   - Copy any other static files

## Phase 7: Implement GitHub Actions

1. **Create .github/workflows/pages.yml**
   ```yaml
   name: Build & Deploy
   on:
     push:
       branches: [main]
   
   permissions:
     contents: read
     pages: write
     id-token: write
   
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: oven-sh/setup-bun@v2
         - run: bun install --frozen-lockfile
         - run: bun run build
         - uses: actions/upload-pages-artifact@v2
           with:
             path: dist
     
     deploy:
       needs: build
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - uses: actions/deploy-pages@v2
           id: deployment
   ```

## Phase 8: Testing & Validation

1. **Local Build Test**
   ```bash
   bun run build
   ```
   - Verify `dist/` directory is created
   - Check that all posts are generated
   - Verify permalinks match old structure

2. **Local Preview**
   ```bash
   cd dist && python3 -m http.server 8000
   ```
   - Browse to http://localhost:8000
   - Check all links work
   - Verify styling is applied

3. **Content Validation**
   - Ensure all posts are accessible at their permalinks
   - Check tag pages are generated
   - Verify static pages (about, resume) work

## Phase 9: Cleanup & Deploy

1. **Remove Jekyll Files**
   ```bash
   rm -f _config.yml Gemfile Gemfile.lock
   rm -rf _posts _layouts _includes _sass
   ```

2. **Update .gitignore**
   ```
   node_modules/
   dist/
   .DS_Store
   ```

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Migrate from Jekyll to Bun static site generator"
   ```

4. **Deploy**
   ```bash
   git push origin migrate-to-bun
   ```
   - Create PR to main branch
   - Verify GitHub Actions runs successfully
   - Merge when ready

## Phase 10: Post-Migration

1. **Verify Production Site**
   - Check all pages load correctly
   - Test all internal links
   - Verify RSS feed (if implemented)

2. **Document Process**
   - Create README.md with:
     - How to add new posts
     - How to add new pages
     - Local development instructions

3. **Future Enhancements** (optional)
   - Implement hot-reload dev server
   - Add RSS feed generation
   - Create sitemap.xml
   - Add homepage with post listing

## Troubleshooting Checklist

- [ ] If build fails: Check file paths and frontmatter format
- [ ] If styles missing: Verify assets are copied to dist/
- [ ] If permalinks wrong: Check permalink field in frontmatter
- [ ] If GitHub Actions fails: Check permissions and workflow syntax
- [ ] If pages don't deploy: Verify GitHub Pages is enabled in repo settings

## Success Criteria

- [ ] All existing content accessible at same URLs
- [ ] Site builds in under 5 seconds
- [ ] GitHub Actions deploys automatically on push
- [ ] No Jekyll dependencies remain
- [ ] Local development workflow documented