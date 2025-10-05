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

const PasswordUpdatedEmail = ({
  email,
  loginUrl,
  supportUrl,
}: PasswordUpdatedEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Your Payloft password has been updated</Preview>
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

            {/* Success Icon */}
            <Section className="text-center mb-[24px]">
              <div className="bg-black text-white w-[64px] h-[64px] rounded-full mx-auto flex items-center justify-center text-[32px]">
                ✓
              </div>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Heading className="text-black text-[24px] font-bold mb-[16px] mt-0 text-center">
                Password Successfully Updated
              </Heading>

              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[16px] mt-0 text-center">
                Your password for <strong>{email}</strong> has been successfully
                updated.
              </Text>

              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[24px] mt-0">
                Your account is now secured with your new password. You can use
                it to access your Payloft account immediately.
              </Text>
            </Section>

            {/* Login Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={loginUrl}
                className="bg-black text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
              >
                Sign In to Your Account
              </Button>
            </Section>

            {/* Suspicious Activity Notice */}
            <Section className="bg-white px-[24px] py-[20px] rounded-[8px] mb-[32px] border border-solid border-black">
              <Text className="text-black text-[14px] leading-[20px] mb-[8px] mt-0 font-semibold">
                Didn&apos;t make this change?
              </Text>
              <Text className="text-gray-700 text-[14px] leading-[20px] mt-0 mb-[12px]">
                If you didn&apos;t update your password, your account may be
                compromised. Please contact our support team immediately.
              </Text>
              <Link
                href={supportUrl}
                className="text-black underline font-semibold text-[14px]"
              >
                Contact Support →
              </Link>
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

interface PasswordUpdatedEmailProps {
  email: string;
  loginUrl: string;
  supportUrl: string;
}

export default PasswordUpdatedEmail;
