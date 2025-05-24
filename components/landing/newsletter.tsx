"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "../ui/button";

// Animated variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatus("error");
      return;
    }

    // This would normally connect to an API
    // Simulating success for demo purposes
    setStatus("success");
    setEmail("");

    // Reset status after 3 seconds
    setTimeout(() => {
      setStatus("idle");
    }, 3000);
  };

  return (
    <section className="py-20 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-secondary p-8 md:p-12 rounded-2xl border border-gray-700 shadow-sm"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="font-bold text-2xl md:text-3xl mb-4">
                Stay Updated with RankForge
              </h2>
              <p className="text-muted-foreground mb-6">
                Get the latest updates, news, and tips for maximizing your
                contributions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <Button
                  size="lg"
                  type="submit"
                  className="rounded-full font-medium whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>

              {status === "success" && (
                <p className="text-green-600 text-sm text-center">
                  Thanks for subscribing! We&apos;ll be in touch soon.
                </p>
              )}

              {status === "error" && (
                <p className="text-red-600 text-sm text-center">
                  Please enter a valid email address.
                </p>
              )}

              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
