"use client";

import { useState, useEffect } from "react";
import { MainNav } from "./main-nav";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change or window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl">
          <span className="text-primary">Rank</span>Forge
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <MainNav />

          <div className="ml-6 flex items-center space-x-3">
            <Button
              size="sm"
              variant="secondary"
              className="py-3 text-center text-white rounded-full px-6"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>

            <Button
              size="sm"
              className="py-3 px-6 text-center text-white rounded-full"
            >
              <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1.5 p-2 rounded-md z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-foreground block transition-all"
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-foreground block transition-all"
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-foreground block transition-all"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 top-0 z-40 bg-background backdrop-blur pt-20 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 text-lg relative z-10">
              <Link
                href="/"
                className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/leaderboard"
                className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                href="/dashboard"
                className="py-2 border-b border-gray-100 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>

              <div className="flex flex-col space-y-3 pt-4">
                <Link
                  href="/auth/login"
                  className="w-full py-3 border border-gray-200 text-center rounded-full hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>

                <Button size="sm" className="py-3 text-center rounded-full">
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
