<script>
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>{$page.status} — reptop</title>
</svelte:head>

<main>
  <p class="status">{$page.status}</p>
  <h1>{$page.status === 404 ? "page not found" : "something went wrong"}</h1>
  {#if $page.error?.message && $page.status !== 404}
    <p class="msg">{$page.error.message}</p>
  {/if}
  <a href="/" class="home-link"><span class="arrow">←</span> back home</a>
</main>

<style>
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
  }

  .status {
    font-size: 6rem;
    font-weight: 400;
    margin: 0;
    line-height: 1;
    color: var(--txt-3);
    letter-spacing: -0.04em;
  }

  h1 {
    margin: 0.5rem 0 1rem;
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    color: var(--txt-0);
  }

  .msg {
    margin: 0 0 1.5rem;
    color: var(--txt-2);
    font-size: 1rem;
    max-width: 48ch;
  }

  .home-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--txt-2);
    font-size: 1.1rem;
    border: 2px solid var(--bg-3);
    background: var(--bg-2);
    padding: 0.5rem 1rem;
    transition:
      border-color 140ms ease,
      color 140ms ease;
  }

  .home-link:hover {
    border-color: var(--yellow);
    color: var(--yellow);
  }

  .arrow {
    transition: transform 160ms ease;
  }

  .home-link:hover .arrow {
    transform: translateX(-4px);
  }
</style>
