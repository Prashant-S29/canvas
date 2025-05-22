import { z } from 'zod';

import { createTRPCRouter } from '~/server/api/trpc';
import { publicProcedure } from '../middleware';

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
