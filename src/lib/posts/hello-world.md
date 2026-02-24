---
title: "My first blog post (wow)"
subtitle: "Cool subtitle"
date: "2026-02-24"
tags: ["Svelte", "mdsvex"]
---

Hello! This is my first blog post. I'm using mdsvex to render markdown content in Svelte. I'm still learning how to use it.

```ts title="src/lib/math.ts" showLineNumbers {2,4}
const add = (a: number, b: number) => a + b;
const subtract = (a: number, b: number) => a - b;

export const calc = (a: number, b: number) => {
  return { sum: add(a, b), diff: subtract(a, b) };
};
```
