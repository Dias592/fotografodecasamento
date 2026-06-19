import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import SatellitePost from '@/components/SatellitePost';
import { getPostBySlug, posts } from '@/lib/posts';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

function truncateTitle(title: string, max = 60): string {
  if (title.length <= max) return title;
  const cut = title.lastIndexOf(' ', max - 1);
  return (cut > 20 ? title.slice(0, cut) : title.slice(0, max - 1)) + '…';
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const shortTitle = truncateTitle(post.title);
  const desc = post.description.length > 155
    ? post.description.slice(0, post.description.lastIndexOf(' ', 152)) + '…'
    : post.description;

  return {
    title: { absolute: shortTitle },
    description: desc,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: desc,
      url: `/blog/${post.slug}/`,
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: shortTitle,
      description: desc,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <SatellitePost post={post} />
      <Footer />
    </>
  );
}
