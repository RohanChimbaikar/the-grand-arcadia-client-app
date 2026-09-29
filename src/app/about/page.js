import about1 from "@/public/about-1.png";
import about2 from "@/public/about-2.png";
import Image from "next/image";

export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Grand Arcadia
        </h1>

        <div className="space-y-8">
          <p>
            Where timeless elegance meets the art of exceptional hospitality. At
            Grand Arcadia, every stay is designed as an escape from the
            ordinary—a place where refined surroundings, thoughtful details, and
            warm service come together to create something truly memorable.
          </p>

          <p>
            From beautifully appointed rooms and suites to tranquil spaces and
            carefully curated experiences, every element has been created with
            your comfort in mind. Whether you&apos;re here to unwind, explore,
            or simply enjoy a slower pace, Grand Arcadia gives you space to make
            the stay your own.
          </p>

          <p>
            This is more than a place to stay. It is a place to pause,
            reconnect, and appreciate the moments that matter. Welcome to Grand
            Arcadia—a timeless retreat where every stay becomes part of your
            story.
          </p>
        </div>
      </div>

      <div className="col-span-2 relative aspect-square">
        <Image
          src={about1}
          alt="Family sitting around a fire pit in front of cabin"
          className="object-cover"
          fill
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>

      <div className="col-span-2 relative aspect-square">
        <Image
          fill
          src={about2}
          alt="Family that manages The Wild Oasis"
          className="object-cover"
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          A legacy of hospitality since 1962
        </h1>

        <div className="space-y-8">
          <p>
            Since 1962, Grand Arcadia has been devoted to the timeless art of
            hospitality. What began as a vision of creating an exceptional
            retreat has grown into a place where generations of guests have come
            to relax, celebrate, and create memories of their own.
          </p>

          <p>
            Through the years, our commitment has remained unchanged: to
            preserve the character and warmth that define Grand Arcadia while
            continually refining the experience for those who walk through our
            doors. From thoughtful service to beautifully considered spaces,
            every detail is shaped by a tradition of genuine care and quiet
            elegance.
          </p>

          <p>
            Today, Grand Arcadia carries that legacy forward—not simply as a
            hotel, but as a destination where every stay has its own story. We
            invite you to experience a place where heritage meets modern luxury,
            and where hospitality is more than a service—it is a tradition.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury rooms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
