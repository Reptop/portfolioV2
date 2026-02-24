import type { TransitionConfig } from 'svelte/transition';

export default function TerminalAnimation(
  node: Element,
  opts?: { delay?: number; duration?: number },
): TransitionConfig {
  const delay = opts?.delay ?? 0;
  const duration = opts?.duration ?? 260;

  return {
    delay,
    duration,
    easing: (t) => t,
    css: (t) => {
      const inv = 1 - t;
      const jitter = inv * 6;
      const x = (Math.sin(t * 40) * jitter).toFixed(2);
      const y = (inv * 10).toFixed(2);
      const contrast = (1 + inv * 0.25).toFixed(3);
      const blur = (inv * 1.2).toFixed(2);

      return `
          opacity: ${t};
          transform: translate3d(${x}px, ${y}px, 0);
          filter: contrast(${contrast}) blur(${blur}px);
        `;
    },
  };
}

