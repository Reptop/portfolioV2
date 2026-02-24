<script>
  export let data;

  const postModules = import.meta.glob("$lib/posts/*.md");
  const postPath = `/src/lib/posts/${data.slug}.md`;

  /** @type {Promise<any>} */
  const postPromise = postModules[postPath]();
</script>

<article class="post-shell">
  <header class="hero">
    <h1>{data.title || data.slug}</h1>

    {#if data.subtitle}
      <p class="subtitle">{data.subtitle}</p>
    {/if}

    <div class="meta">
      {#if data.formattedDate}
        <span>Published {data.formattedDate}</span>
      {/if}

      <span>{data.readMins} min read</span>

      {#if data.formattedUpdated}
        <span>Updated {data.formattedUpdated}</span>
      {/if}
    </div>

    {#if data.tags.length}
      <ul class="tags">
        {#each data.tags as tag}
          <li>{tag}</li>
        {/each}
      </ul>
    {/if}
  </header>

  {#if data.cover}
    <img class="cover" src={data.cover} alt={data.title || data.slug} />
  {/if}

  <section class="prose">
    {#await postPromise then post}
      <svelte:component this={post.default} />
    {:catch err}
      <p>Unable to render this post: {err.message}</p>
    {/await}
  </section>
</article>

<style>
  .post-shell {
    width: 100%;
    max-width: 64rem;
    margin: 1.75rem auto 5rem;
    padding: 0 1.5rem;
  }

  .hero {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  h1 {
    margin: 0;
    text-wrap: balance;
  }

  .subtitle {
    margin: 0;
    font-size: 1.125rem;
    color: var(--txt-2);
    line-height: 1.65;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    color: var(--txt-2);
    font-size: 0.9rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 0.25rem 0 0;
    padding: 0;
  }

  .tags li {
    margin: 0;
    padding: 0.25rem 0.65rem;
    border: 1px solid var(--bg-3);
    background: var(--bg-2);
    color: var(--txt-2);
    font-size: 0.85rem;
  }

  .cover {
    width: 100%;
    height: auto;
    display: block;
    margin: 0 0 2rem 0;
    border-radius: 0.8rem;
    border: 1px solid var(--bg-3);
  }

  .prose {
    padding: 1.5rem;
    border: 1px solid var(--bg-3);
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--bg-2), transparent 12%),
      var(--bg-2)
    );
  }

  .prose :global(h2),
  .prose :global(h3),
  .prose :global(h4) {
    scroll-margin-top: 5rem;
  }

  .prose :global(h2) {
    margin-top: 2.25rem;
    border-top: 1px solid var(--bg-3);
    padding-top: 1.25rem;
  }

  .prose :global(p),
  .prose :global(li) {
    color: var(--txt);
  }

  .prose :global(a) {
    color: var(--yellow);
    text-decoration-color: color-mix(in srgb, var(--yellow), transparent 55%);
  }

  .prose :global(a:hover) {
    text-decoration-color: var(--yellow);
  }

  .prose :global(blockquote) {
    border-left: 3px solid var(--orange);
    background: color-mix(in srgb, var(--orange), transparent 90%);
    margin: 1.75rem 0;
    padding: 0.5rem 1rem;
    color: var(--txt);
  }

  .prose :global(pre:not([data-theme])) {
    margin: 1.25rem 0;
    border: 1px solid var(--bg-3);
    border-radius: 0.6rem;
    padding: 0.85rem 1rem;
    max-width: 100%;
  }

  @media (max-width: 700px) {
    .post-shell {
      margin-top: 1rem;
    }

    .prose {
      padding: 1rem;
    }
  }
</style>
