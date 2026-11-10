export type Post = {
  id: string;
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  author: { node: { name: string } } | null;
  featuredImage: {
    node: { sourceUrl: string; altText: string | null };
  } | null;
};

export type PostsQuery = {
  posts: { nodes: Post[] };
};

export type PostQuery = {
  post: Post | null;
};

export function getPostExcerpt(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180)
    .trimEnd();
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
