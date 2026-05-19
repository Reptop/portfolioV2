export type Command = {
  type: 'page' | 'project' | 'post';
  label: string;
  href: string;
};

const projectGlob = import.meta.glob('./projects/*.md') as Record<
  string,
  () => Promise<{ metadata?: Record<string, unknown> }>
>;
const postGlob = import.meta.glob('./posts/*.md') as Record<
  string,
  () => Promise<{ metadata?: Record<string, unknown> }>
>;

const slug = (path: string) => path.split('/').pop()!.replace('.md', '');

const staticCommands: Command[] = [
  { type: 'page', label: 'home', href: '/' },
  { type: 'page', label: 'about', href: '/about' },
  { type: 'page', label: 'projects', href: '/projects' },
  { type: 'page', label: 'blog', href: '/blog' },
  { type: 'page', label: 'gear', href: '/gear' },
  { type: 'page', label: 'now', href: '/now' },
  { type: 'page', label: 'contact', href: '/contact' },
];

export async function loadCommands(): Promise<Command[]> {
  const [projects, posts] = await Promise.all([
    Promise.all(
      Object.entries(projectGlob).map(async ([path, load]) => {
        const mod = await load();
        return { type: 'project' as const, label: (mod.metadata?.title as string) ?? slug(path), href: `/projects/${slug(path)}` };
      })
    ),
    Promise.all(
      Object.entries(postGlob).map(async ([path, load]) => {
        const mod = await load();
        return { type: 'post' as const, label: (mod.metadata?.title as string) ?? slug(path), href: `/blog/${slug(path)}` };
      })
    ),
  ]);

  return [...staticCommands, ...projects, ...posts];
}
