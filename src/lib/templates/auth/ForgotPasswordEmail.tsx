import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

const ForgotPasswordEmail = ({ email, url }: ForgotPasswordEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your Payloft password</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white mx-auto px-[40px] py-[40px] max-w-[600px] rounded-[8px] border border-solid border-gray-200">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-black text-[32px] font-bold m-0 mb-[8px]">
                Payloft
              </Heading>
              <Text className="text-gray-600 text-[16px] m-0">
                Secure Payment Solutions
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Heading className="text-black text-[24px] font-bold mb-[16px] mt-0">
                Reset Your Password
              </Heading>

              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[16px] mt-0">
                We received a request to reset the password for your Payloft
                account associated with <strong>{email}</strong>.
              </Text>

              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[24px] mt-0">
                Click the button below to create a new password. This link will
                expire in 24 hours for security reasons.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={url}
                className="bg-black text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
              >
                Reset Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-gray-600 text-[14px] leading-[20px] mb-[8px] mt-0">
                If the button doesn&apos;t work, copy and paste this link into
                your browser:
              </Text>
              <Text className="text-gray-600 text-[14px] leading-[20px] mt-0 break-all">
                <Link href={url} className="text-black underline">
                  {url}
                </Link>
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="bg-gray-50 px-[24px] py-[20px] rounded-[8px] mb-[32px] border border-solid border-gray-200">
              <Text className="text-gray-700 text-[14px] leading-[20px] mb-[8px] mt-0 font-semibold">
                Security Notice:
              </Text>
              <Text className="text-gray-600 text-[14px] leading-[20px] mt-0 mb-0">
                If you didn&apos;t request this password reset, please ignore
                this email. Your account remains secure and no changes have been
                made.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-[24px]">
              <Text className="text-gray-500 text-[12px] leading-[16px] text-center m-0 mb-[8px]">
                © 2024 Payloft. All rights reserved.
              </Text>
              <Text className="text-gray-500 text-[12px] leading-[16px] text-center m-0 mb-[8px]">
                123 Financial District, Cape Town, South Africa
              </Text>
              <Text className="text-gray-500 text-[12px] leading-[16px] text-center m-0">
                <Link href="#" className="text-gray-500 underline mr-[16px]">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-500 underline mr-[16px]">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-500 underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

interface ForgotPasswordEmailProps {
  email: string;
  url: string;
}

export default ForgotPasswordEmail;
