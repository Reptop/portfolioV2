/** @type {import('./$types').PageServerLoad} */
export async function load({ setHeaders }: { setHeaders: (h: Record<string, string>) => void }) {
  setHeaders({ 'cache-control': 'max-age=0, s-maxage=3600' });

  try {
    const res = await fetch(
      'https://api.github.com/users/Reptop/events/public?per_page=100',
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );

    if (!res.ok) return { activity: null };

    const events: any[] = await res.json();
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;

    let commitCount = 0;
    const repoMap = new Map<string, { name: string; count: number }>();

    for (const event of events) {
      if (event.type !== 'PushEvent') continue;
      if (new Date(event.created_at).getTime() < cutoff) continue;

      const commits: number = event.payload?.commits?.length ?? 0;
      commitCount += commits;

      const name: string = event.repo.name.split('/')[1];
      repoMap.set(name, { name, count: (repoMap.get(name)?.count ?? 0) + commits });
    }

    return {
      activity: {
        commitCount,
        repos: [...repoMap.values()].sort((a, b) => b.count - a.count).slice(0, 5),
      },
    };
  } catch {
    return { activity: null };
  }
};
