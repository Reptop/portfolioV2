import type { TransitionConfig } from 'svelte/transition';

export default function TerminalAnimation(_node: Element, opts?: { delay?: number; duration?: number },): TransitionConfig {
  const delay = opts?.delay ?? 0;
  const duration = opts?.duration ?? 320;

  return {
    delay,
    duration,
    easing: (t) => t,
    css: (t) => {
      const inv = 1 - t;
      const jitter = inv * 9;
      const x = (Math.sin(t * 36) * jitter).toFixed(2);
      const y = (inv * 16).toFixed(2);
      const contrast = (1 + inv * 0.45).toFixed(3);
      const blur = (inv * 2.5).toFixed(2);

      return `
          opacity: ${t};
          transform: translate3d(${x}px, ${y}px, 0);
          filter: contrast(${contrast}) blur(${blur}px);
        `;
    },
  };
}

