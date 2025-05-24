"use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   signupSchema,
//   type SignupValues,
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
import Link from "next/link";
// import { toast } from "sonner";
// import { useRouter, useSearchParams } from "next/navigation";
// import { RoleTabs } from "./role-tabs";
import { GithubButton } from "./github-button";
import { motion } from "motion/react";

export function SignupForm() {
  // const searchParams = useSearchParams();
  // const defaultRole = (searchParams.get("role") as UserRole) || "contributor";

  // const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  // const form = useForm<SignupValues>({
  //   resolver: zodResolver(signupSchema),
  //   defaultValues: {
  //     name: "",
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

  // async function onSubmit(data: SignupValues) {
  //   setIsLoading(true);

  //   try {
  //     console.log("Form data:", data);
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     toast.success("Account created successfully!");
  //     clearForm();

  //     // Redirect to verification page with user info
  //     router.push(
  //       `/auth/verify?email=${encodeURIComponent(
  //         data.email
  //       )}&name=${encodeURIComponent(data.name)}`
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="space-y-2 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl font-bold tracking-tight"
        >
          Join RankForge
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-gray-600"
        >
          Create your account to start tracking your contributions
        </motion.p>
      </div>

      <div className="space-y-4">
        <GithubButton variant="signup" selectedRole="contributor" />

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Joseph Coder"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="joseph@example.com"
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
                <FormLabel className="text-gray-700">Password</FormLabel>
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
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </motion.div>
        </form>
      </Form> */}
    </motion.div>
  );
}
