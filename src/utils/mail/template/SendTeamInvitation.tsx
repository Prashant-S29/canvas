import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

// assets
import { LOGO_BLACK } from '~/global/constants';

// utils
import { slugToString } from '~/utils/slugHandler';

interface SendTeamInvitationMailProps {
  senderName: string;
  orgSlug: string;
  senderMail: string;
  invitationLink: string;
  teamName: string;
}
export const SendTeamInvitationMail = ({
  senderMail,
  senderName,
  orgSlug,
  invitationLink,
  teamName,
}: SendTeamInvitationMailProps) => {
  const previewText = `Join ${teamName} on Canvas`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={LOGO_BLACK}
                width="40"
                height="40"
                alt="canvas"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>{teamName}</strong> on <strong>Canvas</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {senderName} ({senderMail}) from{' '}
              <strong>{slugToString(orgSlug)}</strong> has invited you to the{' '}
              <strong>{teamName}</strong> on <strong>Canvas</strong>.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={invitationLink}
              >
                Join the Team
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{' '}
              <Link
                href={invitationLink}
                className="text-blue-600 no-underline"
              >
                {invitationLink}
              </Link>
            </Text>

            <Hr className="mx-0 my-[16px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation will expire in 24 hours. If you were not expecting
              this email, you can ignore this email. If you are concerned about
              your account&apos;s safety, please reply to this email to get in
              touch with us.
            </Text>

            <Hr className="mx-0 my-[16px] w-full border border-solid border-[#eaeaea]" />

            <Text className="text-[12px] leading-[24px] text-[#666666]">
              © 2024 | Canvas | www.canvas.pro
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
