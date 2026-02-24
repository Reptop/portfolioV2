export async function load() {
  /** @type {Record<string, { metadata?: Record<string, any> }>} */

  // Import all markdown files from the posts directory eagerly
  const modules = import.meta.glob('$lib/projects/*.md', { eager: true });

  const projects = Object.entries(modules)
    .map(([path, module]) => {
      const fileName = path.split('/').pop();
      const slug = (fileName || '').replace(/\.md$/, '');
      const metadata = module.metadata || {};

      return {
        slug,
        title: metadata.title || null,
        date: metadata.date || null,
        cover: metadata.cover || null,
      };
    })
    .sort((a, b) => (a.date || '') < (b.date || '') ? 1 : -1);

  return { projects };
}

