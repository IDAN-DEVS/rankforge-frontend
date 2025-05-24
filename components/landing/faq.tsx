"use client";
import { useState } from "react";
import { motion } from "motion/react";
import FAQCard from "../faq-card";
import { FAQs } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function FAQSection() {
  const [isOpen, setIsOpen] = useState<number>(-1);

  const handleOpen = (id: number) => {
    setIsOpen(isOpen === id ? -1 : id);
  };

  return (
    <section className="py-12 w-full">
      <motion.div
        className="flex w-full max-w-7xl mx-auto justify-center flex-col items-center mb-32"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="w-full max-w-3xl px-6 mb-12 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-text-gray mb-4 text-md bg-primary-100/50 py-1 px-4 rounded-full w-fit mx-auto border border-secondary/20">
            FAQ&apos;s
          </p>
          <h2 className="font-bold text-3xl md:text-5xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base mb-6 text-gray-600">
            Have questions? We&apos;ve got answers.
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-4xl px-6 border-t border-gray-700"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FAQs.map(
            (faq: { question: string; answer: string }, idx: number) => (
              <FAQCard
                key={idx}
                id={idx}
                isOpen={isOpen}
                onclick={handleOpen}
                question={faq.question}
                answer={faq.answer}
              />
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
