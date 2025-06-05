/* eslint-disable @next/next/no-img-element */
import { RadioIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../ui/button";
import { Github01Icon } from "hugeicons-react";

export default function Signup() {
  return (
    <div className="w-full h-screen flex items-center justify-between p-4">
      <section className="w-full md:w-1/2 h-full flex items-center justify-start px-4 md:px-16">
        <div className="h-2/3 w-sm flex flex-col gap-10 mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <span className="text-xl font-semibold font-mono">
              <RadioIcon className="w-6 h-6 text-[#DAFF01]" />
            </span>
            <span className="text-xl font-semibold font-mono hover:cursor-pointer hover:text-[#DAFF01] transition-all">
              <Link href="/">RankForge</Link>
            </span>
          </div>
          <div className="space-y-3 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-semibold text-[#ebebeb]">
              Hello,
              <br />
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Continue to RankForge with your Github account to start tracking
              your contributions.
            </p>
          </div>
          <section>
            <div className="flex flex-col items-center gap-2 w-full mb-5">
              <span
                className="w-full text-gray-400 bg-[#18181b] rounded-lg px-4 py-2 flex items-center gap-2 justify-center"
                aria-disabled={true}
              >
                Continue with Github{" "}
                <Github01Icon className="w-7 h-7 text-white" />
              </span>
              <Button className="w-full">Sign Up With Github</Button>
            </div>
          </section>
        </div>
      </section>
      <section className="w-1/2 h-full hidden md:flex items-center justify-center rounded-xl overflow-hidden">
        <img
          src="/images/auth.png"
          alt="auth"
          className="w-full h-full object-cover"
        />
      </section>
    </div>
  );
}
