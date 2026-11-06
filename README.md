# Raed Kabir — Portfolio V2

Personal portfolio and blog. Features a 3D interactive scene, markdown-driven project and blog pages, a command palette, and a `/now` page with a terminal animation.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | [SvelteKit](https://kit.svelte.dev/) |
| Language | TypeScript |
| 3D | [Three.js](https://threejs.org/) + [Threlte](https://threlte.dev/) |
| Markdown | [mdsvex](https://mdsvex.com/) |
| Syntax highlighting | [rehype-pretty-code](https://rehype-pretty-code.netlify.app/) |
| Styling | CSS (vanilla) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |
| Build | [Vite](https://vite.dev/) |
| Deploy | [Vercel](https://vercel.com/) |

## Project Tree

```
src/
├── app.css                  # global styles
├── app.html                 # HTML shell
├── lib/
│   ├── actions/
│   │   └── copyCode.ts      # copy-to-clipboard action for code blocks
│   ├── assets/
│   │   ├── bg.png
│   │   ├── favicon.png      # rasterised from favicon.svg (the SVG is ~380 KB)
│   │   ├── favicon.svg
│   │   └── mega_delphox_za/ # 3D model (GLTF + textures)
│   ├── components/
│   │   ├── animation.ts     # animation utilities
│   │   ├── CommandPalette.svelte
│   │   ├── Icon.svelte      # inline SVG icons (no runtime icon fetch)
│   │   ├── Lightbox.svelte
│   │   └── Terminal.svelte
│   ├── gear/                # gear page markdown entries
│   ├── posts/               # blog post markdown files
│   ├── projects/            # project markdown files
│   ├── palette-data.ts      # command palette entries
│   └── profile.ts           # shared profile data
└── routes/
    ├── +layout.svelte       # site-wide layout + spatial page transitions
    ├── +page.svelte         # home page (3D scene)
    ├── Scene.svelte         # Three.js / Threlte scene
    ├── about/
    ├── blog/[slug]/         # +page.server.ts (metadata) + +page.ts (SSR'd markdown body)
    ├── contact/
    ├── gear/
    ├── now/
    ├── projects/[slug]/     # same split as blog/[slug]
    ├── rss.xml/
    └── sitemap.xml/

static/
├── mega_delphox_za/         # optimised 3D model served at runtime
├── projects/                # project images and videos
└── resume.pdf
```

## Development

```sh
npm install
npm run dev
```

```sh
npm run build    # production build
npm run preview  # preview production build
```
