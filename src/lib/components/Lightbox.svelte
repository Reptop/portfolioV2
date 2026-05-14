<script lang="ts">
  let {
    images,
    startIndex = 0,
    onclose,
  }: {
    images: string[];
    startIndex?: number;
    onclose: () => void;
  } = $props();

  let current = $state(startIndex);
  let dialogEl: HTMLDialogElement | undefined = $state();
  let lbEl: HTMLDivElement | undefined = $state();

  $effect(() => {
    dialogEl?.showModal();
  });

  $effect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  function prev() {
    current = (current - 1 + images.length) % images.length;
  }

  function next() {
    current = (current + 1) % images.length;
  }
</script>

<dialog
  bind:this={dialogEl}
  {onclose}
  onclick={(e) => {
    if (e.target === dialogEl) onclose();
  }}
>
  <div
    class="lb"
    bind:this={lbEl}
    onclick={(e) => {
      if (e.target === lbEl) onclose();
    }}
  >
    <img
      src={images[current]}
      alt="Gallery image {current + 1} of {images.length}"
    />

    {#if images.length > 1}
      <button class="nav prev" onclick={prev} aria-label="Previous image"
        >←</button
      >
      <button class="nav next" onclick={next} aria-label="Next image">→</button>
      <span class="counter">{current + 1} / {images.length}</span>
    {/if}

    <button class="close-btn" onclick={onclose} aria-label="Close lightbox"
      >✕</button
    >
  </div>
</dialog>

<style>
  dialog {
    padding: 0;
    background: transparent;
    border: none;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.88);
  }

  dialog:not([open]) {
    display: none;
  }

  .lb {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 3rem;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border: 1px solid var(--bg-3);
    display: block;
  }

  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: color-mix(in srgb, var(--bg-2), transparent 20%);
    border: 1px solid var(--bg-3);
    color: var(--txt-2);
    font: inherit;
    font-size: 1.4rem;
    padding: 0.6rem 0.9rem;
    cursor: pointer;
    transition:
      color 140ms ease,
      background 140ms ease;
  }

  .nav:hover {
    color: var(--yellow);
    background: var(--bg-2);
  }

  .nav.prev {
    left: 1rem;
  }
  .nav.next {
    right: 1rem;
  }

  .counter {
    position: absolute;
    bottom: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.85rem;
    color: var(--txt-3);
    background: color-mix(in srgb, var(--bg-2), transparent 20%);
    padding: 0.2rem 0.6rem;
    border: 1px solid var(--bg-3);
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: color-mix(in srgb, var(--bg-2), transparent 20%);
    border: 1px solid var(--bg-3);
    color: var(--txt-2);
    font: inherit;
    font-size: 1rem;
    padding: 0.3rem 0.55rem;
    cursor: pointer;
    transition: color 140ms ease;
  }

  .close-btn:hover {
    color: var(--yellow);
  }
</style>
