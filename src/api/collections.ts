import { getCollection, getEntries, type CollectionEntry } from 'astro:content';
import { differenceInMilliseconds } from 'date-fns';

export const all_articles = (
  await getCollection(
    'articles',
    ({ data }) => import.meta.env.DEV || !data.draft
  )
).sort((a, b) =>
  differenceInMilliseconds(b.data.published_at, a.data.published_at)
);

export const all_bits = (
  await getCollection('bits', ({ data }) => import.meta.env.DEV || !data.draft)
).sort((a, b) =>
  differenceInMilliseconds(b.data.published_at, a.data.published_at)
);

const seen_tags = (
  await getEntries(
    [...all_articles, ...all_bits].flatMap(({ data }) => data.tags)
  )
).reduce(
  (acc, tag) => {
    acc[tag.id] ??= { ...tag, count: 0 };
    acc[tag.id].count += 1;
    return acc;
  },
  {} as Record<string, CollectionEntry<'tags'> & { count: number }>
);

export const all_seen_tags = Object.values(seen_tags);
export const top_10_freq_tags = all_seen_tags
  .sort((l, r) => l.count - r.count)
  .slice(0, 10);
