"use client";

import Link from "next/link";
import { useState } from "react";
import HaloLoader from "@/components/HaloLoader";

export default function Home() {
  const [showCta, setShowCta] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <HaloLoader
        text="misk0"
        runOnce
        onComplete={() => {
          setTimeout(() => setShowCta(true), 500);
        }}
      />

      {showCta && (
        <div className="pointer-events-auto absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 text-sm sm:flex-row">
          <p className="text-zinc-300">
            Try live demo at{" "}
            <Link
              href="/demo"
              className="underline underline-offset-2 font-medium"
            >
              /demo
            </Link>
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Open demo
          </Link>
        </div>
      )}
    </div>
  );
}
