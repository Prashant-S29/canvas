import { postRouter } from '~/server/api/routers/post';
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { mailRouter } from './routers/route.mail';
import { orgRouter } from './routers/route.org';
import { projectRouter } from './routers/route.project';
import { teamRouter } from './routers/route.team';

export const appRouter = createTRPCRouter({
  post: postRouter,
  org: orgRouter,
  team: teamRouter,
  mail: mailRouter,
  project: projectRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
