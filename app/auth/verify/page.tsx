"use client";

import { useSearchParams } from "next/navigation";
import { VerificationSuccess } from "@/components/auth/verification-success";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";

export default function VerifyPage() {
  return (
    <section className="w-full min-h-screen py-12 bg-[url('/images/auth_bg.svg')] bg-cover bg-center flex items-center justify-center">
      <Card className="w-full max-w-xl shadow-lg border-primary/10 overflow-hidden">
        <CardContent className="p-0">
          <Suspense
            fallback={
              <div className="w-full min-h-screen flex items-center justify-center">
                Loading verification...
              </div>
            }
          >
            <VerifyPageContent />
          </Suspense>
        </CardContent>
      </Card>
    </section>
  );
}

function VerifyPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const name = searchParams.get("name");

  return (
    <VerificationSuccess email={email || undefined} name={name || undefined} />
  );
}
