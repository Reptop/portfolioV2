export async function load({ setHeaders }: { setHeaders: (h: Record<string, string>) => void }) {
  setHeaders({ 'cache-control': 'max-age=0, s-maxage=3600' });

  try {
    const res = await fetch(
      'https://api.github.com/users/Reptop/repos?sort=pushed&per_page=6&type=public',
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );

    if (!res.ok) return { activity: null };

    const repos: any[] = await res.json();
    const now = Date.now();

    const activity = repos
      .filter((r) => !r.fork && r.pushed_at)
      .map((r) => {
        const diffMs = now - new Date(r.pushed_at).getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        let when: string;
        if (diffDays === 0) when = 'today';
        else if (diffDays === 1) when = 'yesterday';
        else if (diffDays < 7) when = `${diffDays} days ago`;
        else if (diffDays < 14) when = '1 week ago';
        else if (diffDays < 30) when = `${Math.floor(diffDays / 7)} weeks ago`;
        else if (diffDays < 60) when = '1 month ago';
        else when = `${Math.floor(diffDays / 30)} months ago`;

        return {
          name: r.name as string,
          url: r.html_url as string,
          language: (r.language as string) ?? null,
          when,
          diffDays,
        };
      })
      .slice(0, 5);

    return { activity };
  }

  catch {
    return { activity: null };
  }
}
