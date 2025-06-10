import { TrophyIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
interface UserProfileCardProps {
  avatarUrl?: string;
  name: string;
  email?: string;
  contributions?: number;
  accentColor?: string;
}

export default function UserProfileCard({
  avatarUrl,
  name,
  email,
  contributions,
  accentColor = contributions && contributions > 100 ? "#7F4A8E" : "#DAFF01",
}: UserProfileCardProps) {
  return (
    <div className=" flex h-56 flex-row bg-[#18181b] rounded-2xl shadow-lg p-4">
      <div className="p-6 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
        <p className="text-gray-400">{email}</p>
        {typeof contributions === "number" && (
          <div
            className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full text-black font-semibold text-sm mb-4 border-2 w-fit"
            style={{
              background: accentColor,
              borderColor: accentColor,
            }}
          >
            <TrophyIcon className="w-4 h-4" />
            {contributions} contrs
          </div>
        )}
      </div>

      <div className="flex-1 bg-[#DAFF01] flex items-center justify-center relative rounded-xl overflow-hidden w-40 h-full">
        <Image
          src={avatarUrl as unknown as string}
          alt={name}
          className="w-full h-full object-cover rounded-xl"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
