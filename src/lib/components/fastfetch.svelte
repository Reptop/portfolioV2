<script lang="ts">
  import { profile } from "$lib/profile";

  // Optional overrides if you ever want to reuse the component elsewhere
  export let host = "reptop";
  export let showPalette = true;

  const prompt = `${host}@${profile.current_distro.toLowerCase().replace(/\s+/g, "")}`;
  const stack = profile.stack.join(" • ");
  const projects = profile.projects.join(" • ");
</script>

<div class="ff" role="group" aria-label="fastfetch">
  <div class="header">
    <span class="prompt">{prompt}</span>
    <span class="cursor">▮</span>
  </div>

  <div class="grid">
    <!-- Left ASCII block -->
    <div class="logo" aria-hidden="true">
      <pre>
██████╗ ███████╗
██╔══██╗██╔════╝
██████╔╝█████╗
██╔══██╗██╔══╝
██║  ██║███████╗
╚═╝  ╚═╝╚══════╝
      </pre>
    </div>

    <!-- Right info -->
    <div class="info">
      <div class="row">
        <span class="k">name</span><span class="sep">:</span>
        <span class="v">{profile.name}</span>
      </div>

      <div class="row">
        <span class="k">title</span><span class="sep">:</span>
        <span class="v">{profile.title}</span>
      </div>

      <div class="row">
        <span class="k">distro</span><span class="sep">:</span>
        <span class="v">{profile.current_distro}</span>
      </div>

      <div class="row">
        <span class="k">stack</span><span class="sep">:</span>
        <span class="v">{stack}</span>
      </div>

      <div class="row">
        <span class="k">projects</span><span class="sep">:</span>
        <span class="v">{projects}</span>
      </div>

      <div class="row">
        <span class="k">email</span><span class="sep">:</span>
        <span class="v">
          <a class="link" href={"mailto:" + profile.email}>{profile.email}</a>
        </span>
      </div>

      <div class="row">
        <span class="k">github</span><span class="sep">:</span>
        <span class="v">
          <a
            class="link"
            href={"https://" + profile.github}
            target="_blank"
            rel="noreferrer"
          >
            {profile.github}
          </a>
        </span>
      </div>

      <div class="row">
        <span class="k">linkedin</span><span class="sep">:</span>
        <span class="v">
          <a
            class="link"
            href={"https://" + profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            {profile.linkedin}
          </a>
        </span>
      </div>

      {#if showPalette}
        <div class="swatches" aria-label="palette">
          <span class="sw bg" title="bg"></span>
          <span class="sw bg2" title="bg-2"></span>
          <span class="sw bg3" title="bg-3"></span>
          <span class="sw txt" title="txt"></span>
          <span class="sw blue" title="blue"></span>
          <span class="sw purple" title="purple"></span>
          <span class="sw pink" title="pink"></span>
          <span class="sw green" title="green"></span>
          <span class="sw yellow" title="yellow"></span>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .ff {
    background: var(--bg-2);
    border: 2px solid var(--bg-3);
    border-radius: 16px;
    padding: 1rem 1.1rem;
    margin: 0.75rem 0 1.25rem;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    color: var(--txt-0);
    font-size: 1.05rem;
  }

  .prompt {
    color: var(--txt-0);
  }

  .cursor {
    color: var(--txt-3);
    opacity: 0.8;
    animation: blink 1s steps(2, jump-none) infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    align-items: start;
  }

  .logo pre {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.1;
    color: var(--txt-3);
    user-select: none;
  }

  .info {
    display: grid;
    gap: 0.35rem;
  }

  .row {
    display: grid;
    grid-template-columns: 9ch 1ch 1fr;
    column-gap: 0.6rem;
    font-size: 1.02rem;
    color: var(--txt-2);
  }

  .k,
  .sep {
    color: var(--txt-3);
  }

  .v {
    color: var(--txt-2);
    overflow-wrap: anywhere;
  }

  .link {
    color: var(--txt);
    text-decoration: underline;
    text-decoration-color: var(--txt-3);
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
    transition: text-decoration-color 160ms ease;
  }

  .link:hover {
    text-decoration-color: var(--txt);
  }

  .swatches {
    margin-top: 0.7rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .sw {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    border: 1px solid var(--bg-3);
  }

  .bg {
    background: var(--bg);
  }
  .bg2 {
    background: var(--bg-2);
  }
  .bg3 {
    background: var(--bg-3);
  }
  .txt {
    background: var(--txt);
  }
  .blue {
    background: var(--blue);
    border-color: transparent;
  }
  .purple {
    background: var(--purple);
    border-color: transparent;
  }
  .pink {
    background: var(--pink);
    border-color: transparent;
  }
  .green {
    background: var(--green);
    border-color: transparent;
  }
  .yellow {
    background: var(--yellow);
    border-color: transparent;
  }

  @media (max-width: 700px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .logo pre {
      font-size: 0.8rem;
    }
    .row {
      grid-template-columns: 9ch 1ch 1fr;
    }
  }
</style>
