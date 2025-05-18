"use client";
import { motion } from "motion/react";
import Link from "next/link";

// Animated variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function CallToAction() {
  return (
    <section className="py-20 w-full bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="w-full max-w-3xl px-6 mb-12 text-center mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-bold text-3xl md:text-5xl mb-6">
            Ready to Join RankForge?
          </h2>
          <p className="text-sm md:text-lg mb-10 text-white/80">
            Choose your path and start your journey today. Whether you&apos;re
            contributing or evaluating, RankForge has the tools you need.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-8 justify-center max-w-5xl mx-auto px-4"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* For Contributors */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20 flex-1 flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-4">For Contributors</h3>
            <p className="mb-6 text-white/80 flex-grow">
              Create your profile, submit your contributions, and track your
              progress as you climb the ranks. Showcase your skills and get
              recognized for your work.
            </p>
            <div className="mt-auto">
              <Link
                href="/auth/signup?role=contributor"
                className="block w-full bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-full font-medium transition-colors duration-300 text-center"
              >
                Join as Contributor
              </Link>
            </div>
          </motion.div>

          {/* For Admins */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20 flex-1 flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-4">For Admins</h3>
            <p className="mb-6 text-white/80 flex-grow">
              Evaluate contributions, provide feedback, and help maintain the
              quality of submissions. Create a fair and transparent evaluation
              system for your project.
            </p>
            <div className="mt-auto">
              <Link
                href="/auth/signup?role=admin"
                className="block w-full bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-full font-medium transition-colors duration-300 text-center"
              >
                Join as Admin
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
