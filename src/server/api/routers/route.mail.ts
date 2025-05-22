import { createTRPCRouter } from '~/server/api/trpc';

import type { SendMailOptions } from 'nodemailer';

import { render } from '@react-email/components';
import { z } from 'zod';
import { transporter } from '~/utils/mail/mail';
import { SendTeamInvitationMail } from '~/utils/mail/template';
import { protectedProcedure } from '../middleware';

export const mailRouter = createTRPCRouter({
  sendTeamInvitationMail: protectedProcedure
    .input(
      z.object({
        senderName: z.string(),
        senderMail: z.string(),
        receiverMail: z.string(),
        orgSlug: z.string(),
        invitationLink: z.string(),
        teamName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // html
        const html = await render(
          SendTeamInvitationMail({
            senderName: input.senderName,
            senderMail: input.senderMail,
            orgSlug: input.orgSlug,
            invitationLink: input.invitationLink,
            teamName: input.teamName,
          }),
        );

        // mail options
        const mailOptions: SendMailOptions = {
          from: 'prashant.s2922@gmail.com',
          to: input.receiverMail,
          subject: `You've been invited to join a team on Canvas`,
          // text: "verify your organization",
          html,
        };

        const res = await transporter.sendMail(mailOptions);

        if (!res.messageId) {
          console.error('Failed to send email');
          return null;
        }

        return res;
      } catch (error) {
        console.error('Error sending verification email:', error);
        return null;
      }
    }),
});
