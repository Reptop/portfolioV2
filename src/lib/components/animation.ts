import type { TransitionConfig } from 'svelte/transition';

// A staggered fade. The layout's spatial page transition already supplies the
// motion, so this deliberately has none of its own; stacking a jitter or slide
// on top fought that movement.
export default function TerminalAnimation(_node: Element, opts?: { delay?: number; duration?: number },): TransitionConfig {
  const delay = opts?.delay ?? 0;
  const duration = opts?.duration ?? 320;

  return {
    delay,
    duration,
    easing: (t) => t,
    css: (t) => `opacity: ${t};`,
  };
}
