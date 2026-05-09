export type Command = {
  type: 'page' | 'project' | 'post';
  label: string;
  href: string;
};

const projectModules = import.meta.glob('./projects/*.md', { eager: true }) as Record<
  string,
  { metadata?: Record<string, unknown> }
>;
const postModules = import.meta.glob('./posts/*.md', { eager: true }) as Record<
  string,
  { metadata?: Record<string, unknown> }
>;

const slug = (path: string) => path.split('/').pop()!.replace('.md', '');

export const commands: Command[] = [
  { type: 'page', label: 'home',     href: '/'        },
  { type: 'page', label: 'about',    href: '/about'   },
  { type: 'page', label: 'projects', href: '/projects'},
  { type: 'page', label: 'blog',     href: '/blog'    },
  { type: 'page', label: 'gear',     href: '/gear'    },
  { type: 'page', label: 'contact',  href: '/contact' },
  ...Object.entries(projectModules).map(([path, mod]) => ({
    type: 'project' as const,
    label: (mod.metadata?.title as string) ?? slug(path),
    href:  `/projects/${slug(path)}`,
  })),
  ...Object.entries(postModules).map(([path, mod]) => ({
    type: 'post' as const,
    label: (mod.metadata?.title as string) ?? slug(path),
    href:  `/blog/${slug(path)}`,
  })),
];
