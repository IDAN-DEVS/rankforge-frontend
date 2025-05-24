"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Social media icons
  const SocialIcon = ({
    children,
    href,
    label,
  }: {
    children: React.ReactNode;
    href: string;
    label: string;
  }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-secondary/50 hover:text-white transition-colors duration-300"
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );

  return (
    <footer className="border-t bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-2xl font-bold">
                <span className="text-primary">Rank</span>Forge
              </h2>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              A contributor platform for devs that gamifies open-source
              contributions. Create your profile, log contributions, and get
              evaluated by admins to earn your rank.
            </p>

            {/* Social Media */}
            <div className="flex space-x-3">
              <SocialIcon href="https://twitter.com" label="Twitter">
                <Twitter />
              </SocialIcon>
              <SocialIcon href="https://github.com" label="GitHub">
                <Github />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <Linkedin />
              </SocialIcon>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/leaderboard"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/guidelines"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contribution Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-600 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} RankForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
