<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import { page } from "$app/stores";
  import "../app.css";
  import { inject } from "@vercel/analytics";
  import CommandPalette from "$lib/components/CommandPalette.svelte";
  import Terminal from "$lib/components/Terminal.svelte";

  let { children } = $props();

  inject();

  let menuOpen = $state(false);

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  // Close menu on navigation
  $effect(() => {
    $page.url.pathname;
    menuOpen = false;
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="alternate" type="application/rss+xml" title="reptop blog" href="/rss.xml" />
  <title>reptop</title>
  <meta name="description" content="Raed Kabir — CS + Math student at Oregon State. Projects, writing, and gear." />
  <meta property="og:title" content="reptop" />
  <meta property="og:description" content="Raed Kabir — CS + Math student at Oregon State. Projects, writing, and gear." />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="reptop" />
  <meta name="twitter:description" content="Raed Kabir — CS + Math student at Oregon State. Projects, writing, and gear." />
</svelte:head>

{#if $page.url.pathname !== "/"}
  <nav class="nav">
    <a href="/" class="logo">reptop</a>

    <div class="links" class:open={menuOpen}>
      <a href="/about" aria-current={$page.url.pathname.startsWith('/about') ? 'page' : undefined}>about</a>
      <a href="/projects" aria-current={$page.url.pathname.startsWith('/projects') ? 'page' : undefined}>projects</a>
      <a href="/gear" aria-current={$page.url.pathname.startsWith('/gear') ? 'page' : undefined}>gear</a>
      <a href="/blog" aria-current={$page.url.pathname.startsWith('/blog') ? 'page' : undefined}>blog</a>
      <a href="/contact" aria-current={$page.url.pathname.startsWith('/contact') ? 'page' : undefined}>contact</a>
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

{@render children()}

<CommandPalette />
<Terminal />

<style>
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

  .links a + a::before {
    content: "/";
    color: var(--txt-3);
    margin-right: 10px;
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

    .links a + a::before {
      display: none;
    }

    .links a + a {
      border-top: 1px solid color-mix(in srgb, var(--txt-3) 14%, transparent);
    }
  }
</style>
