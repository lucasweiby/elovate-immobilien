import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";
import { client } from "../../lib/apollo-client";
import { formatPostDate, type PostQuery } from "../../lib/posts";

export default function PostPage({ params }: PageProps<"/posts/[slug]">) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <Suspense
        fallback={
          <main className="site-shell loading-state">Carregando artigo...</main>
        }
      >
        <PostContent params={params} />
      </Suspense>
    </ViewTransition>
  );
}

async function PostContent({
  params,
}: {
  params: PageProps<"/posts/[slug]">["params"];
}) {
  const { slug } = await params;
  const { data } = await client.query<PostQuery>({
    query: gql`
      query postBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id
          slug
          title
          date
          content
          excerpt
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    `,
    variables: { slug },
    fetchPolicy: "no-cache",
  });

  const post = data?.post;
  if (!post) notFound();

  const image = post.featuredImage?.node;

  return (
    <main className="site-shell article-shell">
      <header
        className="site-header"
        style={{ viewTransitionName: "site-header" }}
      >
        <Link className="wordmark" href="/" aria-label="Elovate, início">
          ELOVATE<span>.</span>
        </Link>
        <span className="header-caption">IMOBILIÁRIO, EM PERSPECTIVA</span>
        <Link className="header-link" href="/" transitionTypes={["nav-back"]}>
          ← VOLTAR AO FEED
        </Link>
      </header>

      <article className="article-page">
        <Link className="back-link" href="/" transitionTypes={["nav-back"]}>
          ← Todas as publicações
        </Link>
        <div className="article-heading">
          <p className="eyebrow">
            <span className="eyebrow-mark" /> CADERNO ELOVATE
          </p>
          <h1>{post.title}</h1>
          <div className="article-meta">
            <span className="author-avatar" aria-hidden="true">
              {(post.author?.node.name ?? "E").charAt(0).toUpperCase()}
            </span>
            <span>{post.author?.node.name ?? "Equipe Elovate"}</span>
            <span className="meta-divider" />
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </div>
        </div>

        <figure className="article-cover">
          <ViewTransition
            name={`post-cover-${post.slug}`}
            share="morph"
            default="none"
          >
            <Image
              src={image?.sourceUrl ?? "/property-fallback.jpg"}
              alt={image?.altText || post.title}
              width={1800}
              height={1000}
              unoptimized
            />
          </ViewTransition>
          <figcaption>
            INSIGHTS ELOVATE <span>•</span>{" "}
            {formatPostDate(post.date).toUpperCase()}
          </figcaption>
        </figure>

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="article-endmark" aria-hidden="true">
          E.
        </div>
        <Link
          className="article-return"
          href="/"
          transitionTypes={["nav-back"]}
        >
          ← Voltar para todas as histórias
        </Link>
      </article>

      <footer className="site-footer">
        <Link className="wordmark" href="/" transitionTypes={["nav-back"]}>
          ELOVATE<span>.</span>
        </Link>
        <span>IMÓVEIS COM OUTRO OLHAR</span>
      </footer>
    </main>
  );
}
