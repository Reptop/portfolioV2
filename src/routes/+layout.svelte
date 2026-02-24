<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import { page } from "$app/stores";
  import "../app.css";

  let { children } = $props();
</script>

{#if $page.url.pathname !== "/"}
  <nav class="nav">
    <a href="/" class="logo">reptop</a>

    <div class="links">
      <a href="/about">about</a>
      <a href="/projects">projects</a>
      <a href="/gear">gear</a>
      <a href="/blog">blog</a>
      <a href="/contact">contact</a>
    </div>
  </nav>
{/if}

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

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

  /* new: keyboard focus (logo too) */
  .logo:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--yellow) 60%, transparent);
    outline-offset: 3px;
  }

  .links {
    display: flex;
    gap: 0;
    flex-wrap: wrap; /* new: avoids overflow on smaller widths */
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

  .links a:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--yellow) 60%, transparent);
    outline-offset: 3px;
  }

  /* new: small-screen stacking */
  @media (max-width: 520px) {
    .nav {
      justify-content: left;
      padding: 14px 12px;
      width: min(1100px, calc(100% - 16px));
    }

    .logo {
      font-size: 1.85rem;
    }

    .links {
      display: none;
    }
  }
</style>
