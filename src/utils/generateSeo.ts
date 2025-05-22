import type { Metadata } from 'next';

import { siteConfig } from '~/config';

interface Props {
  title:
    | string
    | {
        template: string;
        default: string;
      };
  description: string;
  url: string;
  image?: string;
  keywords?: string[];
  robots?: {
    index?: boolean;
    follow?: boolean;
    noindex?: boolean;
    nofollow?: boolean;
  };
  author?: string;
  openGraphType?: 'website' | 'article' | 'book' | 'profile';
}

export const generateSeo = ({
  title,
  description,
  url,
  image,
  keywords,
  robots,
  author,
  openGraphType = 'website',
}: Props): Metadata => {
  // TODO: update this
  const defaultImage = '';
  const imageUrl = image ?? defaultImage;

  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      url,
      locale: 'en_GB',
      type: openGraphType,
      images: [
        {
          url: imageUrl,
          width: 640,
          height: 321,
          alt: description,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@prashant_gigs',
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 641,
          height: 321,
          alt: description,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };

  if (keywords && keywords.length > 0) {
    metadata.keywords = keywords;
  }

  if (robots) {
    metadata.robots = {
      index: robots.index ?? undefined,
      follow: robots.follow ?? undefined,
    };
  }

  if (author) {
    metadata.authors = [{ name: author }];
    metadata.creator = author;
  }

  return metadata;
};
