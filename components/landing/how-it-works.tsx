"use client";
import { motion } from "motion/react";

// Animated variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// Step component
const ProcessStep = ({
  number,
  title,
  description,
  index,
}: {
  number: number;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className={`
        p-10 relative group hover:bg-secondary/15 transition-colors duration-300
        ${index % 2 === 0 ? "border-r border-gray-700" : ""}
        ${index < 2 ? "border-b border-gray-700" : ""}
      `}
    >
      {/* Number circle */}
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl mb-6">
        {number}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default function HowItWorks() {
  // Process steps data
  const steps = [
    {
      number: 1,
      title: "Create Your Profile",
      description:
        "Sign up and create your contributor profile with your skills, experience, and interests.",
    },
    {
      number: 2,
      title: "Submit Contributions",
      description:
        "Log your open-source contributions through our simple submission form, providing all relevant details and links.",
    },
    {
      number: 3,
      title: "Get Evaluated",
      description:
        "Admins review your submissions and provide detailed scores across multiple criteria, along with feedback.",
    },
    {
      number: 4,
      title: "Climb the Ranks",
      description:
        "As your contributions accumulate and scores improve, you'll rise through the ranks on our global leaderboard.",
    },
  ];

  return (
    <section className="py-20 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="w-full max-w-3xl px-6 mb-16 text-center mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-text-gray mb-4 text-md bg-primary-100/50 py-1 px-4 rounded-full w-fit mx-auto border border-secondary/20">
            Process
          </p>
          <h2 className="font-bold text-3xl md:text-5xl mb-4">
            How RankForge Works
          </h2>
          <p className="text-sm md:text-base mb-6 text-gray-600">
            Follow these simple steps to start contributing and climbing the
            ranks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 relative max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <ProcessStep
              key={idx}
              index={idx}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
