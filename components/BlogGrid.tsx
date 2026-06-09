'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Post } from '@/lib/posts';
import { SHIMMER_BLUR_DATA_URL } from '@/lib/utils';

export default function BlogGrid({ posts, limit }: { posts: Post[]; limit?: number }) {
  const list = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {list.map((post, index) => (
        <motion.article
          key={post.slug}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={`/blog/${post.slug}`} data-cursor-hover className="group block focus-visible-ring">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={post.image}
                alt={`Casamento registrado no bairro ${post.bairro}, São Paulo`}
                role="img"
                width={0}
                height={0}
                loading="lazy"
                placeholder="blur"
                blurDataURL={SHIMMER_BLUR_DATA_URL}
                sizes="(min-width: 768px) 33vw, 100vw"
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
            <p className="mt-2 font-body text-sm text-blue-deep/60 line-clamp-2">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wide text-brown-warm">
              Ler artigo
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
