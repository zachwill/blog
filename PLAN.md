# Repository Cleanup Plan

The migration from Jekyll to Bun was successful, but the repository has become cluttered with legacy files, backups, and mixed structures. This plan will organize everything properly.

## 🎯 Goals

1. **Clean Structure**: Organized, logical file hierarchy
2. **Remove Cruft**: Delete unnecessary legacy files
3. **Keep History**: Preserve important migration artifacts
4. **Clear Separation**: Distinguish between source, build, and config files
5. **Future-Proof**: Make the repo easy to maintain and extend

## 🗂️ Current State Analysis

### ✅ Keep (Core System)
```
src/                    # Modern build system
├── templates/          # React components
├── assets/            # CSS, images
├── build.ts           # Main build script
├── dev.ts             # Development server
└── site.config.ts     # Site configuration

_posts/                 # Blog content (both .md and .mdx)
package.json           # Dependencies
bunfig.toml           # Bun configuration
.github/workflows/     # CI/CD
```

### ⚠️ Cleanup Required
```
jekyll-backup/         # Move to docs/ or remove entirely
_layouts/              # DELETE - replaced by src/templates/
_includes/             # DELETE - replaced by src/templates/
_plugins/              # DELETE - not needed
_drafts/               # MOVE to drafts/ (no underscore)
css/                   # DELETE - moved to src/assets/
js/                    # DELETE - moved to src/assets/
img/                   # DELETE - moved to src/assets/
_config.yml            # DELETE - replaced by src/site.config.ts
index.html             # DELETE - generated dynamically
```

### 🤔 Decide Fate
```
MIGRATION.md           # Keep as docs/MIGRATION.md
atom.xml              # DELETE - now generated as dist/atom.xml
resume.pdf            # MOVE to src/assets/
favicon.ico           # MOVE to src/assets/
CNAME                 # Keep in root (GitHub Pages requirement)
```

## 📋 Cleanup Tasks

### Phase 1: Remove Jekyll Files
```bash
# Delete Jekyll-specific directories
rm -rf _layouts _includes _plugins _sass

# Delete old asset directories (content moved to src/assets/)
rm -rf css js img

# Delete Jekyll config
rm -f _config.yml index.html

# Delete generated/legacy files
rm -f atom.xml
```

### Phase 2: Reorganize Content
```bash
# Move drafts (remove underscore prefix)
mv _drafts drafts

# Move static assets to proper location
mv resume.pdf src/assets/
mv favicon.ico src/assets/

# Move documentation
mkdir -p docs
mv MIGRATION.md docs/
```

### Phase 3: Decide on Jekyll Backup
**Option A: Keep as Documentation**
```bash
mv jekyll-backup docs/jekyll-reference
```

**Option B: Remove Entirely** (Recommended - it's in git history)
```bash
rm -rf jekyll-backup
```

### Phase 4: Create Missing Structure
```bash
# Create directories for future content types
mkdir -p content/pages    # For future .mdx pages
mkdir -p docs/examples    # For documentation examples
```

## 🎯 Final Directory Structure

```
blog/
├── .github/
│   └── workflows/
│       └── pages.yml          # GitHub Actions
├── docs/
│   ├── MIGRATION.md           # Migration documentation
│   └── examples/              # Usage examples
├── drafts/                    # Draft posts (no underscore)
│   └── *.md
├── src/
│   ├── templates/             # React components
│   │   ├── Layout.tsx
│   │   ├── Post.tsx
│   │   └── Page.tsx
│   ├── assets/                # All static assets
│   │   ├── style.css
│   │   ├── pygments.css
│   │   ├── favicon.ico
│   │   ├── resume.pdf
│   │   └── images/
│   ├── build.ts               # Build system
│   ├── dev.ts                 # Development server
│   └── site.config.ts         # Configuration
├── _posts/                    # Blog posts (.md and .mdx)
├── dist/                      # Generated site (gitignored)
├── node_modules/              # Dependencies (gitignored)
├── .gitignore
├── bunfig.toml
├── CNAME                      # GitHub Pages domain
├── package.json
├── README.md
├── resume.md                  # Resume page source
└── PLAN.md                    # This file (delete after cleanup)
```

## 🔧 Build System Updates Needed

After cleanup, update these files:

### 1. Update `src/build.ts`
- Fix asset copying paths
- Update favicon.ico path reference
- Remove atom.xml copying (now generated)

### 2. Update `.gitignore`
```gitignore
node_modules/
dist/
.DS_Store
bun.lockb
*.log
```

### 3. Update `README.md`
- Remove references to old Jekyll structure
- Update asset paths in documentation
- Clean up the directory structure diagram

## ✅ Verification Checklist

After cleanup, verify:

- [ ] `bun run build` works without errors
- [ ] `bun run dev` starts properly  
- [ ] All existing post URLs still work
- [ ] Assets load correctly (CSS, images, favicon)
- [ ] RSS feed generates at `/atom.xml`
- [ ] Resume page loads from `resume.md`
- [ ] MDX example post works
- [ ] GitHub Actions workflow still functions

## 🚀 Post-Cleanup Tasks

1. **Test thoroughly** - Build and serve locally
2. **Update documentation** - Reflect new structure
3. **Commit cleanup** - Single commit with all changes
4. **Deploy** - Verify production works
5. **Delete PLAN.md** - No longer needed

## ⚠️ Rollback Plan

If something breaks:
1. All Jekyll files are preserved in git history
2. `git log --oneline` to find last working commit
3. `git revert <commit-hash>` to undo changes
4. Or restore specific files with `git checkout <commit> -- <file>`

## 🎯 Success Criteria

Repository is considered clean when:
- ✅ No Jekyll-specific files in root
- ✅ Clear separation between source and generated content  
- ✅ All assets in logical locations
- ✅ Build system works flawlessly
- ✅ Directory structure is self-explanatory
- ✅ Easy for future contributors to understand 