import { DisplayResetPasswordForm } from "@/components/auth/DisplayResetPasswordForm";
import { redirect } from "next/navigation";

interface SearchParams {
  searchParams: Promise<{ token?: string }>;
}

const Page = async ({ searchParams }: SearchParams) => {
  const { token } = await searchParams;
  if (!token) {
    redirect("/auth/forgot-password");
  }

  return <DisplayResetPasswordForm token={token} />;
};

export default Page;