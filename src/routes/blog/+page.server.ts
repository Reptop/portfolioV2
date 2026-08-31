import type { PageServerLoad } from './$types';

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

export const load: PageServerLoad = async () => {
  const modules = import.meta.glob<{ metadata?: Record<string, unknown> }>('$lib/posts/*.md', { eager: true });
  const rawModules = import.meta.glob<string>('$lib/posts/*.md', { eager: true, query: '?raw', import: 'default' });

  const posts = Object.entries(modules)
    .filter(([, module]) => module.metadata?.draft !== true)
    .map(([path, module]) => {
      const fileName = path.split('/').pop();
      const slug = (fileName ?? '').replace(/\.md$/, '');
      const metadata = (module.metadata ?? {}) as Record<string, unknown>;
      const readMins = estimateReadingMinutes(String(rawModules[path] ?? ''));

      return {
        slug,
        title: (metadata.title as string) ?? null,
        date: (metadata.date as string) ?? null,
        readMins,
      };
    })
    .sort((a, b) => ((a.date ?? '') < (b.date ?? '') ? 1 : -1));

  return { posts };
};
