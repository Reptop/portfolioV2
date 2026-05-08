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

export async function load() {
  /** @type {Record<string, { metadata?: Record<string, any> }>} */
  const modules = import.meta.glob('$lib/posts/*.md', { eager: true });
  /** @type {Record<string, string>} */
  const rawModules = import.meta.glob('$lib/posts/*.md', { eager: true, query: '?raw', import: 'default' });

  const posts = Object.entries(modules)
    .map(([path, module]) => {
      const fileName = path.split('/').pop();
      const slug = (fileName || '').replace(/\.md$/, '');
      const metadata = module.metadata || {};
      const readMins = estimateReadingMinutes(String(rawModules[path] || ''));

      return {
        slug,
        title: metadata.title || null,
        date: metadata.date || null,
        readMins
      };
    })
    .sort((a, b) => (a.date || '') < (b.date || '') ? 1 : -1);

  return { posts };
}
