export async function load() {
  /** @type {Record<string, { metadata?: Record<string, any> }>} */
  const modules = import.meta.glob('$lib/gear/*.md', { eager: true });

  const gear = Object.entries(modules)
    .map(([path, module]) => {
      const fileName = path.split('/').pop();
      const slug = (fileName || '').replace(/\.md$/, '');
      const metadata = module.metadata || {};

      return {
        slug,
        title: metadata.title || null,
        date: metadata.date || null,
        cover: metadata.cover || null,
        summary: metadata.summary || null,
        use: metadata.use || null,
        status: metadata.status || null,
        highlights: Array.isArray(metadata.highlights)
          ? metadata.highlights.filter((item) => typeof item === 'string' && item.length > 0)
          : [],
      };
    })
    .sort((a, b) => (a.date || '') < (b.date || '') ? 1 : -1);

  return { gear };
}
