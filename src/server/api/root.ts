import { stargazerRouter } from '~/server/api/routers/stargazers';
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';

export const appRouter = createTRPCRouter({
  stargazer: stargazerRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);


// <>/api/trpc/team.createNewTeam
