<script>
  export let data;
  import { copyCode } from "$lib/actions/copyCode";
  import Lightbox from "$lib/components/Lightbox.svelte";

  const projectModules = import.meta.glob("$lib/projects/*.md");
  const projectPath = `/src/lib/projects/${data.slug}.md`;
  /** @type {Promise<any>} */
  const projectPromise = projectModules[projectPath]();

  const lightboxImages = [
    ...(data.cover ? [data.cover] : []),
    ...data.gallery,
  ];

  let lightboxOpen = false;
  let lightboxIndex = 0;
</script>

<svelte:head>
  <title>{data.title || data.slug} — reptop</title>
  {#if data.summary}
    <meta name="description" content={data.summary} />
    <meta property="og:description" content={data.summary} />
    <meta name="twitter:description" content={data.summary} />
  {/if}
  <meta property="og:title" content="{data.title || data.slug} — reptop" />
  <meta name="twitter:title" content="{data.title || data.slug} — reptop" />
</svelte:head>

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
      <button
        class="cover-btn"
        onclick={() => { lightboxIndex = 0; lightboxOpen = true; }}
        aria-label="View cover image fullscreen"
      >
        <img class="cover" src={data.cover} alt={data.title || data.slug} />
      </button>
    </div>
  {/if}

  {#if data.gallery.length}
    <section class="gallery">
      {#each data.gallery as image, index}
        <figure class="gallery-item">
          <button
            class="gallery-btn"
            onclick={() => {
              lightboxIndex = (data.cover ? 1 : 0) + index;
              lightboxOpen = true;
            }}
            aria-label="View image {index + 1} fullscreen"
          >
            <img
              src={image}
              alt={`${data.title || data.slug} screenshot ${index + 1}`}
              loading="lazy"
            />
          </button>
        </figure>
      {/each}
    </section>
  {/if}

  {#if lightboxOpen && lightboxImages.length}
    <Lightbox
      images={lightboxImages}
      startIndex={lightboxIndex}
      onclose={() => (lightboxOpen = false)}
    />
  {/if}

  <article class="content" use:copyCode>
    {#await projectPromise then project}
      <svelte:component this={project.default} />
    {/await}
  </article>

  <nav class="pagination">
    {#if data.prev}
      <a href="/projects/{data.prev.slug}" class="page-link prev">
        <span class="page-dir">← newer</span>
        <span class="page-title">{data.prev.title || data.prev.slug}</span>
      </a>
    {:else}
      <div></div>
    {/if}
    {#if data.next}
      <a href="/projects/{data.next.slug}" class="page-link next">
        <span class="page-dir">older →</span>
        <span class="page-title">{data.next.title || data.next.slug}</span>
      </a>
    {/if}
  </nav>
</main>

<style>
  main {
    width: 100%;
    max-width: 64rem;
    margin: 0 auto 10rem auto;
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

  .back {
    margin-top: 1.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--txt-2);
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

  .cover-btn {
    display: block;
    width: 100%;
    padding: 0;
    background: none;
    border: none;
    cursor: zoom-in;
  }

  .cover-btn:hover .cover {
    filter: brightness(1.08);
  }

  .cover {
    width: 100%;
    height: clamp(14rem, 42vw, 25rem);
    display: block;
    object-fit: cover;
    object-position: center;
    transition: filter 140ms ease;
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

  .gallery-btn {
    display: block;
    width: 100%;
    padding: 0;
    background: none;
    border: none;
    cursor: zoom-in;
  }

  .gallery-item img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    display: block;
    transition: filter 140ms ease;
  }

  .gallery-btn:hover img {
    filter: brightness(1.08);
  }

  .content {
    border: 1px solid var(--bg-3);
    background: var(--bg-2);
    padding: 1.2rem 1.25rem 1.7rem;
    margin-bottom: 2rem;
  }

  .content :global(p) {
    margin: 1rem 0 0;
    max-width: 72ch;
    color: var(--txt);
    line-height: 1.82;
    text-wrap: pretty;
  }

  .content :global(p + p) {
    margin-top: 0.9rem;
  }

  .content :global(h3) {
    margin: 2rem 0 0.8rem;
    font-size: 1.75rem;
    color: var(--green);
    line-height: 1.3;
    letter-spacing: 0.01em;
  }

  .content :global(h3:not(:first-child)) {
    padding-top: 0.9rem;
    border-top: 1px solid color-mix(in srgb, var(--bg-3), transparent 35%);
  }

  .content :global(h3 + p) {
    margin-top: 0.35rem;
  }

  .content :global(ul),
  .content :global(ol) {
    margin: 0.8rem 0 0;
    max-width: 72ch;
    line-height: 1.75;
    color: var(--txt);
  }

  .content :global(li) {
    margin: 0.4rem 0;
  }

  .content :global(strong) {
    color: var(--txt-0);
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

  .pagination {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .page-link {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.85rem 1rem;
    border: 2px solid var(--bg-3);
    background: var(--bg-2);
    transition:
      border-color 140ms ease,
      filter 140ms ease;
  }

  .page-link:hover {
    border-color: var(--yellow);
    filter: brightness(1.05);
  }

  .page-link.next {
    text-align: right;
  }

  .page-dir {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--txt-3);
  }

  .page-title {
    font-size: 0.95rem;
    color: var(--txt);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 700px) {
    .gallery {
      grid-template-columns: 1fr;
    }

    .info-row {
      grid-template-columns: 1fr;
      gap: 0.35rem;
    }

    .pagination {
      grid-template-columns: 1fr;
    }

    .page-link.next {
      text-align: left;
    }
  }
</style>
