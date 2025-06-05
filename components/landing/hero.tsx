/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const Hero: React.FC = () => {
  return (
    <div className="pt-52 w-full min-h-screen max-h-[130vh] flex flex-col items-center justify-center gap-16 inter mb-30 overflow-hidden relative">
      <section className="mt-40 max-w-xl flex-1 flex flex-col gap-7 items-center text-center">
        <h1 className=" text-6xl font-bold text-[#ebebeb]">
          Shine the spotlight on{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#DAFF01]">your work</span>
            <img
              src="/images/swipe.png"
              alt="underline"
              className="absolute -left-2 right-0 -bottom-4 w-full h-[0.5em] z-0"
            />
          </span>
        </h1>
        <p className="text-lg text-gray-400">
          Bring your contributions to the forefront with RankForge
        </p>
        <Button size="lg">
          <Link href="/auth/signup">Get Started</Link>
        </Button>
      </section>
      <section className="px-10">
        <img
          src="/images/dashboard.png"
          alt="hero"
          className="w-7xl h-full hover:scale-[101%] transition-all duration-300 ease-in-out hover:drop-shadow-[0_8px_20px_rgba(45,32,51,0.7)] hover:cursor-pointer rounded-xl dashboard-img"
        />
      </section>
    </div>
  );
};

export default Hero;
