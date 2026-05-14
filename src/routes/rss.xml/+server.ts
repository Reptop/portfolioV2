import type { RequestHandler } from './$types';

export const prerender = true;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async ({ url }) => {
  const origin = url.origin;

  const modules = import.meta.glob<{ metadata?: Record<string, unknown> }>('$lib/posts/*.md', { eager: true });

  const posts = Object.entries(modules)
    .map(([path, mod]) => {
      const slug = path.split('/').pop()?.replace('.md', '') ?? '';
      const meta = (mod.metadata ?? {}) as Record<string, unknown>;
      return {
        slug,
        title: (meta.title as string) ?? slug,
        subtitle: (meta.subtitle as string) ?? '',
        date: (meta.date as string) ?? null,
      };
    })
    .filter((p): p is typeof p & { date: string } => p.date !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>reptop</title>
    <link>${origin}/blog</link>
    <description>Raed Kabir's blog — ML, math, and programming.</description>
    <language>en</language>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml" />
${posts
      .map(
        (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${origin}/blog/${p.slug}</link>
      <guid isPermaLink="true">${origin}/blog/${p.slug}</guid>
      ${p.subtitle ? `<description>${escapeXml(p.subtitle)}</description>` : ''}
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  });
};
