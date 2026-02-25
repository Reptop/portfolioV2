<script lang="ts">
  import TerminalAnimation from "$lib/components/animation";
  export let data;
</script>

<main>
  <h1 in:TerminalAnimation={{ duration: 270 }}>
    gear <span class="count">({data.gear.length})</span>
  </h1>

  <p class="sub" in:TerminalAnimation={{ delay: 70, duration: 220 }}>
    my current setup at a glance
  </p>

  <section
    class="gear-list"
    in:TerminalAnimation={{ delay: 120, duration: 280 }}
  >
    {#each data.gear as gear}
      <article class="gear-card">
        <div class="media">
          {#if gear.cover}
            <img
              src={gear.cover}
              alt={gear.title || gear.slug}
              loading="lazy"
            />
          {:else}
            <div class="media-fallback">No cover image</div>
          {/if}
        </div>

        <div class="card-body">
          <div class="title-row">
            <h2>{gear.title || gear.slug}</h2>
            {#if gear.status}
              <span class="status">{gear.status}</span>
            {/if}
          </div>

          {#if gear.summary}
            <p class="summary">{gear.summary}</p>
          {/if}

          {#if gear.highlights.length}
            <ul class="highlights">
              {#each gear.highlights as item}
                <li>{item}</li>
              {/each}
            </ul>
          {/if}
        </div>
      </article>
    {/each}
  </section>
</main>

<style>
  main {
    width: 100%;
    max-width: 64rem;
    margin: 1.5rem auto 4.5rem;
    padding: 0 1.5rem;
  }

  h1 {
    margin: 0.35rem 0 0.4rem;
  }

  .count {
    color: var(--txt-3);
    font-size: 0.85em;
  }

  .sub {
    margin: 0 0 1rem;
    color: var(--txt-2);
    font-size: 1rem;
  }

  .gear-list {
    display: grid;
    gap: 0.85rem;
  }

  .gear-card {
    display: grid;
    grid-template-columns: 11rem 1fr;
    gap: 0;
    border: 1px solid var(--bg-3);
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--bg-2), transparent 8%),
      var(--bg-2)
    );
    overflow: hidden;
  }

  .media {
    border-right: 1px solid var(--bg-3);
    background: var(--bg);
    min-height: 9.25rem;
  }

  img {
    width: 100%;
    height: 100%;
    min-height: 9.25rem;
    object-fit: cover;
    display: block;
  }

  .media-fallback {
    height: 100%;
    min-height: 9.25rem;
    display: grid;
    place-items: center;
    color: var(--txt-3);
    font-size: 0.92rem;
    padding: 0.75rem;
    text-align: center;
  }

  .card-body {
    padding: 0.9rem 1rem;
  }

  .title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem 0.75rem;
  }

  h2 {
    margin: 0;
    font-size: 1.14rem;
    color: var(--txt);
  }

  .status {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--green);
    border: 1px solid color-mix(in srgb, var(--green), transparent 58%);
    background: color-mix(in srgb, var(--green), transparent 90%);
    padding: 0.15rem 0.4rem;
  }

  .summary {
    margin: 0.45rem 0 0;
    color: var(--txt);
    line-height: 1.6;
    font-size: 0.98rem;
  }

  .highlights {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0.7rem 0 0;
    padding: 0;
  }

  .highlights li {
    margin: 0;
    padding: 0.15rem 0.45rem;
    border: 1px solid var(--bg-3);
    background: color-mix(in srgb, var(--bg), transparent 10%);
    color: var(--txt-2);
    font-size: 0.8rem;
  }

  @media (max-width: 700px) {
    .gear-card {
      grid-template-columns: 1fr;
    }

    .media {
      border-right: 0;
      border-bottom: 1px solid var(--bg-3);
      min-height: 10.5rem;
    }

    img,
    .media-fallback {
      min-height: 10.5rem;
      max-height: 12rem;
    }
  }
</style>
