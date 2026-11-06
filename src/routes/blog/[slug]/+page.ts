import type { PageLoad } from './$types';
import type { Component } from 'svelte';

// Importing the compiled markdown here (in a universal load) instead of in the
// component lets SvelteKit render the post body on the server, so the HTML
// arrives with content instead of an empty shell that fills in after hydration.
const modules = import.meta.glob<{ default: Component }>('$lib/posts/*.md');

export const load: PageLoad = async ({ data }) => {
  // The server load has already 404'd on unknown or draft slugs.
  const { default: content } = await modules[`/src/lib/posts/${data.slug}.md`]();
  return { ...data, content };
};
