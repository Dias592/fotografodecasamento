import Link from 'next/link';
import { Post } from '@/lib/posts';

function srcSet1x2x(src: string) {
  const s1x = src.replace('.webp', '-1x.webp');
  return `${s1x} 400w, ${src} 760w`;
}

const BLOG_SIZES = '(min-width: 768px) 33vw, calc(100vw - 48px)';

export default function BlogGrid({ posts, limit }: { posts: Post[]; limit?: number }) {
  const list = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {list.map((post) => (
        <article key={post.slug}>
          <Link href={`/blog/${post.slug}/`} data-cursor-hover className="group block focus-visible-ring">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={post.image}
                srcSet={srcSet1x2x(post.image)}
                sizes={BLOG_SIZES}
                alt={`Fotografia de casamento em ${post.bairro}`}
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: 'auto' }}
                className="transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <span className="absolute left-4 top-4 rounded-full bg-blue-accent px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-white">
                {post.bairro}
              </span>
            </div>
            <h3 className="mt-5 font-heading text-xl font-bold tracking-tightest text-blue-deep transition-colors group-hover:text-blue-accent">
              {post.title}
            </h3>
            <p className="mt-2 font-body text-sm text-blue-deep/70 line-clamp-2">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wide text-brown-warm">
              Ler artigo
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}
