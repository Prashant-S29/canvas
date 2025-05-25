import '~/styles/globals.css';

import { Provider } from '~/lib/provider';
import { generateSeo } from '~/utils';

// fonts
import { clashGrotesk, satoshi } from 'public/fonts';
import { NoHeader } from '~/components/layout';

// metadata
export const generateMetadata = () =>
  generateSeo({
    title: {
      template: '%s | Canvas',
      default: 'Canvas | A fully managed certificate generator',
    },
    description: 'A fully managed certificate generator.',
    url: '/',
  });

// TODO: implement importModuleOptimizer for

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${clashGrotesk.variable} antialiased`}
    >
      <body>
        <Provider>
          <NoHeader />
          {children}
        </Provider>
      </body>
    </html>
  );
}
