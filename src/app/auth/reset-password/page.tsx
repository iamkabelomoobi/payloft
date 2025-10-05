import { DisplayResetPasswordForm } from "@/components/auth/DisplayResetPasswordForm";
import { redirect } from "next/navigation";

interface SearchParams {
  searchParams: { token?: string };
}

const Page = ({ searchParams }: SearchParams) => {
  const token = searchParams?.token;
  if (!token) {
    redirect("/auth/forgot-password");
  }
  return <DisplayResetPasswordForm token={token} />;
};

export default Page;
