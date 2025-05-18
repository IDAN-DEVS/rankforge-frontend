"use client";
import { motion } from "motion/react";
import { TESTIMONIALS } from "@/lib/constants";
import Image from "next/image";

// Animated variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// For the quote icon
const QuoteIcon = () => (
  <svg
    className="w-10 h-10 text-primary/20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

// Testimonial card component
const TestimonialCard = ({
  testimonial,
  name,
  role,
  index,
}: // avatar,
{
  testimonial: string;
  name: string;
  role: string;
  index: number;
  avatar: string;
}) => {
  // Fallback image for avatars
  const fallbackAvatar = "/images/auth_avatar.png";

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
        ${index < TESTIMONIALS.length - 2 ? "border-b border-gray-200" : ""}
      `}
    >
      <QuoteIcon />
      <p className="text-gray-600 my-6">{testimonial}</p>
      <div className="flex items-center mt-8">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={fallbackAvatar}
            alt={name}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold group-hover:text-primary transition-colors duration-300">
            {name}
          </h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Testimonials() {
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
            Testimonials
          </p>
          <h2 className="font-bold text-3xl md:text-5xl mb-4">
            What Our Users Say
          </h2>
          <p className="text-sm md:text-base mb-6 text-gray-600">
            Discover how RankForge has helped contributors and admins improve
            their open-source experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 relative max-w-6xl mx-auto">
          {TESTIMONIALS.map((testimonial, idx) => (
            <TestimonialCard
              key={idx}
              index={idx}
              testimonial={testimonial.testimonial}
              name={testimonial.name}
              role={testimonial.role}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
