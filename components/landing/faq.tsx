"use client";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    head: "How do I connect my GitHub account to RankForge?",
    body: "Simply sign up or log in and follow the prompts to securely connect your GitHub account. We use GitHub authentication to track your public contributions.",
  },
  {
    head: "Is my contribution data private?",
    body: "Yes, RankForge only tracks your public GitHub activity and does not access your private repositories or sensitive data. You control your profile visibility.",
  },
  {
    head: "How does the scoring system work?",
    body: "Each commit, pull request, and issue you make earns you points. The more you contribute, the higher your score and rank on the leaderboard.",
  },
  {
    head: "How often is the leaderboard updated?",
    body: "The leaderboard updates in real time as new contributions are detected from your connected GitHub account.",
  },
  {
    head: "Can I earn badges or achievements?",
    body: "Yes! As you reach certain milestones or complete challenges, you'll unlock badges and achievements to showcase on your profile.",
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setOpenItem((prev) => (prev === index ? null : index));
  };
  return (
    <div className="w-10/12 mx-auto mb-20">
      <section className="flex flex-col items-start justify-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-left mb-6">
          Frequently Asked Questions
        </h2>
      </section>
      <div className="flex flex-col gap-5 h-full w-full">
        {faqs.map((faq, index) => (
          <span
            key={index}
            className={`bg-[#18181b] px-4 rounded-xl border-t-[2px] border-[#1717171F] flex justify-between py-3 md:py-8 w-full cursor-pointer relative overflow-hidden border-collapse transition-all duration-300 ${
              openItem === index ? "h-[200px]" : "md:h-[100px] xl:h-[90px]"
            } ${index === faqs.length - 1 ? "border-b-[2px]" : ""}`}
            onClick={() => handleToggle(index)}
          >
            <span className="text-left w-11/12 space-y-3">
              <h3 className="font-semibold text-[16px] md:text-[18px] xl:text-[24px] ">
                {faq.head}
              </h3>
              {openItem === index ? (
                <p className="text-[16px]">{faq.body}</p>
              ) : (
                ""
              )}
            </span>
            <span className=" self-start flex items-center absolute right-5 top-2 md:top-6">
              <PlusCircleIcon
                className={`${
                  openItem === index
                    ? "rotate-45 text-gray-400"
                    : "text-[#DAFF01] "
                }  transition-all duration-300 w-8 h-8 md:w-10 md:h-10`}
              />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
