"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import UserProfileCard from "@/components/profile/profile-card";
import { contributors } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// Helper to get total contributions count from array
const getContributionsCount = (
  contributionsArr: Array<{ score?: number }>
): number =>
  Array.isArray(contributionsArr)
    ? contributionsArr.reduce((sum, c) => sum + (c.score || 0), 0)
    : 0;

export default function Contributors() {
  const [search, setSearch] = useState("");
  // Responsive carousel page size
  const [carouselPageSize, setCarouselPageSize] = useState(2);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Responsive: 1 card on small screens, 2 on md+
  useEffect(() => {
    function handleResize() {
      setCarouselPageSize(window.innerWidth < 768 ? 1 : 2);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredContributors = contributors.filter((u) =>
    u.fullName.toLowerCase().includes(search.toLowerCase())
  );
  // Carousel logic
  const maxIdx = Math.max(0, filteredContributors.length - carouselPageSize);
  const handlePrev = () => setCarouselIdx((idx) => Math.max(0, idx - 1));
  const handleNext = () => setCarouselIdx((idx) => Math.min(maxIdx, idx + 1));
  const visibleContributors = filteredContributors.slice(
    carouselIdx,
    carouselIdx + carouselPageSize
  );

  // Auto-advance carousel
  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCarouselIdx((idx) => (idx >= maxIdx ? 0 : idx + 1));
    }, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [maxIdx, carouselPageSize, filteredContributors.length]);

  // Pause on hover/focus
  function pauseAutoPlay() {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  }
  function resumeAutoPlay() {
    autoPlayRef.current = setInterval(() => {
      setCarouselIdx((idx) => (idx >= maxIdx ? 0 : idx + 1));
    }, 4000);
  }

  return (
    <>
      <div className="mt-40 w-full min-h-screen flex flex-col items-center justify-center gap-16 inter mb-20 ">
        <section className=" max-w-xl flex-1 flex flex-col gap-7 items-center text-center ">
          <h1 className=" text-6xl font-bold text-[#ebebeb]">Contributors</h1>
          <p className="text-lg text-gray-400">
            See contributor profiles and search for specific contributors.
          </p>
          {/* Search Bar */}
          <div className="w-10/12 md:w-5xl flex justify-center mt-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users by name..."
                className="w-full px-5 py-3 rounded-full bg-[#232336] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DAFF01] shadow-lg text-lg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <MagnifyingGlassIcon className="w-6 h-6 text-[#DAFF01]" />
              </span>
            </div>
          </div>
        </section>
        {/* Slanted Marquee */}

        <div className="relative h-[70vh] -z-10 w-full overflow-hidden py-6 -top-32">
          <div className="z-10 absolute top-0 left-0 w-full h-full bg-[#111113]/50" />
          <div className="absolute top-[80%] flex gap-6 items-center animate-marquee rotate-[10deg]">
            {contributors.slice(0, 10).map((user, i) => (
              <div key={user.fullName + "-" + i}>
                <UserProfileCard
                  avatarUrl={user.avatarUrl}
                  name={user.fullName}
                  email={user.email}
                  contributions={getContributionsCount(user.contributions)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Trending Users Carousel */}
        <div className="w-10/12 mx-auto -mt-32">
          <section className="flex flex-col items-start justify-center mb-6">
            <h2 className="text-4xl md:text-5xl font-semibold text-left mb-2">
              Trending Contributors
            </h2>
            <p className="text-left text-md text-gray-400">
              See the top contributors to the repository. These are the users
              with the most contributions in recent time.
            </p>
          </section>
          <div
            className="relative flex items-center justify-center w-11/12 mx-auto "
            ref={carouselRef}
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
            onFocus={pauseAutoPlay}
            onBlur={resumeAutoPlay}
          >
            <Button
              onClick={handlePrev}
              disabled={carouselIdx === 0}
              aria-label="Previous"
              className="absolute left-10 md:left-[-3.5rem] top-1/2 -translate-y-1 z-10 disabled:opacity-40"
            >
              <ChevronLeftIcon className="w-7 h-7" />
            </Button>
            <div className="flex gap-6 w-full justify-center transition-all duration-500">
              {visibleContributors.map(function (user, i) {
                const accentColor =
                  user.totalScore > 100 ? "#7F4A8E" : "#DAFF01";
                return (
                  <div
                    key={user.fullName + "-carousel-" + i}
                    className="w-full md:max-w-md "
                  >
                    <div className=" flex h-56 flex-row bg-[#18181b] rounded-2xl shadow-lg p-4">
                      <div className="p-6 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {user.fullName}
                        </h3>
                        <p className="text-gray-400">{user.email}</p>
                        {typeof user.contributions === "number" && (
                          <div
                            className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full text-black font-semibold text-sm mb-4 border-2 w-fit"
                            style={{
                              background: accentColor,
                              borderColor: accentColor,
                            }}
                          >
                            <TrophyIcon className="w-4 h-4" />
                            {user.totalScore} contrs
                          </div>
                        )}
                      </div>

                      <div className="flex-1 bg-[#DAFF01] flex items-center justify-center relative rounded-xl overflow-hidden w-40 h-full">
                        <Image
                          src={user.avatarUrl}
                          alt={user.fullName}
                          className="w-full h-full object-cover rounded-xl"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button
              onClick={handleNext}
              disabled={carouselIdx >= maxIdx}
              aria-label="Next"
              className="absolute right-10 md:right-[-3.5rem] top-1/2 -translate-y-1 z-10 disabled:opacity-40"
            >
              <ChevronRightIcon className="w-7 h-7" />
            </Button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 48s linear infinite;
          will-change: transform;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
