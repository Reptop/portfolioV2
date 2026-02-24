<script>
  export let data;

  const projectModules = import.meta.glob("$lib/projects/*.md");
  const projectPath = `/src/lib/projects/${data.slug}.md`;
  /** @type {Promise<any>} */
  const projectPromise = projectModules[projectPath]();
</script>

<main>
  <a class="back" href="/projects"
    ><span class="arrow">←</span>Back to projects</a
  >

  <header class="hero">
    <div class="title-row">
      <h1>{data.title || data.slug}</h1>
      {#if data.formattedDate}
        <span class="date">{data.formattedDate}</span>
      {/if}
    </div>

    {#if data.summary}
      <p class="summary">{data.summary}</p>
    {/if}

    {#if data.tags.length}
      <ul class="tags">
        {#each data.tags as tag}
          <li>{tag}</li>
        {/each}
      </ul>
    {/if}

    {#if data.info.length}
      <dl class="info-list">
        {#each data.info as item}
          <div class="info-row">
            <dt>{item.label}</dt>
            <dd>
              {#if item.label === "Video" && typeof item.value === "string" && item.value.startsWith("http")}
                <a
                  class="meta-link"
                  href={item.value}
                  target="_blank"
                  rel="noreferrer">video link</a
                >
              {:else if item.label === "Source" && typeof item.value === "string" && item.value.startsWith("http")}
                <a
                  class="meta-link"
                  href={item.value}
                  target="_blank"
                  rel="noreferrer">source code</a
                >
              {:else}
                {item.value}
              {/if}
            </dd>
          </div>
        {/each}
      </dl>
    {/if}
  </header>

  {#if data.cover}
    <div class="cover-wrap">
      <img class="cover" src={data.cover} alt={data.title || data.slug} />
    </div>
  {/if}

  {#if data.gallery.length}
    <section class="gallery">
      {#each data.gallery as image, index}
        <figure class="gallery-item">
          <img
            src={image}
            alt={`${data.title || data.slug} screenshot ${index + 1}`}
            loading="lazy"
          />
        </figure>
      {/each}
    </section>
  {/if}

  <article class="content">
    {#await projectPromise then project}
      <svelte:component this={project.default} />
    {/await}
  </article>
</main>

<style>
  main {
    width: 100%;
    max-width: 64rem;
    margin: 1.5rem auto 5rem;
    padding: 0 1.5rem;
  }

  .hero {
    margin: 1rem 0 1.5rem;
  }

  .title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.6rem 1rem;
  }

  h1 {
    margin: 0;
  }

  .date {
    color: var(--txt-2);
    background: var(--bg-2);
    border: 1px solid var(--bg-3);
    padding: 0.15rem 0.45rem;
    font-size: 0.95rem;
  }

  .summary {
    margin: 0.9rem 0 0;
    max-width: 70ch;
    color: var(--txt);
  }

  .tags {
    list-style: none;
    margin: 1rem 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .tags li {
    margin: 0;
    border: 1px solid var(--bg-3);
    background: var(--bg-2);
    color: var(--txt-2);
    font-size: 0.85rem;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    padding: 0.18rem 0.5rem;
  }

  .info-list {
    margin: 1rem 0 0;
    display: grid;
    gap: 0.45rem;
    max-width: 60rem;
  }

  .info-row {
    display: grid;
    grid-template-columns: 7.5rem 1fr;
    align-items: baseline;
    gap: 0.8rem;
  }

  dt {
    margin: 0;
    color: var(--green);
    font-size: 0.8rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    background: color-mix(in srgb, var(--green), transparent 85%);
    border: 1px solid color-mix(in srgb, var(--green), transparent 60%);
    padding: 0.22rem 0.45rem;
    width: fit-content;
  }

  dd {
    margin: 0;
    color: var(--txt);
  }

  .meta-link {
    color: var(--yellow);
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--yellow), transparent 45%);
    text-underline-offset: 0.15em;
  }

  .meta-link:hover {
    text-decoration-color: var(--yellow);
  }

  .cover-wrap {
    border: 2px solid var(--bg-3);
    background: var(--bg-2);
    margin: 0 0 1.3rem;
    overflow: hidden;
  }

  .cover {
    width: 100%;
    height: clamp(14rem, 42vw, 25rem);
    display: block;
    object-fit: cover;
    object-position: center;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
    margin: 0 0 1.3rem;
  }

  .gallery-item {
    margin: 0;
    border: 1px solid var(--bg-3);
    background: var(--bg-2);
    overflow: hidden;
  }

  .gallery-item img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    display: block;
  }

  .content {
    border: 1px solid var(--bg-3);
    background: var(--bg-2);
    padding: 1.15rem 1.15rem 1.6rem;
    margin-bottom: 1rem;
  }

  .content :global(iframe),
  .content :global(video),
  .content :global(img) {
    display: block;
    max-width: 100%;
  }

  .content :global(*:last-child) {
    margin-bottom: 0;
  }

  @media (max-width: 700px) {
    .gallery {
      grid-template-columns: 1fr;
    }

    .info-row {
      grid-template-columns: 1fr;
      gap: 0.35rem;
    }
  }
</style>
