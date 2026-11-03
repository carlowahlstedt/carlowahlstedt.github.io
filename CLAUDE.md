# CLAUDE.md

This file provides guidance for AI assistants working with this repository.

## Project Overview

This is **Carlo Wahlstedt's personal blog and portfolio site** hosted at [carlo.thewahlstedts.com](https://carlo.thewahlstedts.com). It is a **Jekyll static site** deployed via **GitHub Pages**, built on the [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) theme.

## Repository Structure

```
├── _config.yml            # Main Jekyll configuration (site settings, colors, plugins)
├── _data/                 # Data files
│   ├── apps.yml           # Apps shown on the homepage and /apps
│   ├── SocialNetworks.yml # Social media link definitions (footer)
│   └── ui-text.yml        # UI text/translations
├── _includes/             # Reusable HTML partials (nav, footer, head, analytics, comments)
├── _layouts/              # Page templates
│   ├── base.html          # Root layout (CSS/JS loading, HTML skeleton)
│   ├── default.html       # Default wrapper
│   ├── page.html          # Static page layout
│   ├── post.html          # Blog post layout
│   └── minimal.html       # Minimal layout (no nav/footer)
├── _posts/                # Blog posts (~51 posts, dating from 2011-present)
├── css/                   # Stylesheets (Bootstrap 5, custom styles)
│   └── main.css           # Primary custom stylesheet (uses Liquid variables)
├── js/                    # JavaScript (jQuery 3.7.1, Bootstrap 5 bundle, custom)
│   └── main.js            # Custom JS (multi-level navbar menus)
├── img/                   # Images (avatar, post images, backgrounds)
├── apps/                  # Apps index page plus standalone apps (coffee-golf, dot, farkle)
├── favicon.svg            # The carlowahlstedt logo (also used in the navbar and footer)
├── favicon.ico            # 16/32/48 px fallback rendered from favicon.svg
├── apple-touch-icon.png   # 180 px iOS icon rendered from favicon.svg
├── index.html             # Homepage with paginated post listing
├── aboutme.md             # About page
├── tags.html              # Tag index page
├── 404.html               # Custom 404 page
├── feed.xml               # RSS feed (Liquid-generated)
├── Gemfile                # Ruby dependencies (github-pages v232)
├── Dockerfile             # Docker setup for local development
├── staticman.yml          # Staticman comment system config
└── CNAME                  # Custom domain: carlo.thewahlstedts.com
```

## Tech Stack

- **Static site generator**: Jekyll 3.10.0 (via `github-pages` gem v232; requires Ruby < 4.0)
- **CSS framework**: Bootstrap 5.3.3 (local copy in `css/` and `js/`)
- **JavaScript**: jQuery 3.7.1 (local copy), vanilla JS in `js/main.js`
- **Fonts**: JetBrains Mono (headings, nav, meta; the logo's typeface) and IBM Plex Sans (body), from Google Fonts
- **Markdown**: kramdown with GFM input
- **Syntax highlighting**: Rouge
- **Plugins**: jekyll-paginate, jekyll-sitemap, jemoji
- **Hosting**: GitHub Pages (auto-builds on push to master)
- **Comments**: Disqus (shortname: `carlowahlstedt`)
- **Analytics**: Google Analytics (UA-2690532-15)

## Local Development

### Using Docker (preferred)

```bash
docker build -t site .
docker run -d -p 4000:4000 --name site-con -v "$PWD":/srv/jekyll site
```

### Using Ruby/Bundler

```bash
bundle install
jekyll serve
```

The site runs at `http://localhost:4000` with live reload on file changes.

## Key Configuration (`_config.yml`)

| Setting | Value |
|---------|-------|
| `url` | `https://carlo.thewahlstedts.com` |
| `title` | `Carlo Wahlstedt` |
| `timezone` | `America/Vancouver` |
| `permalink` | `/:year-:month-:day-:title/` |
| `paginate` | `3` (posts per page) |
| `excerpt_length` | `100` words |

### Color scheme (defined in `_config.yml`, applied via Liquid in `css/main.css`)

Taken from the carlowahlstedt logo (source SVG: Google Drive folder "carlowahlstedt logo"):

- Brand / links / header band: indigo `#4338CA` (hover `#3730A3`)
- Text, footer, code blocks: ink `#1E1B4B`
- Accent: teal `#00B8D6` — decoration only (the underscore cursor); it is 2.4:1 on white, too low for text
- Muted text: `#5B5A72`; tint (tag chips, inline code): `#EEF0FB`; borders: `#E4E4F0`
- Dark mode: automatic via `prefers-color-scheme: dark`. The dark palette lives in the `@media (prefers-color-scheme: dark)` block at the top of `css/main.css`, which swaps the CSS variables (page `#12102B`, links `#A5B4FC`, since indigo links are unreadable on dark). Use the variables (`var(--link)`, `var(--page-bg)`, …), not hard-coded colors, in new CSS so both modes keep working

## Content Conventions

### Blog Posts

- **Location**: `_posts/`
- **Filename format**: `YYYY-MM-DD-title-in-kebab-case.html`
- **Format**: Posts are HTML (not Markdown) — this is a legacy convention from Blogger migration
- **Required front matter**:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
tags: [tag1, tag2]
---
```

- Posts automatically get `layout: post`, `comments: true`, and `social-share: true` via defaults in `_config.yml`
- Tags are clickable and link to the tag index page (`tags.html`)

### Pages

- Static pages use `layout: page` (default for all files)
- Pages can be Markdown (`.md`) or HTML
- Add pages to the navbar via `navbar-links` in `_config.yml`

### Images

- Store in `img/` directory
- Post-specific images go in `img/posts/`
- Homepage images go in `img/home/`
- Avatar image: `img/avatar-icon.jpg` (only used as the fallback social share image)
- Favicon / logo: `favicon.svg`; if the logo changes, re-render `favicon.ico` (16/32/48) and `apple-touch-icon.png` (180) from it

## File Conventions

- **Line endings**: LF enforced via `.gitattributes` for all text files
- **CSS**: Custom styles live in `css/main.css` and use Jekyll Liquid template variables (e.g., `{{ site.navbar-col }}`) — this is not standard CSS, it requires Jekyll processing
- **Layouts**: Inheritance chain is `base.html` -> `default.html` -> `page.html`/`post.html`
- **Includes**: Modular HTML partials in `_includes/` for analytics, comments, navigation, social sharing

## Build & Deployment

- **No CI/CD pipelines** — GitHub Pages builds automatically on push to `master`
- **No test suite** — this is a content-focused site
- **Excluded from build** (via `_config.yml` `exclude`): CHANGELOG.md, CNAME, Dockerfile, Gemfile, Gemfile.lock, LICENSE, README.md
- **Note**: Add any new non-content files (like this CLAUDE.md) to the `exclude` list in `_config.yml` to prevent them from being included in the built site

## Common Tasks

### Adding a new blog post

1. Create `_posts/YYYY-MM-DD-post-title.html` (or `.md`)
2. Add YAML front matter with at minimum `title` and `date`
3. Write content below the front matter
4. Push to `master` — GitHub Pages builds automatically

### Modifying site appearance

- **Colors**: Edit color variables in `_config.yml` (navbar-col, link-col, etc.)
- **Navigation**: Edit `navbar-links` in `_config.yml`
- **Social links**: Edit `social-network-links` in `_config.yml`
- **Layout structure**: Modify files in `_layouts/` and `_includes/`
- **Custom CSS**: Edit `css/main.css` (remember it uses Liquid templating)

### Adding a new standalone page/project

- Create a directory under `apps/` with an `index.html` (see `apps/coffee-golf/` and `apps/dot/`), then add an entry to `_data/apps.yml`
- Or create a top-level `.md`/`.html` file with appropriate front matter

## Important Notes for AI Assistants

- The `css/main.css` file uses Jekyll Liquid tags (`{{ site.variable }}`), so it is not valid standalone CSS — do not try to validate or lint it as plain CSS
- Posts are HTML, not Markdown, due to historical Blogger import — follow this convention for consistency, or use Markdown for new posts if the author prefers
- The site uses Bootstrap 5.3.3 and jQuery 3.7.1, served locally — avoid JS syntax that requires transpilation
- There is no build toolchain (no webpack, no npm) — keep changes simple and compatible with Jekyll's built-in processing
- The `github-pages` gem pins Jekyll and plugin versions — do not upgrade gems without understanding GitHub Pages compatibility
- When modifying templates, test with the Docker setup or `jekyll serve` to verify Liquid template rendering
