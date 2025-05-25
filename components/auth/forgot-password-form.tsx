"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, ArrowLeft, Mail, Key, Send } from "lucide-react";

// Step 1: Email verification schema
const emailSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

// Step 2: Code verification schema
const codeSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Verification code must be 6 characters" })
    .max(6, { message: "Verification code must be 6 characters" }),
});

// Step 3: New password schema
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmailValues = z.infer<typeof emailSchema>;
type CodeValues = z.infer<typeof codeSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

export function ForgotPasswordForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Email form
  const emailForm = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Code form
  const codeForm = useForm<CodeValues>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmitEmail(data: EmailValues) {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setEmail(data.email);
      toast.success("Verification code sent to your email");
      setStep(2);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmitCode(data: CodeValues) {
    setIsLoading(true);
    try {
      console.log("Verifying code:", data.code);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Code verified successfully");
      setStep(3);
    } catch (error) {
      console.error(error);
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmitPassword(data: PasswordValues) {
    setIsLoading(true);
    try {
      console.log(
        "Resetting password for:",
        email,
        "with new password:",
        data.password.replace(/./g, "*")
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Password reset successfully");
      setStep(4);
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="relative mb-8">
        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex flex-col items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= 1
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              animate={{
                scale: step === 1 ? 1.1 : 1,
                backgroundColor: step >= 1 ? "var(--primary)" : "#f3f4f6",
              }}
            >
              <Mail size={16} />
            </motion.div>
            <span className="text-xs mt-1">Email</span>
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= 2
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              animate={{
                scale: step === 2 ? 1.1 : 1,
                backgroundColor: step >= 2 ? "var(--primary)" : "#f3f4f6",
              }}
            >
              <Send size={16} />
            </motion.div>
            <span className="text-xs mt-1">Verify</span>
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= 3
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              animate={{
                scale: step === 3 ? 1.1 : 1,
                backgroundColor: step >= 3 ? "var(--primary)" : "#f3f4f6",
              }}
            >
              <Key size={16} />
            </motion.div>
            <span className="text-xs mt-1">Reset</span>
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= 4
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              animate={{
                scale: step === 4 ? 1.1 : 1,
                backgroundColor: step >= 4 ? "var(--primary)" : "#f3f4f6",
              }}
            >
              <CheckCircle size={16} />
            </motion.div>
            <span className="text-xs mt-1">Done</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="email-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                Reset Password
              </h1>
              <p className="text-gray-600">
                Enter your email to receive a verification code
              </p>
            </div>

            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                className="space-y-4 mt-6"
              >
                <FormField
                  control={emailForm.control}
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
                    {isLoading ? "Sending code..." : "Send verification code"}
                  </Button>
                </motion.div>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft size={16} /> Back to login
              </Link>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="code-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight">Verify Code</h1>
              <p className="text-gray-600">
                Enter the 6-digit code sent to {email}
              </p>
            </div>

            <Form {...codeForm}>
              <form
                onSubmit={codeForm.handleSubmit(onSubmitCode)}
                className="space-y-4 mt-6"
              >
                <FormField
                  control={codeForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Verification Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="123456"
                          maxLength={6}
                          {...field}
                          className="rounded-full h-11 text-center tracking-widest text-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-primary/30"
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
                    {isLoading ? "Verifying..." : "Verify code"}
                  </Button>
                </motion.div>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <button
                onClick={() => setStep(1)}
                className="flex items-center justify-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft size={16} /> Back to previous step
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="password-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                Reset Password
              </h1>
              <p className="text-gray-600">Create a new secure password</p>
            </div>

            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                className="space-y-4 mt-6"
              >
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        New Password
                      </FormLabel>
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

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Confirm Password
                      </FormLabel>
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
                    {isLoading ? "Resetting password..." : "Reset password"}
                  </Button>
                </motion.div>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <button
                onClick={() => setStep(2)}
                className="flex items-center justify-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft size={16} /> Back to previous step
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="success-step"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.1,
              }}
              className="mx-auto mb-6 relative"
            >
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle size={48} className="text-green-600" />
              </div>

              {/* Animated circles around the check */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-green-200"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  scale: 1.2,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: 0.3,
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-green-100"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  scale: 1.4,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: 0.5,
                }}
              />
            </motion.div>

            <h1 className="text-2xl font-bold mb-2">
              Password Reset Successful!
            </h1>
            <p className="text-gray-600 mb-8">
              Your password has been reset successfully. You can now sign in
              with your new password.
            </p>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/auth/login"
                className="inline-flex py-2.5 px-8 font-medium rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
              >
                Return to login
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
