import {
  BellIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  ListBulletIcon,
  TrophyIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

export default function HowItWorks() {
  return (
    <div className="w-10/12 mx-auto mb-30">
      <section className="flex flex-col items-start justify-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-left mb-6">
          How It Works
        </h2>
        <p className="text-left text-md text-gray-400">
          Connect your GitHub account and RankForge automatically tracks your
          public contributions—commits, pull requests, and issues. Earn points
          in real time, climb the leaderboard, and unlock achievements as you
          contribute. See your progress, compare with others, and get recognized
          for your open source impact—all in one place.
        </p>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div className="flex flex-col gap-6">
          {/* Sign Up & Connect Card */}
          <div className=" flex flex-col-reverse h-96 md:h-auto md:flex-row bg-[#18181b] rounded-2xl shadow-lg p-4">
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="mb-4">
                <UserPlusIcon className="w-10 h-10 md:w-14 md:h-14 text-[#DAFF01]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Sign Up & Connect
              </h3>
              <p className="text-gray-400">
                Create your account with your GitHub email.
              </p>
            </div>

            <div className="flex-1 bg-[#DAFF01] flex items-center justify-center relative rounded-xl">
              <div className="absolute -left-4 -bottom-4 opacity-20">
                <UserIcon className="w-28 h-28 text-black" />
              </div>
              <div className="relative flex gap-3 z-10">
                <span className="bg-black text-white px-6 py-2 rounded-lg text-md shadow">
                  test@example.com
                </span>
                <span className="absolute right-0 -top-12 rounded-lg shadow flex items-center bg-white p-2">
                  <UserPlusIcon className="w-6 h-6 text-black" />
                </span>
              </div>
            </div>
          </div>
          {/* Log Contributions Card */}
          <div className="h-96 md:h-auto flex flex-col md:flex-row bg-[#18181b] rounded-2xl overflow-hidden shadow-lg p-4">
            <div className="flex-1 bg-[#DAFF01] flex items-center justify-center relative rounded-xl">
              <div className="absolute -left-2 -bottom-4 opacity-20">
                <ListBulletIcon className="w-28 h-28 text-black" />
              </div>
              <div className="relative flex gap-3 z-10">
                <span className="bg-black text-white px-6 py-2 rounded-lg text-md shadow flex items-center gap-2">
                  <CheckBadgeIcon className="w-6 h-6 text-white" /> Contributed
                </span>
                <span className="absolute w-11/12 h-full -top-4 -z-10 rounded-lg shadow flex items-center bg-white p-2 mx-auto right-1">
                  <span className="w-full h-10/12 bg-gray-500/20 rounded-full"></span>
                </span>
                <span className="absolute w-10/12 h-full -top-8 -z-20 rounded-lg shadow flex items-center bg-gray-500 p-2 mx-auto right-2">
                  <span className="w-full h-10/12 bg-gray-50/20 rounded-full"></span>
                </span>
              </div>
            </div>{" "}
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="mb-4">
                <ListBulletIcon className="w-14 h-14 text-[#DAFF01]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Log Contributions
              </h3>
              <p className="text-gray-400">
                Log code contributions on the repository.
              </p>
            </div>
          </div>
        </div>
        {/* Leaderboard Card */}
        <div className="h-96 md:h-auto flex flex-col-reverse md:flex-row lg:flex-col-reverse bg-[#18181b] rounded-2xl overflow-hidden shadow-lg p-4">
          <div className="w-full md:w-1/2 lg:w-full p-8 flex flex-col justify-center">
            <div className="mb-4">
              <ChartBarIcon className="w-14 h-14 text-[#DAFF01]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Join the Leaderboard
            </h3>
            <p className="text-gray-400">
              Get a place on the public leaderboard with the score from your
              contribution.
            </p>
          </div>

          <div className=" flex-1 bg-[#DAFF01] flex items-center justify-center relative rounded-xl">
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <TrophyIcon className="w-36 h-36 text-black" />
            </div>
            <div className="relative flex gap-3 z-10">
              <span className="absolute -top-2 -right-2 bg-black text-white p-3 rounded-full text-md shadow">
                <BellIcon className="w-10 h-10 text-white" />
              </span>
              <span className="absolute -top-12 left-0 w-30 h-16 rounded-br-lg rounded-tl-lg rounded-tr-lg shadow flex items-center bg-white p-2 text-black font-semibold">
                You moved up 10 places!
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
