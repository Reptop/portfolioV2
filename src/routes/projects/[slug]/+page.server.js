import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;
  /** @type {Record<string, { metadata?: Record<string, any> }>} */
  const modules = import.meta.glob('$lib/projects/*.md', { eager: true });
  const match = modules[`/src/lib/projects/${slug}.md`];

  if (!match)
    throw error(404, 'Project not found');

  const metadata = match.metadata || {};
  const date = metadata.date || null;
  const formattedDate = date
    ? new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date))
    : null;

  const tags = Array.isArray(metadata.tags) ? metadata.tags : [];
  const gallery = Array.isArray(metadata.gallery)
    ? metadata.gallery.filter((item) => typeof item === 'string' && item.length > 0)
    : [];
  const info = [];

  if (metadata.platform)
    info.push({ label: 'Platform', value: metadata.platform });

  if (metadata.source)
    info.push({ label: 'Source', value: metadata.source });

  if (metadata.stack)
    info.push({ label: 'Stack', value: metadata.stack });

  else if (tags.length)
    info.push({ label: 'Stack', value: tags.join(', ') });

  if (metadata.status)
    info.push({ label: 'Status', value: metadata.status });

  if (metadata.video)
    info.push({ label: 'Video', value: metadata.video });

  return {
    slug,
    title: metadata.title || null,
    date,
    formattedDate,
    summary: metadata.summary || null,
    tags,
    cover: metadata.cover || null,
    gallery,
    info
  };
}
