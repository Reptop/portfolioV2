<script lang="ts">
  export let data;
  import TerminalAnimation from "$lib/components/animation";

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(date));
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
              loading={project === data.projects[0] ? "eager" : "lazy"}
              fetchpriority={project === data.projects[0] ? "high" : "auto"}
            />
          {:else}
            <div class="media-fallback">No cover image</div>
          {/if}
        </div>

        <div class="card-body">
          <h2>{project.title || project.slug}</h2>
          {#if project.stack}
            <ul class="stack">
              {#each project.stack.split(",") as tech}
                <li>{tech.trim()}</li>
              {/each}
            </ul>
          {/if}

          <div class="badges">
            {#if project.status}
              <span class="status">{project.status}</span>
            {/if}
            {#if project.hasVideo}
              <span class="demo-badge">Demo available</span>
            {/if}
          </div>
          <p class="meta">
            {#if project.date}
              <span>{formatDate(project.date)}</span>
            {/if}
            <span>View details →</span>
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
    position: relative;
    margin: 0;
    border-bottom: 2px solid var(--bg-3);
    background: var(--bg);
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
    display: block;
    transition:
      transform 180ms ease,
      filter 180ms ease;
  }

  .project-card:hover img,
  .project-card:focus-visible img {
    transform: scale(1.02);
    filter: brightness(1.03);
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

  .stack {
    list-style: none;
    margin: 0.5rem 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .stack li {
    margin: 0;
    padding: 0.12rem 0.4rem;
    font-size: 0.75rem;
    color: var(--txt-3);
    border: 1px solid var(--bg-3);
    background: var(--bg);
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin: 0.5rem 0 0;
  }

  .status {
    padding: 0.16rem 0.48rem;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--green);
    border: 1px solid color-mix(in srgb, var(--green), transparent 55%);
    background: color-mix(in srgb, var(--green), transparent 88%);
  }

  .demo-badge {
    padding: 0.16rem 0.48rem;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--yellow);
    border: 1px solid color-mix(in srgb, var(--yellow), transparent 55%);
    background: color-mix(in srgb, var(--yellow), transparent 88%);
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
