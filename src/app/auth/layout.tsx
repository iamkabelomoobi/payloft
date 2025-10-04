import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Payloft",
  description: "",
  keywords: "",
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="grid min-h-svh lg:grid-cols-2">
    <div className="relative hidden lg:block rounded-xl overflow-hidden ml-8 mt-12 mb-12">
      <Image
        src={"/background/auth/auth-background.jpg"}
        alt="Login Image"
        fill
        className="object-cover dark:brightness-[0.2] dark:grayscale"
        priority
      />
      <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
        <div className="flex flex-col-reverse">
          {/* <Image
            src="/images/logo/logo-black.png"
            alt="Invo Flow Logo"
            width={220}
            height={40}
            className="h-auto"
            priority
          /> */}
        </div>
        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Get
            <br />
            Everything
            <br />
            You Want
          </h2>
          <p className="mt-6 max-w-sm">
            You can get everything you want if you work hard, trust the process,
            and stick to the plan.
          </p>
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-between p-6 md:p-10">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
