import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const modules = import.meta.glob<{ metadata?: Record<string, unknown> }>('$lib/gear/*.md', { eager: true });

  const gear = Object.entries(modules)
    .map(([path, module]) => {
      const fileName = path.split('/').pop();
      const slug = (fileName ?? '').replace(/\.md$/, '');
      const metadata = (module.metadata ?? {}) as Record<string, unknown>;

      return {
        slug,
        title: (metadata.title as string) ?? null,
        date: (metadata.date as string) ?? null,
        cover: (metadata.cover as string) ?? null,
        summary: (metadata.summary as string) ?? null,
        use: (metadata.use as string) ?? null,
        status: (metadata.status as string) ?? null,
        highlights: Array.isArray(metadata.highlights)
          ? (metadata.highlights as string[]).filter((item) => typeof item === 'string' && item.length > 0)
          : [],
      };
    })
    .sort((a, b) => ((a.date ?? '') < (b.date ?? '') ? 1 : -1));

  return { gear };
};
