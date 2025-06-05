import SignupForm from "@/components/auth/signup-form";

import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense
      fallback={<div className="text-center py-4">Loading form...</div>}
    >
      <SignupForm />
    </Suspense>
  );
}
