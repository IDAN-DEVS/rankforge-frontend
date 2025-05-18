"use client";
import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

// Animated variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// Animated counter component
const AnimatedCounter = ({
  value,
  label,
  index,
  duration = 1500,
}: {
  value: number;
  label: string;
  index: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const counterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the component is in view and we haven't started counting yet
        if (entries[0].isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(counterRef.current);
      }
    };
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      // Calculate progress (0 to 1)
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Use easing for smoother animation
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutQuart(progress);

      // Calculate current count
      const currentCount = Math.floor(easedProgress * value);
      setCount(currentCount);

      // Continue animation until complete
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(value); // Ensure we end exactly at the target value
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={counterRef}
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
      <div className="text-4xl md:text-5xl font-bold mb-4 text-primary relative">
        <motion.span
          key={count}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          {count}
        </motion.span>
        <span className="text-primary">+</span>
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </motion.div>
  );
};

export default function Stats() {
  const stats = [
    { value: 1500, label: "Contributors" },
    { value: 8700, label: "Contributions" },
    { value: 350, label: "Active Projects" },
    { value: 95, label: "Success Rate" },
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
            By The Numbers
          </p>
          <h2 className="font-bold text-3xl md:text-5xl mb-4">
            Growing Community
          </h2>
          <p className="text-sm md:text-base mb-6 text-gray-600">
            Join thousands of developers who are already tracking their
            contributions and improving their skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 relative max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <AnimatedCounter
              key={idx}
              index={idx}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
