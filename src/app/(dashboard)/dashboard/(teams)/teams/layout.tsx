import '~/styles/globals.css';

import { headers } from 'next/headers';
// auth
import { auth } from '~/lib/auth';

// utils
import { generateSeo } from '~/utils';
import { slugToString } from '~/utils/slugHandler';

// components
import {
  Navbar,
  TeamsDashboardSideMenu,
} from '~/components/dashboard/organization/layout';

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

export default function TeamLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="flex gap-[50px] px-[200px]">
        <TeamsDashboardSideMenu />
        {children}
      </main>
    </>
  );
}
