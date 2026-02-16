# Carlo Wahlstedt

Personal blog and portfolio site at [thewahlstedts.com](https://thewahlstedts.com).

## Tech Stack

- **Static site generator**: Jekyll (via `github-pages` gem v232)
- **CSS framework**: Bootstrap 5.3.3
- **JavaScript**: jQuery 3.7.1
- **Hosting**: GitHub Pages (auto-builds on push to `master`)
- **Comments**: Disqus
- **Analytics**: Google Analytics
- **Theme**: [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll)

## Local Development

### Using Docker

```bash
docker build -t site "$PWD"
docker run -d -p 4000:4000 --name site-con -v "$PWD":/srv/jekyll site
```

Start/stop the container:

```bash
docker start site-con
docker stop site-con
```

### Using Ruby/Bundler

```bash
bundle install
jekyll serve
```

The site runs at http://localhost:4000. Changes to `_config.yml` require a server restart.

## Project Structure

```
├── _config.yml        # Site settings (colors, navbar, social links, plugins)
├── _layouts/          # Page templates (base, default, page, post, minimal)
├── _includes/         # Reusable HTML partials (nav, footer, head, analytics)
├── _posts/            # Blog posts (HTML and Markdown, 2011-present)
├── _data/             # Data files (social networks, UI text)
├── css/               # Stylesheets (main.css uses Liquid variables)
├── js/                # JavaScript
├── img/               # Images (avatar, post images, backgrounds)
├── coffee-golf/       # Interactive project page
├── dot/               # Interactive project page
├── index.html         # Homepage with paginated post listing
├── aboutme.md         # About page
├── tags.html          # Tag index page
└── feed.xml           # RSS feed
```

## Blog Posts

Posts live in `_posts/` with the filename format `YYYY-MM-DD-title.html` (or `.md`).

Required front matter:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
tags: [tag1, tag2]
---
```

## License

Built on the [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) theme by [Dean Attali](https://deanattali.com).
