import type { PageLoad } from './$types';
import type { Component } from 'svelte';

// Importing the compiled markdown here (in a universal load) instead of in the
// component lets SvelteKit render the project body on the server, so the HTML
// arrives with content instead of an empty shell that fills in after hydration.
const modules = import.meta.glob<{ default: Component }>('$lib/projects/*.md');

export const load: PageLoad = async ({ data }) => {
  // The server load has already 404'd on unknown slugs.
  const { default: content } = await modules[`/src/lib/projects/${data.slug}.md`]();
  return { ...data, content };
};
