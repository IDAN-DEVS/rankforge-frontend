import {
  ArchiveBoxIcon,
  BoltIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: <TrophyIcon className="w-8 h-8 text-[#7F4A8E]" />,
    title: "Leaderboard for Social Ranking",
    description:
      "Compete with others and see your rank in real time on the global leaderboard.",
  },
  {
    icon: <BoltIcon className="w-8 h-8 text-[#7F4A8E]" />,
    title: "Real-time Scoring",
    description:
      "Your contributions are scored instantly as you push code, open issues, or review PRs.",
  },
  {
    icon: <ArchiveBoxIcon className="w-8 h-8 text-[#7F4A8E]" />,
    title: "Proper Storage of Logs",
    description:
      "All your contribution logs are securely stored and easily accessible for your records.",
  },
];

export default function Features() {
  return (
    <div className="w-10/12 mx-auto mb-30">
      <section className="flex flex-col items-start justify-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-left mb-6">
          Features
        </h2>
        <p className="text-left text-md text-gray-400">
          RankForge automatically tracks your public contributions—commits, pull
          requests, and issues. Earn points in real time, climb the leaderboard,
          and unlock achievements as you contribute. See your progress, compare
          with others, and get recognized for your open source impact—all in one
          place.
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {features.map((feature, i) => (
          <div key={i} className="bg-[#18181b] rounded-2xl shadow-lg p-6">
            <div className="mb-4">{feature.icon}</div>

            <h3 className="text-lg font-bold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-md">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
