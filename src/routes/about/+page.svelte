<script lang="ts">
  import Icon from "@iconify/svelte";
  import TerminalAnimation from "$lib/components/animation";
</script>

<main>
  <h1 in:TerminalAnimation={{ duration: 270 }}>about me</h1>

  <div class="content" in:TerminalAnimation={{ delay: 120, duration: 280 }}>
    <p class="lead">
      Hey there, my name is Raed Kabir. When I'm online, I go by the handle
      "reptop". I'm a student at Oregon State University where I study computer
      science & math. I'm very interested in machine learning and differential
      equations research because I'm a big math nerd. One fun fact about is that
      I have two cats named Gohan and Gojo.
    </p>

    <h2>links</h2>

    <div class="links">
      <a
        href="https://github.com/Reptop"
        class="external icon github"
        target="_blank"
        rel="noreferrer"
      >
        <span class="icn"><Icon icon="simple-icons:github" /></span>
        <span class="text">github</span>
        <span class="arrow">/&gt;</span>
      </a>

      <a
        href="https://x.com/Alpacalordd"
        class="external icon x"
        target="_blank"
        rel="noreferrer"
      >
        <span class="icn"><Icon icon="simple-icons:twitter" /></span>
        <span class="text">twitter</span>
        <span class="arrow">/&gt;</span>
      </a>

      <a
        href="https://discord.com/users/315889354394566656"
        class="external icon discord"
        target="_blank"
        rel="noreferrer"
      >
        <span class="icn"><Icon icon="simple-icons:discord" /></span>
        <span class="text">discord</span>
        <span class="arrow">/&gt;</span>
      </a>

      <a
        href="https://www.linkedin.com/in/kabirrraed/"
        class="external icon linkedin"
        target="_blank"
        rel="noreferrer"
      >
        <span class="icn"><Icon icon="simple-icons:linkedin" /></span>
        <span class="text">linkedin</span>
        <span class="arrow">/&gt;</span>
      </a>
    </div>

    <h2>info</h2>

    <div class="panel">
      <div class="panel-links">
        <a
          href="https://github.com/Reptop"
          class="external textlink"
          target="_blank"
          rel="noreferrer"
        >
          github repo <span class="arrow">/&gt;</span>
        </a>

        <a
          href="https://example.com"
          class="external textlink"
          target="_blank"
          rel="noreferrer"
        >
          analytics <span class="arrow">/&gt;</span>
        </a>
      </div>

      <div class="kv">
        <div class="k">stack</div>

        <div class="v">sveltekit / vercel / vite</div>

        <div class="k">fonts</div>
        <div class="v">
          space mono / <span style="font-family: 'Meslo LGS NF', monospace"
            >meslo</span
          >
          /
          <span style="font-family: 'Space Grotesk', sans-serif"
            >space grotesk</span
          >
        </div>
      </div>
    </div>

    <h2>palette</h2>

    <div class="colors">
      <div
        class="color"
        style="background: var(--bg); border: 2px solid var(--bg-2);"
      >
        bg
      </div>
      <div class="color" style="background: var(--bg-2);">bg-2</div>

      <div class="color" style="background: var(--bg-3);">bg-3</div>

      <div class="color" style="background: var(--txt-3); color: var(--bg);">
        txt-3
      </div>

      <div class="color" style="background: var(--txt-2); color: var(--bg);">
        txt-2
      </div>

      <div class="color" style="background: var(--txt); color: var(--bg);">
        txt
      </div>

      <div class="color" style="background: var(--txt-0); color: var(--bg);">
        txt-0
      </div>

      <div class="color" style="background: var(--pink); color: var(--bg);">
        pink
      </div>

      <div class="color" style="background: var(--purple); color: var(--bg);">
        purple
      </div>

      <div class="color" style="background: var(--blue); color: var(--bg);">
        blue
      </div>
    </div>
  </div>
</main>

<style>
  main {
    width: 100%;
    max-width: 64rem;
    margin: 0 auto 10rem auto;
    padding: 0 1.5rem;
  }

  /* Constrain readability */
  .content {
    max-width: 72ch;
  }

  a {
    color: var(--txt);
    text-decoration: none;
  }

  .lead {
    margin: 1rem 0 1.25rem;
    line-height: 1.9;
    font-size: 1.125rem;
    color: var(--txt-2);
    font-family: inherit;
  }

  /* ICON LINKS*/
  .links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
    margin: 0.75rem 0 1.25rem;
  }

  @media (max-width: 700px) {
    .links {
      grid-template-columns: 1fr;
    }
  }

  a.external.icon {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;

    padding: 0.75rem 0.95rem;

    background: var(--bg-2);
    border: 2px solid var(--bg-3);

    font-size: 1.1rem;

    transition:
      transform 140ms ease,
      border-color 140ms ease,
      box-shadow 140ms ease,
      filter 140ms ease;
  }

  a.external.icon .icn {
    display: inline-flex;
    align-items: center;
  }

  a.external.icon :global(svg) {
    width: 22px;
    height: 22px;
    opacity: 0.9;
    transition:
      transform 160ms ease,
      opacity 160ms ease;
  }

  a.external.icon .text {
    flex: 1;
    letter-spacing: 0.02em;
  }

  a.external.icon .arrow {
    opacity: 0.65;
    transition:
      transform 160ms ease,
      opacity 160ms ease;
  }

  a.external.icon:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }

  a.external.icon:hover :global(svg) {
    transform: translateX(2px) rotate(-3deg);
    opacity: 1;
  }

  a.external.icon:hover .arrow {
    transform: translateX(7px);
    opacity: 1;
  }

  a.external.icon:active {
    transform: translateY(0px) scale(0.99);
  }

  a.external.icon:focus-visible,
  a.external.textlink:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 3px;
  }

  /* Accent borders */
  a.external.icon.github:hover {
    border-color: var(--purple);
  }
  a.external.icon.x:hover {
    border-color: var(--blue);
  }
  a.external.icon.discord:hover {
    border-color: var(--pink);
  }
  a.external.icon.linkedin:hover {
    border-color: var(--grey);
  }

  /* INFO PANEL */
  .panel {
    background: var(--bg-2);
    border: 2px solid var(--bg-3);
    padding: 1rem 1.1rem;
    margin: 0.75rem 0 1.25rem;
  }

  .panel-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
    margin-bottom: 0.75rem;
  }

  a.external.textlink {
    display: inline-flex;
    align-items: baseline;
    gap: 0.5rem;
    font-size: 1.15rem;
    color: var(--txt-2);
  }

  a.external.textlink .arrow {
    opacity: 0.7;
    transition:
      transform 160ms ease,
      opacity 160ms ease;
  }

  a.external.textlink:hover {
    color: var(--txt);
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
  }

  a.external.textlink:hover .arrow {
    transform: translateX(6px);
    opacity: 1;
  }

  .kv {
    display: grid;
    grid-template-columns: 7ch 1fr;
    column-gap: 1rem;
    row-gap: 0.4rem;
    font-size: 1.05rem;
  }

  .k {
    color: var(--pink);
  }

  .v {
    color: var(--red);
  }

  /* Palette: less cramped, responsive */
  .colors {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
    gap: 0.45rem;
    margin-top: 0.75rem;
  }

  .color {
    padding: 0.25rem 0.5rem;
    text-align: center;
    font-size: 1rem;
  }
</style>
