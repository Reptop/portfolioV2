<script lang="ts">
  import { goto } from '$app/navigation';
  import { loadCommands, type Command } from '$lib/palette-data';

  let open = $state(false);
  let query = $state('');
  let selectedIndex = $state(0);
  let commands = $state<Command[]>([]);
  let commandsLoaded = false;
  let dialogEl: HTMLDialogElement | undefined = $state();
  let inputEl: HTMLInputElement | undefined = $state();
  let listEl: HTMLUListElement | undefined = $state();

  const filtered: Command[] = $derived(
    query.trim()
      ? commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()))
      : commands
  );

  const groups = $derived(
    query.trim()
      ? [{ label: null, items: filtered }]
      : [
          { label: 'pages',    items: commands.filter((c) => c.type === 'page')    },
          { label: 'projects', items: commands.filter((c) => c.type === 'project') },
          { label: 'posts',    items: commands.filter((c) => c.type === 'post')    },
        ].filter((g) => g.items.length > 0)
  );

  // Reset selection when results change
  $effect(() => { void filtered; selectedIndex = 0; });

  // Keep selected item in view
  $effect(() => {
    listEl
      ?.querySelector<HTMLElement>(`[data-idx="${selectedIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  });

  async function openPalette() {
    open = true;
    query = '';
    selectedIndex = 0;
    dialogEl?.showModal();
    setTimeout(() => inputEl?.focus(), 0);
    if (!commandsLoaded) {
      commands = await loadCommands();
      commandsLoaded = true;
    }
  }

  function closePalette() {
    open = false;
    query = '';
    dialogEl?.close();
  }

  function navigate(cmd: Command) {
    closePalette();
    goto(cmd.href);
  }

  // Global Cmd+K / Ctrl+K
  $effect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open ? closePalette() : openPalette();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      navigate(filtered[selectedIndex]);
    }
  }
</script>

<dialog
  bind:this={dialogEl}
  onclose={() => { open = false; query = ''; }}
  onclick={(e) => { if (e.target === dialogEl) closePalette(); }}
>
  <div class="palette">
    <div class="search-bar">
      <span class="prompt">→</span>
      <input
        bind:this={inputEl}
        bind:value={query}
        onkeydown={handleKeydown}
        type="text"
        placeholder="search pages, projects, posts..."
        autocomplete="off"
        spellcheck={false}
      />
    </div>

    <ul bind:this={listEl} class="results" role="listbox">
      {#each groups as group}
        {#if group.label}
          <li class="group-label" role="presentation">{group.label}</li>
        {/if}
        {#each group.items as cmd}
          {@const idx = filtered.indexOf(cmd)}
          <li role="option" aria-selected={idx === selectedIndex}>
            <button
              data-idx={idx}
              class:selected={idx === selectedIndex}
              onclick={() => navigate(cmd)}
              onmouseenter={() => (selectedIndex = idx)}
            >
              <span class="icon">
                {cmd.type === 'page' ? '~/' : cmd.type === 'project' ? '◆' : '✦'}
              </span>
              {cmd.label}
            </button>
          </li>
        {/each}
      {/each}

      {#if filtered.length === 0}
        <li class="empty">no results for "<strong>{query}</strong>"</li>
      {/if}
    </ul>

    <div class="footer">
      <span><kbd>↑↓</kbd> navigate</span>
      <span><kbd>↵</kbd> open</span>
      <span><kbd>esc</kbd> close</span>
      <span class="shortcut-hint"><kbd>⌘K</kbd> anywhere</span>
    </div>
  </div>
</dialog>

<style>
  dialog {
    position: fixed;
    inset: 0;
    top: 18vh;
    margin: 0 auto;
    padding: 0;
    border: 2px solid var(--bg-3);
    background: var(--bg-2);
    width: min(560px, calc(100vw - 2rem));
    max-height: min(480px, calc(100vh - 22vh));
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
  }

  dialog:not([open]) {
    display: none;
  }

  .palette {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--bg-3);
    flex-shrink: 0;
  }

  .prompt {
    color: var(--yellow);
    font-size: 1rem;
  }

  input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    font: inherit;
    font-size: 1rem;
    color: var(--txt-0);
  }

  input::placeholder {
    color: var(--txt-3);
  }

  .results {
    list-style: none;
    margin: 0;
    padding: 0.35rem 0;
    overflow-y: auto;
    flex: 1;
  }

  .group-label {
    padding: 0.55rem 1rem 0.2rem;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--txt-3);
    margin: 0;
  }

  .results button {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 0.45rem 1rem;
    font: inherit;
    font-size: 0.95rem;
    color: var(--txt-2);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    transition: none;
  }

  .results button.selected {
    background: color-mix(in srgb, var(--yellow), transparent 85%);
    color: var(--yellow);
  }

  .icon {
    color: var(--txt-3);
    font-size: 0.72rem;
    width: 1rem;
    flex-shrink: 0;
  }

  .results button.selected .icon {
    color: var(--yellow);
  }

  .empty {
    padding: 1.5rem 1rem;
    color: var(--txt-3);
    font-size: 0.9rem;
    margin: 0;
  }

  .footer {
    display: flex;
    align-items: center;
    gap: 1.1rem;
    padding: 0.45rem 1rem;
    border-top: 1px solid var(--bg-3);
    font-size: 0.72rem;
    color: var(--txt-3);
    flex-shrink: 0;
  }

  .shortcut-hint {
    margin-left: auto;
  }

  kbd {
    font-family: inherit;
    border: 1px solid var(--bg-3);
    padding: 0.05rem 0.28rem;
    font-size: 0.68rem;
    color: var(--txt-3);
    background: var(--bg-3);
  }
</style>
