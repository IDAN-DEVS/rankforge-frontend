import { SignupForm } from "@/components/auth/signup-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import authAvatar from "@/public/images/auth_avatar.png";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <section className="w-full md:py-34 bg-[url('/images/auth_bg.svg')] bg-cover bg-center">
      <div className="flex justify-center items-center px-4">
        <Card className="w-full max-w-md">
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
              fallback={<div className="text-center py-4">Loading form...</div>}
            >
              <SignupForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
