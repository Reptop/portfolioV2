<script lang="ts">
  import { goto } from '$app/navigation';

  type Line = { cmd: string; output: string[] };

  let open = $state(false);
  let inputValue = $state('');
  let lines = $state<Line[]>([
    { cmd: '', output: ["welcome to reptop's terminal — type 'help' for commands"] },
  ]);
  let cmdHistory = $state<string[]>([]);
  let historyIdx = $state(-1);

  let inputEl: HTMLInputElement | undefined = $state();
  let outputEl: HTMLElement | undefined = $state();

  const pages: Record<string, string> = {
    '~': '/', home: '/', about: '/about', projects: '/projects',
    blog: '/blog', gear: '/gear', contact: '/contact', now: '/now',
  };

  function process(raw: string): string[] {
    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0]?.toLowerCase() ?? '';
    const arg = parts[1] ?? '';

    switch (cmd) {
      case 'help':
        return [
          'commands:',
          '  help              show this message',
          '  ls                list pages',
          '  cd <page>         navigate to page',
          '  cat <file>        read a file',
          '  whoami            about me',
          '  neofetch          system info',
          '  clear             clear output',
          '  exit              close terminal',
        ];

      case 'ls':
        return ['about    blog    contact    gear    now    projects'];

      case 'cd': {
        const dest = arg.replace(/^\//, '');
        const href = pages[dest];
        if (!arg) return ['usage: cd <page>'];
        if (!href) return [`cd: ${arg}: no such page — try ls`];
        setTimeout(() => { open = false; goto(href); }, 250);
        return [`→ ${href}`];
      }

      case 'cat': {
        if (!arg) return ['usage: cat <file>'];
        if (arg === 'about.txt' || arg === 'about') {
          return [
            'name:    Raed Kabir',
            'handle:  reptop',
            'school:  Oregon State University',
            'major:   Computer Science + Mathematics',
            'focus:   machine learning, computer vision, NLP',
          ];
        }
        if (arg === 'contact.txt' || arg === 'contact') {
          return [
            'email:   raed.kabir03@gmail.com',
            'discord: Reptop',
            'github:  github.com/Reptop',
          ];
        }
        if (arg === 'stack.txt' || arg === 'stack') {
          return ['SvelteKit  ·  Node/Express  ·  Firebase  ·  SQL  ·  C++  ·  OpenGL'];
        }
        return [`cat: ${arg}: no such file — try about.txt, contact.txt, stack.txt`];
      }

      case 'whoami':
        return ['Raed Kabir (reptop) — CS + Math student, ML enthusiast'];

      case 'neofetch':
        return [
          "  ____            _              ",
          " |  _ \\ ___ _ __ | |_ ___  _ __  ",
          " | |_) / _ \\ '_ \\| __/ _ \\| '_ \\ ",
          " |  _ <  __/ |_) | || (_) | |_) |",
          " |_| \\_\\___| .__/ \\__\\___/| .__/ ",
          "           |_|            |_|    ",
          '',
          'reptop@portfolio',
          '────────────────',
          'os:     bedrock linux',
          'shell:  zsh',
          'editor: nvim',
          'stack:  sveltekit + vercel',
          'lang:   typescript · c++ · python',
          'focus:  ml · cv · nlp',
        ];

      case 'clear':
        lines = [];
        return [];

      case 'exit':
      case 'quit':
        open = false;
        return [];

      case '':
        return [];

      default:
        return [`${cmd}: command not found — type 'help'`];
    }
  }

  function submit() {
    const cmd = inputValue.trim();
    inputValue = '';
    historyIdx = -1;

    const output = process(cmd);

    if (cmd && cmd !== 'clear') {
      cmdHistory = [cmd, ...cmdHistory].slice(0, 50);
    }
    if (cmd !== 'clear') {
      lines = [...lines, { cmd, output }];
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      historyIdx = next;
      inputValue = cmdHistory[next] ?? '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIdx - 1;
      historyIdx = next;
      inputValue = next < 0 ? '' : (cmdHistory[next] ?? '');
    } else if (e.key === 'Escape') {
      open = false;
    }
  }

  // Toggle on backtick, skip if an input/textarea is focused
  $effect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== '`') return;
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      open = !open;
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  $effect(() => {
    if (open) setTimeout(() => inputEl?.focus(), 50);
  });

  $effect(() => {
    void lines;
    if (outputEl) outputEl.scrollTop = outputEl.scrollHeight;
  });
</script>

<div class="terminal" class:open>
  <div class="titlebar">
    <span class="title">reptop@portfolio:~$</span>
    <span class="hint">` to toggle</span>
    <button onclick={() => (open = false)} aria-label="Close terminal">✕</button>
  </div>

  <div class="output" bind:this={outputEl}>
    {#each lines as line}
      {#if line.cmd}
        <p class="row prompt-row"><span class="ps1">❯</span>{line.cmd}</p>
      {/if}
      {#each line.output as out}
        <p class="row">{out}</p>
      {/each}
    {/each}
  </div>

  <div class="input-row">
    <span class="ps1">❯</span>
    <input
      bind:this={inputEl}
      bind:value={inputValue}
      onkeydown={handleKeydown}
      type="text"
      autocomplete="off"
      spellcheck={false}
      placeholder="type a command..."
    />
  </div>
</div>

<style>
  .terminal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: var(--bg);
    border-top: 2px solid var(--green);
    display: flex;
    flex-direction: column;
    font-family: 'Space Mono', monospace;
    font-size: 0.85rem;
    z-index: 200;
    transform: translateY(100%);
    transition: transform 200ms ease;
  }

  .terminal.open {
    transform: translateY(0);
  }

  .titlebar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.3rem 0.75rem;
    background: var(--bg-2);
    border-bottom: 1px solid var(--bg-3);
    flex-shrink: 0;
  }

  .title {
    color: var(--green);
    font-size: 0.78rem;
  }

  .hint {
    color: var(--txt-3);
    font-size: 0.7rem;
  }

  .titlebar button {
    margin-left: auto;
    background: none;
    border: none;
    color: var(--txt-3);
    cursor: pointer;
    font: inherit;
    font-size: 0.85rem;
    padding: 0.1rem 0.3rem;
    transition: color 140ms ease;
  }

  .titlebar button:hover {
    color: var(--yellow);
  }

  .output {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .row {
    margin: 0;
    color: var(--green);
    white-space: pre;
    line-height: 1.55;
    font-size: 0.83rem;
  }

  .prompt-row {
    color: var(--txt-2);
    margin-top: 0.3rem;
    display: flex;
    gap: 0.5rem;
  }

  .ps1 {
    color: var(--yellow);
    flex-shrink: 0;
  }

  .input-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.75rem;
    border-top: 1px solid var(--bg-3);
    flex-shrink: 0;
  }

  input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    font: inherit;
    font-size: 0.83rem;
    color: var(--txt-0);
    caret-color: var(--yellow);
  }

  input::placeholder {
    color: var(--txt-3);
  }
</style>
