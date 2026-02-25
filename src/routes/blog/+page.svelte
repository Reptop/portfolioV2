<script lang="ts">
  export let data;
  import TerminalAnimation from "$lib/components/animation";

  const formatDate = (date: string | null) => {
    if (!date) return null;

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };
</script>

<section class="blog-index">
  <header class="hero">
    <h1 in:TerminalAnimation={{ duration: 270 }}>blog</h1>

    <p class="sub">
      For when I want to talk about something really cool or something really
      stupid I did, no inbetween.
      <span>{data.posts.length} post{data.posts.length === 1 ? "" : "s"}</span>
    </p>
  </header>

  <ul class="post-grid" in:TerminalAnimation={{ delay: 120, duration: 280 }}>
    {#each data.posts as post}
      <li>
        <a class="post-card" href={`/blog/${post.slug}`}>
          <p class="post-kicker">Post</p>
          <h2>{post.title || post.slug}</h2>
          <div class="meta">
            {#if post.date}
              <span>{formatDate(post.date)}</span>
            {:else}
              <span>No publish date</span>
            {/if}
            <span class="arrow">Read <span aria-hidden="true">→</span></span>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  .blog-index {
    width: 100%;
    max-width: 64rem;
    margin: 1.5rem auto 4.5rem;
    padding: 0 1.5rem;
  }

  .hero {
    margin-bottom: 1.75rem;
  }

  h1 {
    margin: 0.35rem 0 0.75rem;
  }

  .sub {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 1rem;
    color: var(--txt-2);
    font-size: 1rem;
  }

  .sub span {
    color: var(--txt-3);
  }

  .post-grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.9rem;
  }

  .post-grid li {
    margin: 0;
  }

  .post-card {
    display: block;
    border: 2px solid var(--bg-3);
    padding: 1rem 1rem 0.95rem;
    background: var(--bg-2);
    transition:
      transform 140ms ease,
      border-color 140ms ease,
      box-shadow 140ms ease,
      filter 140ms ease;
  }

  .post-card:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
    border-color: var(--green);
  }

  .post-kicker {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--txt-3);
  }

  h2 {
    margin: 0.45rem 0 0.6rem;
    font-size: 1.28rem;
    line-height: 1.35;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    gap: 0.8rem;
    color: var(--txt-2);
    font-size: 0.92rem;
  }

  .arrow {
    color: var(--green);
    opacity: 0.75;
    transition:
      transform 160ms ease,
      opacity 160ms ease;
  }

  .post-card:hover .arrow {
    transform: translateX(7px);
    opacity: 1;
  }

  .post-card:active {
    transform: translateY(0) scale(0.99);
  }

  .post-card:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 3px;
  }

  @media (max-width: 700px) {
    .meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.35rem;
    }
  }
</style>
