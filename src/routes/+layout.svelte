<script lang="ts">
  import favicon from "$lib/assets/favicon.png";
  import { page } from "$app/state";
  import { beforeNavigate } from "$app/navigation";
  import { prefersReducedMotion } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { fade } from "svelte/transition";
  import type { TransitionConfig } from "svelte/transition";
  import "../app.css";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import CommandPalette from "$lib/components/CommandPalette.svelte";
  import Terminal from "$lib/components/Terminal.svelte";

  let { children } = $props();

  injectAnalytics();

  let menuOpen = $state(false);

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  // Close menu on navigation
  $effect(() => {
    page.url.pathname;
    menuOpen = false;
  });

  // ---- Spatial page transitions -------------------------------------------
  // Pages are laid out on a 2D grid: columns are the top-level sections in
  // nav order, rows are URL depth (/ is row 1, /blog row 2, /blog/post row 3).
  // Navigating flies the old page out and the new page in along the vector
  // between their grid cells, so e.g. /blog/post -> /about moves up and left.
  // The root spans the whole top row, so every section reaches it straight up.
  const sections = ["about", "projects", "gear", "blog", "now", "contact"];
  const STEP_VH = 20; // viewport-height fraction per grid cell
  const MAX_STEPS = 2; // cap so far-apart sections don't fly off-screen
  const DURATION = 180;
  const IN_DELAY = 60;

  let currPage: string = $state(page.url.pathname);
  let prevPage = $state("");

  beforeNavigate((navigation) => {
    const to = navigation.to?.url.pathname;
    if (to && to !== currPage) {
      prevPage = currPage;
      currPage = to;
    }
  });

  function cell(path: string) {
    const segments = path.replace(/\/$/, "").split("/").filter(Boolean);
    return {
      depth: segments.length + 1,
      col: segments.length ? sections.indexOf(segments[0]) : -1,
    };
  }

  // Grid offset (in cells) from the previous page to the current one.
  function offset() {
    const from = cell(prevPage);
    const to = cell(currPage);
    const clamp = (n: number) => Math.max(-MAX_STEPS, Math.min(MAX_STEPS, n));
    // Root (col -1) and unknown sections sit in the same column as the other
    // endpoint, so the move is purely vertical.
    const dx = from.col === -1 || to.col === -1 ? 0 : to.col - from.col;
    return { x: clamp(dx), y: clamp(to.depth - from.depth) };
  }

  function spatial(_node: Element, { out }: { out: boolean }): TransitionConfig {
    const { x, y } = offset();
    const motion = prefersReducedMotion.current ? 0 : 1;
    const sign = out ? -1 : 1;
    const step = (window.innerHeight * STEP_VH) / 100;
    const dx = sign * x * step * motion;
    const dy = sign * y * step * motion;
    // The outgoing page is read here before SvelteKit resets the scroll
    // position, so pinning it by the current scroll offset keeps the part
    // the user was looking at in place while it flies away.
    const anchor = out ? window.scrollY : 0;

    return {
      duration: DURATION,
      delay: out ? 0 : IN_DELAY,
      easing: cubicOut,
      css: (t, u) =>
        `opacity: ${t}; transform: translate(${dx * u}px, ${dy * u - anchor}px);`,
    };
  }

  // ---- Nav indicator -------------------------------------------------------
  // A bar under the active section that slides sideways on navigation, so the
  // nav moves in the same horizontal direction as the page transition.
  let linksEl: HTMLDivElement | undefined = $state();
  let indicator = $state({ x: 0, width: 0, visible: false, animate: false });
  // Plain variable on purpose: tracks whether the bar has been placed since the
  // nav mounted, so the first placement snaps instead of sliding in from x=0.
  let indicatorPlaced = false;

  function placeIndicator() {
    const active = linksEl?.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!active) {
      indicatorPlaced = false;
      indicator = { x: 0, width: 0, visible: false, animate: false };
      return;
    }
    indicator = {
      x: active.offsetLeft,
      width: active.offsetWidth,
      visible: true,
      animate: indicatorPlaced,
    };
    indicatorPlaced = true;
  }

  $effect(() => {
    page.url.pathname; // re-measure once the active link has changed
    placeIndicator();
    window.addEventListener("resize", placeIndicator);
    // Font swap changes link widths after first paint.
    document.fonts?.ready.then(placeIndicator);
    return () => window.removeEventListener("resize", placeIndicator);
  });
</script>

<svelte:head>
  <link rel="icon" type="image/png" sizes="128x128" href={favicon} />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="reptop blog"
    href="/rss.xml"
  />
  <!-- Page-specific tags (title, description, og:title, ...) live in each
       page's own <svelte:head>: heads are concatenated, not merged, and
       scrapers read the first occurrence — so the layout must not set them. -->
  <meta property="og:site_name" content="reptop" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={new URL("/og.png", page.url.origin).href} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={new URL("/og.png", page.url.origin).href} />
</svelte:head>

{#if page.url.pathname !== "/"}
  <nav class="nav" in:fade={{ duration: 150 }}>
    <a href="/" class="logo">reptop</a>

    <div class="links" class:open={menuOpen} bind:this={linksEl}>
      {#each sections as section, i}
        {#if i > 0}<span class="sep" aria-hidden="true">/</span>{/if}
        <a
          href="/{section}"
          aria-current={page.url.pathname.startsWith(`/${section}`)
            ? "page"
            : undefined}>{section}</a
        >
      {/each}
      <span
        class="indicator"
        class:visible={indicator.visible}
        class:animate={indicator.animate}
        style:transform="translateX({indicator.x}px)"
        style:width="{indicator.width}px"
        aria-hidden="true"
      ></span>
    </div>
    <button
      class="menu-toggle"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      onclick={toggleMenu}
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
  </nav>
{/if}

<!-- Old and new pages overlap in this grid during a transition. -->
<div class="frame">
  {#key page.url.pathname}
    <div
      class="page"
      in:spatial={{ out: false }}
      out:spatial={{ out: true }}
    >
      {@render children()}
    </div>
  {/key}
</div>
<CommandPalette />
<Terminal />

<style>
  .frame {
    display: grid;
    flex: 1;
    /* Keeps the scroll-pinned outgoing page from painting over the nav. */
    overflow: clip;
  }

  .page {
    grid-area: 1 / 1;
    min-width: 0;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 14px 20px;
    border-bottom: 1px solid color-mix(in srgb, var(--txt-3) 22%, transparent);

    width: min(1100px, calc(100% - 24px));

    margin: 0 auto;
  }

  .logo {
    color: var(--txt-0);
    font-weight: 600;
    font-size: 1.86rem;
    letter-spacing: 0.06em;
  }

  .logo:hover {
    color: var(--yellow);
    text-decoration: underline var(--yellow) 2px;
  }

  .logo:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--yellow) 60%, transparent);
    outline-offset: 3px;
  }

  .links {
    position: relative;
    display: flex;
    gap: 0;
    flex-wrap: wrap;
  }

  .links a {
    color: var(--txt-2);
    font-size: 1.45rem;
    padding: 8px 10px;

    transition:
      background-color 140ms ease,
      color 140ms ease;
  }

  .sep {
    color: var(--txt-3);
    font-size: 1.45rem;
    padding: 8px 0;
  }

  .indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    background: var(--yellow);
    opacity: 0;
    pointer-events: none;
  }

  .indicator.visible {
    opacity: 1;
  }

  /* Matches the page transition: 180ms out + 60ms delay before the new page
     lands, so the bar arrives together with it. */
  .indicator.animate {
    transition:
      transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
      width 240ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .links a:hover {
    background: color-mix(in srgb, var(--bg-2) 65%, transparent);
    color: var(--yellow);
  }

  .links a[aria-current="page"] {
    color: var(--yellow);
  }

  .links a:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--yellow) 60%, transparent);
    outline-offset: 3px;
  }

  .menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px;
  }

  .menu-toggle:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--yellow) 60%, transparent);
    outline-offset: 3px;
  }

  .bar {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--txt-2);
    transition: background-color 140ms ease;
  }

  .menu-toggle:hover .bar {
    background: var(--yellow);
  }

  @media (max-width: 520px) {
    .nav {
      position: relative;
      justify-content: space-between;
      padding: 14px 12px;
      width: min(1100px, calc(100% - 16px));
      flex-wrap: wrap;
    }

    .logo {
      font-size: 1.85rem;
    }

    .menu-toggle {
      display: flex;
    }

    .links {
      display: none;
      width: 100%;
      flex-direction: column;
      border-top: 1px solid color-mix(in srgb, var(--txt-3) 22%, transparent);
      margin-top: 10px;
      padding-top: 6px;
    }

    .links.open {
      display: flex;
    }

    .links a {
      font-size: 1.3rem;
      padding: 10px 4px;
    }

    .sep,
    .indicator {
      display: none;
    }

    .links a ~ a {
      border-top: 1px solid color-mix(in srgb, var(--txt-3) 14%, transparent);
    }
  }
</style>
