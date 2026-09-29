import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export const metadata = {
  title: "The Grand Arcadia",
  description:
    "Explore the elegant rooms and suites at Grand Arcadia, thoughtfully designed with modern comforts, refined interiors, and everything you need for a relaxing stay.",
};

export default function Home() {
  return (
    <>
      {/* 1. Fullscreen background layer behind everything */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={bg}
          fill
          placeholder="blur"
          quality={80}
          priority
          className="object-cover object-top"
          alt="Mountains and forests with two cabins"
        />
      </div>

      {/* 2. Main content positioned over the background */}
      <main className="mt-24 text-center">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl text-primary-50 mb-20 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/rooms"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury rooms
        </Link>
      </main>
    </>
  );
}
