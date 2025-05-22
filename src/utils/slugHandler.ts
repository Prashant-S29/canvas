export const stringToSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export const slugToString = (slug: string) => {
  return slug
    .toLowerCase()
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
