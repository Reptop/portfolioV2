export async function load() {
  /** @type {Record<string, { metadata?: Record<string, any> }>} */
  const modules = import.meta.glob('$lib/projects/*.md', { eager: true });

  const projects = Object.entries(modules)
    .map(([path, module]) => {
      const fileName = path.split('/').pop();
      const slug = (fileName || '').replace(/\.md$/, '');
      const metadata = module.metadata || {};

      return {
        slug,
        title: metadata.title || null,
        summary: metadata.summary || null,
        stack: metadata.stack || null,
        date: metadata.date || null,
        cover: metadata.cover || null,
        hasVideo: typeof metadata.video === 'string' && metadata.video.startsWith('http'),
      };
    })
    .sort((a, b) => (a.date || '') < (b.date || '') ? 1 : -1);

  return { projects };
}
