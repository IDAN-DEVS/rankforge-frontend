"use client";
import { motion } from "motion/react";
import { SOLUTIONS } from "@/lib/constants";

// Animated variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// Grid item component
const SolutionCard = ({
  title,
  description,
  index,
}: {
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
        p-10 relative group hover:bg-gray-50 transition-colors duration-300
        ${index % 2 === 0 ? "border-r border-gray-200" : ""}
        ${index < 2 ? "border-b border-gray-200" : ""}
      `}
    >
      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <div className="w-12 h-0.5 bg-primary mb-6"></div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default function Solutions() {
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
            Solutions
          </p>
          <h2 className="font-bold text-3xl md:text-5xl mb-4">
            Our Platform Offerings
          </h2>
          <p className="text-sm md:text-base mb-6 text-gray-600">
            Explore the variety of tools and services we provide for
            contributors and admins.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 relative max-w-6xl mx-auto">
          {SOLUTIONS.map((solution, idx) => (
            <SolutionCard
              key={idx}
              index={idx}
              title={solution.title}
              description={solution.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
