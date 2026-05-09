export function copyCode(node: HTMLElement) {
  const cleanups: (() => void)[] = [];

  node.querySelectorAll<HTMLPreElement>('pre').forEach((pre) => {
    // Attach to the figure wrapper if present, otherwise the pre itself
    const container =
      (pre.closest('[data-rehype-pretty-code-figure]') as HTMLElement) ?? pre;
    container.style.position = 'relative';

    const btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.textContent = 'copy';
    container.appendChild(btn);

    const onClick = async () => {
      const text = pre.querySelector('code')?.textContent ?? '';
      await navigator.clipboard.writeText(text);
      btn.textContent = 'copied!';
      setTimeout(() => {
        btn.textContent = 'copy';
      }, 1500);
    };

    btn.addEventListener('click', onClick);
    cleanups.push(() => btn.removeEventListener('click', onClick));
  });

  return {
    destroy() {
      cleanups.forEach((fn) => fn());
    },
  };
}
