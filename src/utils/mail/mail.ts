import nodemailer from 'nodemailer';
import { env } from '~/env';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: env.EMAIL_HOST,
  port: Number.parseInt(env.EMAIL_PORT),
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});
