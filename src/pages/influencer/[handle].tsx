import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import { influencers } from "@/shared/mockData";

const Map = dynamic(() => import("@/shared/Map"), { ssr: false });

export default function InfluencerPage() {
  const router = useRouter();
  const { handle } = router.query as { handle?: string };

  const influencer = useMemo(() => {
    if (!handle) return undefined;
    return influencers.find((i) => i.handle === handle);
  }, [handle]);

  if (!handle) return null;
  if (!influencer) {
    return (
      <div className="p-6">
        <p className="text-lg">Influencer not found.</p>
        <Link href="/">Go home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{influencer.name}</h1>
          <p className="text-gray-600">@{influencer.handle}</p>
        </div>
        <Link className="text-blue-600 underline" href="/">
          Home
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 h-[70vh]">
          <Map locations={influencer.locations} />
        </div>
        <aside className="space-y-3">
          <h2 className="text-xl font-medium">Reels</h2>
          <ul className="space-y-2">
            {influencer.locations.map((loc) => (
              <li key={loc.id} className="border rounded p-3">
                <div className="font-medium">{loc.name}</div>
                <div className="text-sm text-gray-600">{loc.address}</div>
                {loc.reelUrl && (
                  <a
                    className="text-blue-600 underline text-sm"
                    href={loc.reelUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View reel
                  </a>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}


