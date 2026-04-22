"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed z-20 top-18 md:top-13 left-0 pl-5 py-2 flex w-full backdrop-blur-3xl items-center gap-2 text-sm md:text-base font-medium text-gray-600 hover:text-black transition cursor-pointer"
    >
      ← Retour
    </button>
  );
}