import '~/styles/globals.css';

import { Provider } from '~/lib/provider';
import { generateSeo, slugToString } from '~/utils';

// fonts
import { clashGrotesk, montserrat, satoshi } from 'public/fonts';

import { headers } from 'next/headers';
// components
import { auth } from '~/lib/auth';
// metadata
export const generateMetadata = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return generateSeo({
    title: {
      template: `%s | ${slugToString(
        session?.session.orgSlug?.split(' ')[0] ?? '',
      )}'s Dashboard | Canvas`,
      default: `${slugToString(
        session?.session.orgSlug?.split(' ')[0] ?? '',
      )}'s Dashboard | Canvas`,
    },
    description: 'Dashboard',
    url: 'https://canvas.com/dashboard',
  });
};

// TODO: implement importModuleOptimizer for

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${clashGrotesk.variable} ${montserrat.variable} antialiased`}
    >
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
