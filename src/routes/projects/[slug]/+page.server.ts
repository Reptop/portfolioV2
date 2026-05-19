import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const modules = import.meta.glob<{ metadata?: Record<string, unknown> }>('$lib/projects/*.md', { eager: true });

  const match = modules[`/src/lib/projects/${slug}.md`];

  if (!match)
    throw error(404, 'Project not found');

  const metadata = (match.metadata ?? {}) as Record<string, unknown>;
  const date = (metadata.date as string) ?? null;
  const formattedDate = date ? dateFormatter.format(new Date(date)) : null;

  const tags = Array.isArray(metadata.tags) ? (metadata.tags as string[]) : [];

  const gallery = Array.isArray(metadata.gallery)
    ? (metadata.gallery as string[]).filter((item) => typeof item === 'string' && item.length > 0)
    : [];

  const info: { label: string; value: string }[] = [];

  if (metadata.platform) info.push({ label: 'Platform', value: metadata.platform as string });
  if (metadata.source) info.push({ label: 'Source', value: metadata.source as string });
  if (metadata.stack) info.push({ label: 'Stack', value: metadata.stack as string });
  else if (tags.length) info.push({ label: 'Stack', value: tags.join(', ') });
  if (metadata.status) info.push({ label: 'Status', value: metadata.status as string });
  if (metadata.video) info.push({ label: 'Video', value: metadata.video as string });

  const allProjects = Object.entries(modules)
    .map(([p, mod]) => ({
      slug: p.split('/').pop()?.replace('.md', '') ?? '',
      title: (mod.metadata?.title as string) ?? null,
      date: (mod.metadata?.date as string) ?? null,
    }))
    .sort((a, b) => ((a.date ?? '') < (b.date ?? '') ? 1 : -1));

  const idx = allProjects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? allProjects[idx - 1] : null;
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;

  return {
    slug,
    title: (metadata.title as string) ?? null,
    date,
    formattedDate,
    summary: (metadata.summary as string) ?? null,
    tags,
    cover: (metadata.cover as string) ?? null,
    gallery,
    info,
    prev,
    next,
  };
};
