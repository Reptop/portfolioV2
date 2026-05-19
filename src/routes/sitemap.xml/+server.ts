import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async ({ url }) => {
  const origin = url.origin;

  const projectModules = import.meta.glob('$lib/projects/*.md', { eager: true });
  const postModules = import.meta.glob('$lib/posts/*.md', { eager: true });

  const projectSlugs = Object.keys(projectModules).map(
    (path) => path.split('/').pop()?.replace('.md', '') ?? ''
  );
  const postSlugs = Object.keys(postModules).map(
    (path) => path.split('/').pop()?.replace('.md', '') ?? ''
  );

  const staticRoutes = ['/', '/about', '/projects', '/blog', '/gear', '/contact', '/now'];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}
${projectSlugs.map((slug) => `  <url><loc>${origin}/projects/${slug}</loc></url>`).join('\n')}
${postSlugs.map((slug) => `  <url><loc>${origin}/blog/${slug}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  });
};
