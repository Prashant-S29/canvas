import { t } from '../trpc';
import { timingMiddleware } from './middleware.timing';

export const publicProcedure = t.procedure.use(timingMiddleware);
