import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import authAvatar from "@/public/images/auth_avatar.png";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <section className="w-full md:py-34 py-12 bg-[url('/images/auth_bg.svg')] bg-cover bg-center">
      <div className="flex justify-center items-center px-4">
        <Card className="w-full max-w-md bg-background shadow-none border-primary/10">
          <CardHeader>
            <Image
              src={authAvatar}
              alt="auth avatar"
              placeholder="blur"
              className="mx-auto w-32 h-32"
            />
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="w-full min-h-screen flex items-center justify-center">
                  Loading...
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
