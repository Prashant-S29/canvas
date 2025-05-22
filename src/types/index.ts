export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  domain: string;
  ogImage: {
    url: string;
    width: number;
    height: number;
  };
  twitterHandle: string;
  links: {
    twitter: string;
  };
};
