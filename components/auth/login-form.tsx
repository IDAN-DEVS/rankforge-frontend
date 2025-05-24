"use client";

import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   loginSchema,
//   type LoginValues,
//   UserRole,
// } from "@/lib/validations/auth";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { toast } from "sonner";
// import { useRouter, useSearchParams } from "next/navigation";
// import { RoleTabs } from "./role-tabs";
import { GithubButton } from "./github-button";
import { motion } from "motion/react";
// import { TwoFactorForm } from "./two-factor-form";

export function LoginForm() {
  // const searchParams = useSearchParams();
  // const defaultRole = (searchParams.get("role") as UserRole) || "contributor";

  // const [isLoading, setIsLoading] = useState(false);
  // const [showTwoFactor, setShowTwoFactor] = useState(false);
  // const [userEmail, setUserEmail] = useState("");
  // const router = useRouter();

  // const form = useForm<LoginValues>({
  //   resolver: zodResolver(loginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //     role: defaultRole,
  //   },
  // });

  // Update role when form value changes
  // const role = form.watch("role");

  // const clearForm = () => {
  //   form.reset();
  // };

  // Update form value when role tab is clicked
  // const handleRoleChange = (newRole: UserRole) => {
  //   form.setValue("role", newRole);
  // };

  // Set initial role from URL parameter
  // useEffect(() => {
  //   if (defaultRole) {
  //     form.setValue("role", defaultRole);
  //   }
  // }, [defaultRole, form]);

  // async function onSubmit(data: LoginValues) {
  //   setIsLoading(true);
  //   try {
  //     console.log("Form data:", data);
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // Store the email for 2FA
  //     setUserEmail(data.email);

  //     // For demo purposes, show 2FA for specific test accounts
  //     // In a real app, this would be determined by the user settings in the backend
  //     const requiresTwoFactor =
  //       data.email.includes("@example.com") ||
  //       data.email.includes("@gmail.com");

  //     if (requiresTwoFactor) {
  //       toast.success("First step verified! Please complete 2FA.");
  //       setShowTwoFactor(true);
  //     } else {
  //       toast.success("Logged in successfully!");
  //       clearForm();
  //       router.push("/dashboard");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Invalid credentials. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // Handle 2FA cancellation

  // const handleTwoFactorCancel = () => {
  //   setShowTwoFactor(false);
  //   clearForm();
  // };

  // Handle successful 2FA
  // const handleTwoFactorSuccess = () => {
  //   clearForm();
  //   router.push("/dashboard");
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="space-y-2 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl font-bold tracking-tight"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-muted-foreground"
        >
          Sign in to continue to your dashboard
        </motion.p>
      </div>

      <div className="space-y-6">
        <GithubButton variant="signin" selectedRole="contributor" />

        <div className="w-full border-t border-gray-200 pt-6">
          <span className="px-2 text-center block text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
      {/* <AnimatePresence mode="wait">
        {showTwoFactor ? (
          <motion.div
            key="two-factor"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="py"
          >
            <TwoFactorForm
              email={userEmail}
              onCancel={handleTwoFactorCancel}
              onSuccess={handleTwoFactorSuccess}
            />
          </motion.div>
        ) : (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2 text-center">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-3xl font-bold tracking-tight"
              >
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-gray-600"
              >
                Sign in to continue to your dashboard
              </motion.p>
            </div>

            <div className="space-y-4">
              <GithubButton variant="signin" selectedRole={role} />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with email
                  </span>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <RoleTabs
                        selectedRole={field.value}
                        onRoleChange={handleRoleChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                          className="rounded-full h-11 bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-primary/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-gray-700">
                          Password
                        </FormLabel>
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className="rounded-full h-11 bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-primary/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-11 text-base font-medium rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </motion.div>
              </form>
            </Form>

            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>  */}
    </motion.div>
  );
}
