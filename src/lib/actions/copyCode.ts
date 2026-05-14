export function copyCode(node: HTMLElement) {
  const attached = new WeakSet<HTMLPreElement>();
  const cleanups: (() => void)[] = [];

  function attachButton(pre: HTMLPreElement) {
    if (attached.has(pre)) return;
    attached.add(pre);

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
  }

  node.querySelectorAll<HTMLPreElement>('pre').forEach(attachButton);

  const observer = new MutationObserver(() => {
    node.querySelectorAll<HTMLPreElement>('pre').forEach(attachButton);
  });
  observer.observe(node, { childList: true, subtree: true });

  return {
    destroy() {
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    },
  };
}
