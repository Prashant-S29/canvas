import type React from 'react';

// components
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from '~/trpc/server';

interface Params {
  params: Promise<{ slug: string }>;
}

const TeamPage: React.FC<Params> = async ({ params }) => {
  const slug = (await params).slug;
  const {
    data: teamData,
    error,
    message,
  } = await api.team.getTeamBySlug({ teamSlug: slug });

  if (!teamData?.name) {
    return <div>Team not found</div>;
  }

  return (
    <div className="relative min-h-screen w-full pb-5 pt-[100px]">
      <section>
        <h1 className="text-xl font-semibold text-primary">{teamData.name}</h1>
        <p className="text-sm text-primary/70">{teamData.description}</p>
      </section>

      {JSON.stringify(teamData)}

      {/* <div className="space-y-6">
        <Tabs defaultValue="account" className="">
          <TabsList variant={"underline"} width={"full"}>
            <TabsTrigger value="account" variant={"underline"} width={"fit"}>
              Account
            </TabsTrigger>
            <TabsTrigger value="password" variant={"underline"} width={"fit"}>
              Password
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div> */}
    </div>
  );
};

export default TeamPage;
