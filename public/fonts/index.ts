// Local Fonts
import localFont from 'next/font/local';

// google fonts
import { Montserrat } from 'next/font/google';

export const clashGrotesk = localFont({
  src: [
    {
      path: './clashGrotesk/clashGrotesk.ttf',
    },
  ],
  variable: '--font-clash-grotesk',
});

export const satoshi = localFont({
  src: [
    {
      path: './satoshi/satoshi-regular.otf',
      weight: '400',
    },
    {
      path: './satoshi/satoshi-medium.otf',
      weight: '500',
    },
  ],
  variable: '--font-satoshi',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});
