import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, ViewTransition } from "react";
import { client } from "../lib/apollo-client";
import { formatPostDate, getPostExcerpt, type PostsQuery } from "../lib/posts";

export default function PostsPage() {
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
          <main className="site-shell loading-state">Loading articles...</main>
        }
      >
        <PostsArchive />
      </Suspense>
    </ViewTransition>
  );
}

async function PostsArchive() {
  const { data } = await client.query<PostsQuery>({
    query: gql`
      query allPosts {
        posts {
          nodes {
            id
            slug
            title
            date
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
      }
    `,
    fetchPolicy: "no-cache",
  });
  const posts = data?.posts.nodes ?? [];

  return (
    <main className="site-shell">
      <header
        className="site-header"
        style={{ viewTransitionName: "site-header" }}
      >
        <Link className="wordmark" href="/" aria-label="Elovate, home">
          ELOVATE<span>.</span>
        </Link>
        <span className="header-caption">STRATEGIC PROPERTY MANAGEMENT</span>
        <Link className="header-link" href="/" transitionTypes={["nav-back"]}>
          HOME <span aria-hidden="true">↗</span>
        </Link>
      </header>
      <section className="feed-intro" aria-labelledby="feed-title">
        <p className="eyebrow">
          <span className="eyebrow-mark" /> ELOVATE JOURNAL
        </p>
        <h1 id="feed-title">
          Property
          <br />
          insights<span>.</span>
        </h1>
        <p className="feed-description">
          Ideas, knowledge, and new perspectives on property and investment.
        </p>
        <div className="feed-count">
          <span>{String(posts.length).padStart(2, "0")}</span> ARTICLES
        </div>
      </section>
      <section className="feed-section" aria-label="Recent articles">
        <div className="section-heading">
          <h2>Latest stories</h2>
          <span>EDITOR&apos;S PICKS</span>
        </div>
        {posts.length ? (
          <div className="post-grid">
            {posts.map((post, index) => {
              const image = post.featuredImage?.node;
              return (
                <Link
                  className={`post-card${index === 0 ? " post-card-featured" : ""}`}
                  href={`/posts/${post.slug}`}
                  transitionTypes={["nav-forward"]}
                  key={post.id}
                >
                  <div className="post-card-image">
                    <Image
                      src={image?.sourceUrl ?? "/property-fallback.jpg"}
                      alt={image?.altText || post.title}
                      width={1600}
                      height={1000}
                      unoptimized
                    />
                    <span className="image-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="card-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  <div className="post-card-copy">
                    <div className="post-meta">
                      <span>{post.author?.node.name ?? "Elovate Team"}</span>
                      <span>{formatPostDate(post.date)}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{getPostExcerpt(post.excerpt)}...</p>
                    <span className="read-link">
                      READ ARTICLE <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="empty-state">
            No articles are available yet. Check back soon.
          </p>
        )}
      </section>
      <footer className="site-footer">
        <Link className="wordmark" href="/" transitionTypes={["nav-back"]}>
          ELOVATE<span>.</span>
        </Link>
        <span>STRATEGIC PROPERTY MANAGEMENT</span>
      </footer>
    </main>
  );
}
