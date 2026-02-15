# CLAUDE.md

This file provides guidance for AI assistants working with this repository.

## Project Overview

This is **Carlo Wahlstedt's personal blog and portfolio site** hosted at [thewahlstedts.com](https://thewahlstedts.com). It is a **Jekyll static site** deployed via **GitHub Pages**, built on the [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) theme.

## Repository Structure

```
├── _config.yml            # Main Jekyll configuration (site settings, colors, plugins)
├── _data/                 # Data files
│   ├── SocialNetworks.yml # Social media link definitions
│   └── ui-text.yml        # UI text/translations
├── _includes/             # Reusable HTML partials (nav, footer, head, analytics, comments)
├── _layouts/              # Page templates
│   ├── base.html          # Root layout (CSS/JS loading, HTML skeleton)
│   ├── default.html       # Default wrapper
│   ├── page.html          # Static page layout
│   ├── post.html          # Blog post layout
│   └── minimal.html       # Minimal layout (no nav/footer)
├── _posts/                # Blog posts (~51 posts, dating from 2011-present)
├── css/                   # Stylesheets (Bootstrap 3, custom styles)
│   └── main.css           # Primary custom stylesheet (uses Liquid variables)
├── js/                    # JavaScript (jQuery 1.11.2, Bootstrap 3, custom)
│   └── main.js            # Custom JS (navbar behavior, image carousel)
├── img/                   # Images (avatar, post images, backgrounds)
├── coffee-golf/           # Interactive coffee-golf project page
├── dot/                   # Interactive dot perception test page
├── index.html             # Homepage with paginated post listing
├── aboutme.md             # About page
├── tags.html              # Tag index page
├── 404.html               # Custom 404 page
├── feed.xml               # RSS feed (Liquid-generated)
├── Gemfile                # Ruby dependencies (github-pages v193)
├── Dockerfile             # Docker setup for local development
├── staticman.yml          # Staticman comment system config
└── CNAME                  # Custom domain: thewahlstedts.com
```

## Tech Stack

- **Static site generator**: Jekyll 3.7.4 (via `github-pages` gem v193)
- **CSS framework**: Bootstrap 3
- **JavaScript**: jQuery 1.11.2
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
| `url` | `https://thewahlstedts.com` |
| `title` | `Carlo Wahlstedt` |
| `timezone` | `America/Vancouver` |
| `permalink` | `/:year-:month-:day-:title/` |
| `paginate` | `3` (posts per page) |
| `excerpt_length` | `100` words |

### Color scheme (defined in `_config.yml`, applied via Liquid in `css/main.css`)

- Navbar: `#00A5FF`
- Links: `#FC5A20`
- Hover: `#00A5FF`
- Footer: `#F5F5F5`

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
- Avatar image: `img/avatar-icon.jpg`

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

- Create a directory with an `index.html` (see `coffee-golf/` and `dot/` for examples)
- Or create a top-level `.md`/`.html` file with appropriate front matter

## Important Notes for AI Assistants

- The `css/main.css` file uses Jekyll Liquid tags (`{{ site.variable }}`), so it is not valid standalone CSS — do not try to validate or lint it as plain CSS
- Posts are HTML, not Markdown, due to historical Blogger import — follow this convention for consistency, or use Markdown for new posts if the author prefers
- The site uses Bootstrap 3 (not 4 or 5) and jQuery 1.11.2 — do not introduce Bootstrap 4/5 or modern JS syntax that requires transpilation
- There is no build toolchain (no webpack, no npm) — keep changes simple and compatible with Jekyll's built-in processing
- The `github-pages` gem pins Jekyll and plugin versions — do not upgrade gems without understanding GitHub Pages compatibility
- When modifying templates, test with the Docker setup or `jekyll serve` to verify Liquid template rendering
