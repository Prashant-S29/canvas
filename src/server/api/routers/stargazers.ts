import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter } from "~/server/api/trpc";
import { publicProcedure } from "../middleware";

const StargazerSchema = z.object({
  user: z.object({
    login: z.string(),
    avatar_url: z.string().url(),
  }),
});

export const stargazerRouter = createTRPCRouter({
  getAllStargazers: publicProcedure
    .input(z.object({ username: z.string(), repo: z.string() }))
    .query(async ({ input }) => {
      const perPage = 100;
      let page = 1;
      const results: { username: string; avatarUrl: string }[] = [];

      while (true) {
        const res = await fetch(
          `https://api.github.com/repos/${input.username}/${input.repo}/stargazers?per_page=${perPage}&page=${page}`
        );

        if (!res.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `GitHub API returned ${res.status}`,
          });
        }

        const json = await res.json();
        if (!Array.isArray(json)) break;

        for (const item of json) {
          const parse = StargazerSchema.safeParse(item);
          if (parse.success) {
            results.push({
              username: parse.data.user.login,
              avatarUrl: parse.data.user.avatar_url,
            });
          }
        }

        if (json.length < perPage) break;
        page++;
      }

      return results;
    }),
});
