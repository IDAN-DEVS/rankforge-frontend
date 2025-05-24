"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { CheckCircle, UserCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface VerificationSuccessProps {
  redirectUrl?: string;
  email?: string;
  name?: string;
}

export function VerificationSuccess({
  redirectUrl = "/dashboard",
  email,
  name,
}: VerificationSuccessProps) {
  const router = useRouter();
  const [confetti, setConfetti] = useState<
    Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      rotation: number;
      delay: number;
    }>
  >([]);

  // Generate random confetti pieces
  useEffect(() => {
    const colors = [
      "#FF6B00", // Orange (Secondary color)
      "#0066FF", // Blue (Primary color)
      "#FFD700", // Gold
      "#FF1493", // Pink
      "#00FF00", // Green
    ];

    const pieces = Array.from({ length: 60 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
    }));

    setConfetti(pieces);

    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push(redirectUrl);
    }, 5000);

    return () => clearTimeout(timer);
  }, [redirectUrl, router]);

  return (
    <div className="relative overflow-hidden">
      {/* Confetti animation */}
      <div className="absolute inset-0 pointer-events-none">
        {confetti.map((piece, index) => (
          <motion.div
            key={index}
            className="absolute rounded-sm"
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              left: `${piece.x}%`,
              top: "-5%",
              rotate: `${piece.rotation}deg`,
            }}
            initial={{ y: "-10vh", opacity: 0 }}
            animate={{
              y: "105vh",
              opacity: [0, 1, 0.8, 0],
              rotate: piece.rotation + 360 * 2,
            }}
            transition={{
              duration: Math.random() * 2 + 4,
              delay: piece.delay,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: Math.random() * 5 + 5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-8 space-y-4"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.1,
          }}
          className="relative w-24 h-24 mx-auto"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        {/* Success message */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-3xl font-bold tracking-tight"
          >
            {name ? `Welcome, ${name}!` : "Verification Complete!"}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="space-y-2"
          >
            <p className="text-lg text-muted-foreground">
              Your account has been successfully verified.
            </p>
            {email && (
              <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                <UserCheck className="w-4 h-4" />
                <span>{email}</span>
              </p>
            )}
          </motion.div>
        </div>

        {/* User stats preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="grid grid-cols-3 gap-4 max-w-md mx-auto"
        >
          <div className="bg-primary/5 p-4 rounded-xl">
            <p className="text-lg font-bold text-primary">0</p>
            <p className="text-xs text-gray-500">Contributions</p>
          </div>
          <div className="bg-primary/5 p-4 rounded-xl">
            <p className="text-lg font-bold text-primary">0</p>
            <p className="text-xs text-gray-500">Rank</p>
          </div>
          <div className="bg-primary/5 p-4 rounded-xl">
            <p className="text-lg font-bold text-primary">0</p>
            <p className="text-xs text-gray-500">Points</p>
          </div>
        </motion.div>

        {/* Redirect message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="text-sm text-muted-foreground"
        >
          You will be redirected to your dashboard in 5 seconds...
        </motion.p>

        {/* Button */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          <Link href={redirectUrl}>
            <Button>Go to Dashboard</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
