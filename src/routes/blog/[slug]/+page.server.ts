import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function estimateReadingMinutes(markdown: string): number {
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

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const modules = import.meta.glob<{ metadata?: Record<string, unknown> }>('$lib/posts/*.md', { eager: true });
  const rawModules = import.meta.glob<string>('$lib/posts/*.md', { query: '?raw', import: 'default' });

  const match = modules[`/src/lib/posts/${slug}.md`];
  const rawMatch = rawModules[`/src/lib/posts/${slug}.md`];

  if (!match || !rawMatch) throw error(404, 'Post not found');

  const metadata = (match.metadata ?? {}) as Record<string, unknown>;
  if (metadata.draft === true) throw error(404, 'Post not found');
  const raw = String(await rawMatch());
  const readMins = estimateReadingMinutes(raw);
  const tags = Array.isArray(metadata.tags) ? (metadata.tags as string[]) : [];
  const publishedDate = (metadata.date as string) ?? null;
  const updatedDate = (metadata.updated as string) ?? null;

  return {
    slug,
    title: (metadata.title as string) ?? null,
    subtitle: (metadata.subtitle as string) ?? null,
    date: publishedDate,
    updated: updatedDate,
    tags,
    cover: (metadata.cover as string) ?? null,
    readMins,
    formattedDate: publishedDate ? dateFormatter.format(new Date(publishedDate)) : null,
    formattedUpdated: updatedDate ? dateFormatter.format(new Date(updatedDate)) : null,
  };
};
