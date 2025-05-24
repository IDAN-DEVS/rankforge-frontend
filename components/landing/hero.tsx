"use client";
import MacScreen from "@/components/mac-screen";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import heroDashboard from "@/public/images/dashboard.png";
import { Button } from "../ui/button";

// Staggered animation for heading words
const StaggeredText = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  const words = text.split(" ");

  return (
    <h1 className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1 + idx * 0.1,
            ease: [0.215, 0.61, 0.355, 1], // Cubic bezier for a nice bounce effect
          }}
          className="inline-block mr-[0.5rem]"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
};

export default function Hero() {
  return (
    <section
      className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(#7f4a8e5d 1px,transparent 0),linear-gradient(90deg,#7f4a8e5d 1px,transparent 0)`,
        WebkitBackgroundSize: "6rem 6rem",
        backgroundSize: "6rem 6rem",
        backgroundPosition: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <StaggeredText
            text="Contribute. Compete. Climb the Ranks."
            className="text-5xl lg:text-6xl font-['Satoshi_Bold'] mb-6 text-transparent bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl font-medium text-text-primary/70 max-w-[800px] mx-auto mb-8"
          >
            RankForge is a contributor platform for devs that gamifies
            open-source contributions. Create your profile, log contributions,
            and get evaluated by admins to earn your rank.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.8,
              ease: "easeOut",
            }}
          >
            <Button
              size="lg"
              className="hover:bg-primary/80 text-white px-8 py-3 rounded-full font-medium"
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="px-8 py-3 rounded-full cursor-pointer font-medium"
            >
              <Link href="/leaderboard">View Leaderboard</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            ease: [0.215, 0.61, 0.355, 1], // Cubic bezier for a nice bounce effect
          }}
          className="max-w-6xl w-full mx-auto hidden md:block"
        >
          <MacScreen
            isCode={false}
            isWindowFocused={true}
            title="./rankforge/dashboard"
            content={
              <div className="flex items-center justify-center w-full select-none">
                <Image src={heroDashboard} alt="Hero Dashboard" />
              </div>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
