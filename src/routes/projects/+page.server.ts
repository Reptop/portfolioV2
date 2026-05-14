import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const modules = import.meta.glob<{ metadata?: Record<string, unknown> }>('$lib/projects/*.md', { eager: true });

  const projects = Object.entries(modules)
    .map(([path, module]) => {
      const fileName = path.split('/').pop();
      const slug = (fileName ?? '').replace(/\.md$/, '');
      const metadata = (module.metadata ?? {}) as Record<string, unknown>;

      return {
        slug,
        title: (metadata.title as string) ?? null,
        stack: (metadata.stack as string) ?? null,
        status: (metadata.status as string) ?? null,
        date: (metadata.date as string) ?? null,
        cover: (metadata.cover as string) ?? null,
        hasVideo: typeof metadata.video === 'string' && metadata.video.startsWith('http'),
      };
    })
    .sort((a, b) => ((a.date ?? '') < (b.date ?? '') ? 1 : -1));

  return { projects };
};
