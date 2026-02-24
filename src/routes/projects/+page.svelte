<script>
  export let data;
  import TerminalAnimation from "$lib/components/animation.js";
</script>

<main>
  <h1 in:TerminalAnimation={{ duration: 270 }}>
    projects <span class="count">({data.projects.length})</span>
  </h1>

  <div
    class="projects-grid"
    in:TerminalAnimation={{ delay: 120, duration: 280 }}
  >
    {#each data.projects as project}
      <a class="project-card" href={`/projects/${project.slug}`}>
        <div class="media">
          {#if project.cover}
            <img
              src={project.cover}
              alt={project.title || project.slug}
              loading="lazy"
            />
          {:else}
            <div class="media-fallback">No cover image</div>
          {/if}
        </div>

        <div class="card-body">
          <h2>{project.title || project.slug}</h2>
          <p class="meta">
            {#if project.date}
              <span>{project.date}</span>
            {/if}
            <span>Open project →</span>
          </p>
        </div>
      </a>
    {/each}
  </div>
</main>

<style>
  main {
    width: 100%;
    max-width: 64rem;
    margin: 1.5rem auto 4.5rem;
    padding: 0 1.5rem;
  }

  h1 {
    margin: 0.35rem 0 0.75rem;
  }

  .count {
    color: var(--txt-3);
    font-size: 0.85em;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
  }

  .project-card {
    display: block;
    border: 2px solid var(--bg-3);
    background: var(--bg-2);
    transition:
      transform 140ms ease,
      border-color 140ms ease,
      box-shadow 140ms ease,
      filter 140ms ease;
  }

  .project-card:hover {
    transform: translateY(-1px);
    border-color: var(--green);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
    filter: brightness(1.04);
  }

  .media {
    margin: 0;
    border-bottom: 2px solid var(--bg-3);
    background: var(--bg);
  }

  img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
    display: block;
  }

  .media-fallback {
    height: 15rem;
    display: grid;
    place-items: center;
    color: var(--txt-3);
    font-size: 0.95rem;
  }

  .card-body {
    padding: 0.9rem 1rem 1rem;
  }

  h2 {
    margin: 0;
    font-size: 1.3rem;
    color: var(--txt);
  }

  .meta {
    margin: 0.6rem 0 0;
    font-size: 0.92rem;
    color: var(--txt-2);
    display: flex;
    justify-content: space-between;
    gap: 0.7rem;
  }

  @media (max-width: 700px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }

    img,
    .media-fallback {
      height: 12.5rem;
    }
  }
</style>
