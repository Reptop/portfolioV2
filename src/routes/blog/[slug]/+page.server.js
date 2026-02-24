import { error } from '@sveltejs/kit';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});

/** @param {string} markdown */
function estimateReadingMinutes(markdown) {
  const content = markdown
    .replace(/^---[\s\S]*?---/, '')
    .replace(/`{3}[\s\S]*?`{3}/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[[^\]]*]\([^)]+\)/g, '')
    .replace(/[#>*_~-]/g, ' ');

  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export async function load({ params }) {
  const { slug } = params;
  /** @type {Record<string, { metadata?: Record<string, any> }>} */
  const modules = import.meta.glob('$lib/posts/*.md', { eager: true });

  /** @type {Record<string, () => Promise<any>>} */
  const rawModules = import.meta.glob('$lib/posts/*.md', { query: '?raw', import: 'default' });

  const match = modules[`/src/lib/posts/${slug}.md`];
  const rawMatch = rawModules[`/src/lib/posts/${slug}.md`];

  if (!match || !rawMatch)
    throw error(404, 'Post not found');

  const metadata = match.metadata || {};
  const raw = String(await rawMatch());
  const readMins = estimateReadingMinutes(raw);
  const tags = Array.isArray(metadata.tags) ? metadata.tags : [];
  const publishedDate = metadata.date || null;
  const updatedDate = metadata.updated || null;

  return {
    slug,
    title: metadata.title || null,
    subtitle: metadata.subtitle || null,
    date: publishedDate,
    updated: updatedDate,
    tags,
    cover: metadata.cover || null,
    readMins,
    formattedDate: publishedDate ? dateFormatter.format(new Date(publishedDate)) : null,
    formattedUpdated: updatedDate ? dateFormatter.format(new Date(updatedDate)) : null
  };
}
