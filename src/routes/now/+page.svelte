<script lang="ts">
  import TerminalAnimation from "$lib/components/animation";
</script>

<svelte:head>
  <title>now — reptop</title>
  <meta
    name="description"
    content="What Raed Kabir is currently working on, learning, and thinking about."
  />
</svelte:head>

<main>
  <h1 in:TerminalAnimation={{ duration: 270 }}>now</h1>

  <p class="meta" in:TerminalAnimation={{ delay: 120, duration: 280 }}>
    Last updated May 2026 ·
    <a
      href="https://nownownow.com/about"
      target="_blank"
      rel="noreferrer"
      class="what-link"
    >
      what is this?
    </a>
  </p>

  <div in:TerminalAnimation={{ delay: 240, duration: 300 }}>
    <section class="block">
      <h2>working on</h2>
      <ul>
        <li>finishing up my linear algebra research project</li>
        <li>building out ML projects focused on computer vision</li>
        <li>this portfolio</li>
      </ul>
    </section>

    <section class="block">
      <h2>learning</h2>
      <ul>
        <li>transformer architectures and attention mechanisms</li>
        <li>CUDA programming for GPU-accelerated ML</li>
        <li>Rust</li>
      </ul>
    </section>

    <section class="block">
      <h2>reading</h2>
      <ul>
        <li><em>The Art of Problem Solving</em> — Richard Rusczyk</li>
        <li><em>Deep Learning</em> — Goodfellow, Bengio, Courville</li>
      </ul>
    </section>

    <section class="block">
      <h2>otherwise</h2>
      <ul>
        <li>TAing and tutoring at OSU</li>
        <li>running Bedrock Linux on my daily driver</li>
        <li>collecting Chiikawa plushies</li>
      </ul>
    </section>
  </div>
</main>

<style>
  main {
    width: 100%;
    max-width: 64rem;
    margin: 1.5rem auto 6rem;
    padding: 0 1.5rem;
  }

  h1 {
    margin: 0.35rem 0 0.25rem;
  }

  .meta {
    margin: 0 0 2.5rem;
    font-size: 0.9rem;
    color: var(--txt-3);
  }

  .what-link {
    color: var(--txt-3);
    text-decoration: underline;
    text-underline-offset: 3px;
    &:hover {
      color: var(--yellow);
    }
  }

  .block {
    margin-bottom: 2rem;
  }

  h2 {
    margin: 0 0 0.65rem;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--green);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  li {
    margin: 0;
    padding: 0.6rem 0.85rem;
    font-size: 1rem;
    color: var(--txt-2);
    border-left: 2px solid var(--bg-3);
    line-height: 1.5;
  }

  em {
    font-style: italic;
    color: var(--txt);
  }
</style>
