import SanityClientConstructor from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
export const client = SanityClientConstructor({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-08-30',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});
const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);
