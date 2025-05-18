"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "motion/react";
import { CheckCircle, XCircle, Shield } from "lucide-react";

interface TwoFactorFormProps {
  email: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export function TwoFactorForm({
  email,
  onCancel,
  onSuccess,
}: TwoFactorFormProps) {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Set up input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, code.length);
  }, [code]);

  // Handle input change
  const handleChange = (value: string, index: number) => {
    if (value.length > 1) {
      // If pasting multiple digits
      const digits = value.split("").slice(0, code.length);
      const newCode = [...code];

      digits.forEach((digit, i) => {
        if (index + i < code.length) {
          newCode[index + i] = digit;
        }
      });

      setCode(newCode);

      // Focus on the next available input or the last input
      const nextIndex = Math.min(index + digits.length, code.length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // For single digit input
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < code.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Focus previous input when backspace is pressed on an empty input
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Navigate left
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < code.length - 1) {
      // Navigate right
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Reset the code
  const resetCode = () => {
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    setIsVerified(null);
  };

  // Handle code verification
  const verifyCode = async () => {
    // Check if code is complete
    if (code.some((digit) => digit === "")) {
      toast.error("Please enter the complete verification code");
      return;
    }

    setIsLoading(true);
    try {
      const fullCode = code.join("");
      console.log("Verifying 2FA code:", fullCode);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, any code with all same digits fails
      const allSameDigits = code.every((digit) => digit === code[0]);

      if (allSameDigits) {
        setIsVerified(false);
        toast.error("Invalid verification code");
        setIsLoading(false);
      } else {
        // Show success animation before redirecting
        setIsVerified(true);
        toast.success("Successfully verified!");

        // Redirect after a brief delay to show the animation
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Verification failed. Please try again.");
      setIsVerified(false);
      setIsLoading(false);
    }
  };

  // Resend verification code
  const resendCode = async () => {
    setTimeLeft(60);
    toast.success("New verification code sent to your email");
    resetCode();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="space-y-2 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Shield className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-2xl font-bold tracking-tight"
        >
          Two-Factor Authentication
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-gray-600"
        >
          Enter the 6-digit code sent to {email.slice(0, 3)}•••
          {email.slice(email.indexOf("@"))}
        </motion.p>
      </div>

      {/* Input fields */}
      <div className="flex justify-center gap-2 my-8">
        {code.map((digit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            className="relative"
          >
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              disabled={isLoading || isVerified !== null}
              onChange={(e) =>
                handleChange(e.target.value.replace(/[^0-9]/g, ""), index)
              }
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => {
                e.preventDefault();
                const pastedData = e.clipboardData
                  .getData("text/plain")
                  .replace(/[^0-9]/g, "");
                handleChange(pastedData, index);
              }}
              className={`w-12 h-14 text-xl font-bold text-center rounded-xl border-2 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all
                ${
                  isVerified === true
                    ? "border-green-500 bg-green-50"
                    : isVerified === false
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-primary"
                }
              `}
            />

            {/* Animation dots below inputs */}
            <motion.div
              animate={{
                scale: digit ? 1 : 0.5,
                opacity: digit ? 1 : 0.3,
              }}
              className={`mt-1 h-1.5 w-1.5 rounded-full mx-auto ${
                digit ? "bg-primary" : "bg-gray-300"
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Verification status animation */}
      {isVerified !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center mb-4"
        >
          {isVerified ? (
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="text-green-500 flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Verification successful</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="text-red-500 flex items-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              <span>Incorrect code. Try again.</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={verifyCode}
            disabled={
              isLoading || isVerified !== null || code.some((d) => d === "")
            }
            className="w-full h-11 text-base font-medium rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </motion.div>

        <div className="flex justify-between items-center text-sm">
          <button
            onClick={onCancel}
            disabled={isLoading || isVerified === true}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={resendCode}
            disabled={isLoading || timeLeft > 0 || isVerified === true}
            className={`text-primary hover:text-primary/80 transition-colors ${
              timeLeft > 0 || isVerified === true
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {timeLeft > 0 ? `Resend code (${timeLeft}s)` : "Resend code"}
          </button>
        </div>
      </div>

      {isVerified === false && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={resetCode}
          className="w-full text-center text-sm text-primary font-medium"
        >
          Try again
        </motion.button>
      )}
    </motion.div>
  );
}
