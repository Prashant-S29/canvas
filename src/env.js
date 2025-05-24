import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),

    BETTER_AUTH_SECRET: z.string().min(1, {
      message: 'BETTER_AUTH_SECRET must be set',
    }),
    BETTER_AUTH_URL: z.string().url(),

    // github oauth
    GITHUB_CLIENT_ID: z.string().min(1, {
      message: 'GITHUB_CLIENT_ID must be set',
    }),
    GITHUB_CLIENT_SECRET: z.string().min(1, {
      message: 'GITHUB_CLIENT_SECRET must be set',
    }),

    // nodemailer
    EMAIL_HOST: z.string().min(1, {
      message: 'EMAIL_HOST must be set',
    }),
    EMAIL_PORT: z.string().min(1, {
      message: 'EMAIL_PORT must be set',
    }),
    EMAIL_USER: z.string().min(1, {
      message: 'EMAIL_USER must be set',
    }),
    EMAIL_PASS: z.string().min(1, {
      message: 'EMAIL_PASS must be set',
    }),

  },

  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

    // nodemailer
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,

    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
