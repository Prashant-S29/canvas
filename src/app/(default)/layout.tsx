import '~/styles/globals.css';

import { Provider } from '~/lib/provider';
import { generateSeo } from '~/utils';

// fonts
import { clashGrotesk, montserrat, satoshi } from 'public/fonts';

// components
import { Header } from '~/components/layout/Header';

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${clashGrotesk.variable} ${montserrat.variable} antialiased`}
    >
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
