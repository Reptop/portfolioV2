<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import BackgroundImage from "$lib/assets/bg.png";
</script>

<main>
  <div class="bg" style="background-image: url({BackgroundImage});"></div>
  <div class="wrap">
    <!-- Load the 3D model canvas here... -->
    <Canvas>
      <Scene />
    </Canvas>

    <div class="content">
      <div class="row">
        <h1>Reptop</h1>
      </div>

      <p>
        Hello, my name is Raed Kabir, and I love machine learning, math, and
        programming.
      </p>

      <nav>
        <a class="nav" href="/about"
          ><span class="arrow">-&gt;</span><span class="slash">/</span>about</a
        >
        <a class="nav" href="/projects"
          ><span class="arrow">-&gt;</span><span class="slash">/</span
          >projects</a
        >
        <a class="nav" href="/blog"
          ><span class="arrow">-&gt;</span><span class="slash">/</span>blog</a
        >
        <a class="nav" href="/gear"
          ><span class="arrow">-&gt;</span><span class="slash">/</span>gear</a
        >
        <a class="nav" href="/contact"
          ><span class="arrow">-&gt;</span><span class="slash">/</span
          >contact</a
        >
      </nav>
    </div>
  </div>
</main>

<style>
  main {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 2rem 1.5rem;
  }

  /* Outer container */
  .wrap {
    position: relative;
    width: min(48rem, 100%);
    border-radius: 18px;
    overflow: hidden;
  }

  /* Canvas background layer */
  .bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0.1;

    /* so links are clickable */
    pointer-events: none;
  }

  /* Foreground content */
  .content {
    position: relative;
    padding: 2.25rem 2rem;
  }

  .row {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 1rem;
    text-align: center;
  }

  h1 {
    margin: 0;
    font-size: clamp(2.5rem, 6vw, 3.25rem);
    letter-spacing: -0.02em;
  }

  p {
    margin: 1rem auto 1.25rem auto;
    max-width: 52ch;
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--txt-2);
    text-align: center;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem 0.75rem;
    margin-top: 0.75rem;
  }

  nav a.nav {
    font-size: 1.25rem;
    color: var(--txt-0);

    padding: 0.35rem 0.6rem;

    background: color-mix(in srgb, var(--bg-2) 65%, transparent);
    border: 2px solid var(--bg-3);

    text-decoration: none;

    transition:
      transform 140ms ease,
      border-color 140ms ease,
      filter 140ms ease;
  }

  nav a.nav:hover {
    transform: translateY(-1px);
    filter: brightness(1.06);
    border-color: var(--txt-3);
  }

  nav a.nav:focus-visible {
    outline: 2px solid var(--yellow);
    outline-offset: 3px;
  }

  /* Arrow/slash coloring */
  nav a.nav .arrow {
    color: var(--orange);
    margin-right: 0.25rem;
  }

  nav a.nav:hover .arrow {
    color: var(--yellow);
  }

  nav a.nav .slash {
    color: var(--green);
    margin-right: 0.35rem;
  }

  @media (max-width: 600px) {
    .content {
      padding: 1.75rem 1.25rem;
    }

    nav {
      flex-direction: column;
      align-items: stretch;
    }

    nav a.nav {
      text-align: center;
      width: 100%;
    }
  }
</style>
