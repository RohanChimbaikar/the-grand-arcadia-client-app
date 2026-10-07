import {
  ArrowRightIcon,
  CalendarDaysIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  format,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
  startOfToday,
} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../_lib/auth";
import { getBookings } from "../_lib/data-service";

export const metadata = {
  title: "Home",
};

function isValidDate(value) {
  return typeof value === "string" && !Number.isNaN(parseISO(value).getTime());
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);
  const today = startOfToday();
  const validBookings = bookings.filter(
    (booking) => isValidDate(booking.startDate) && isValidDate(booking.endDate),
  );
  const upcomingBookings = validBookings
    .filter((booking) => {
      const checkIn = parseISO(booking.startDate);
      return isSameDay(checkIn, today) || isAfter(checkIn, today);
    })
    .sort((first, second) => {
      return (
        parseISO(first.startDate).getTime() -
        parseISO(second.startDate).getTime()
      );
    });
  const completedStays = validBookings.filter((booking) =>
    isBefore(parseISO(booking.endDate), today),
  ).length;
  const nextStay = upcomingBookings[0];
  const guestName = session?.user?.name?.trim();
  const room = Array.isArray(nextStay?.cabins)
    ? nextStay.cabins[0]
    : nextStay?.cabins;
  const roomName = room?.name;
  const hasRoomImage = typeof room?.image === "string" && room.image.length > 0;

  return (
    <div className="space-y-12 pb-8">
      <header className="border-b border-primary-800 pb-7">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary-400">
          Your private guest account
        </p>
        <h1 className="text-3xl font-normal tracking-tight text-accent-300 sm:text-4xl">
          {guestName ? `Welcome back, ${guestName}` : "Welcome back"}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-primary-200 sm:text-lg">
          {nextStay
            ? "We look forward to welcoming you to Grand Arcadia."
            : "Your next escape awaits."}
        </p>
      </header>

      {nextStay ? (
        <section aria-labelledby="next-stay-heading">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-accent-500" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              Your next stay
            </p>
          </div>

          <div className="grid overflow-hidden border border-primary-800 bg-primary-900/40 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.82fr)]">
            <div className="flex min-w-0 flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2
                    id="next-stay-heading"
                    className="text-2xl font-normal text-primary-50 sm:text-3xl"
                  >
                    {roomName ? `Room ${roomName}` : "Your Grand Arcadia stay"}
                  </h2>
                  <p className="mt-2 text-primary-300">
                    {nextStay.numberOfNights}{" "}
                    {nextStay.numberOfNights === 1 ? "night" : "nights"}
                    {typeof nextStay.numberOfGuests === "number" &&
                      ` · ${nextStay.numberOfGuests} ${
                        nextStay.numberOfGuests === 1 ? "guest" : "guests"
                      }`}
                  </p>
                </div>
                {nextStay.status && (
                  <span className="border border-accent-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-300">
                    {nextStay.status}
                  </span>
                )}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-5 border-y border-primary-800 py-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary-400">
                    Check-in
                  </p>
                  <p className="mt-2 text-base text-primary-100">
                    {format(parseISO(nextStay.startDate), "EEE, MMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary-400">
                    Check-out
                  </p>
                  <p className="mt-2 text-base text-primary-100">
                    {format(parseISO(nextStay.endDate), "EEE, MMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-6">
                {typeof nextStay.totalPrice === "number" &&
                  Number.isFinite(nextStay.totalPrice) && (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary-400">
                        Stay total
                      </p>
                      <p className="mt-1 text-xl text-accent-300">
                        {formatPrice(nextStay.totalPrice)}
                      </p>
                    </div>
                  )}
                <Link
                  href="/account/reservations"
                  className="inline-flex items-center gap-2 bg-accent-500 px-5 py-3 font-semibold text-primary-950 transition-colors hover:bg-accent-400"
                >
                  View reservation
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-56 bg-primary-950 md:min-h-full">
              {hasRoomImage ? (
                <Image
                  src={room.image}
                  alt={roomName ? `Room ${roomName}` : "Grand Arcadia room"}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full min-h-56 items-center justify-center border-t border-primary-800 px-6 text-center text-sm text-primary-400 md:border-l md:border-t-0">
                  Room image unavailable
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section
          aria-labelledby="empty-stay-heading"
          className="border border-primary-800 bg-primary-900/40 px-6 py-10 sm:px-10 sm:py-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
            A little time away
          </p>
          <h2
            id="empty-stay-heading"
            className="mt-4 text-3xl font-normal text-primary-50 sm:text-4xl"
          >
            Your next stay awaits
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-primary-200">
            Find a quieter pace in the Dolomites. Discover a room that feels
            like your own private retreat at Grand Arcadia.
          </p>
          <Link
            href="/rooms"
            className="mt-7 inline-flex items-center gap-2 border border-accent-500 px-5 py-3 font-semibold text-accent-300 transition-colors hover:bg-accent-500 hover:text-primary-950"
          >
            Explore rooms
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </section>
      )}

      <section aria-labelledby="account-summary-heading">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2
            id="account-summary-heading"
            className="text-xl font-normal text-primary-100"
          >
            Your stays
          </h2>
          <Link
            href="/account/reservations"
            className="text-sm text-primary-300 transition-colors hover:text-accent-300"
          >
            View all reservations <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 border-y border-primary-800 sm:max-w-xl">
          <div className="py-5 pr-6">
            <p className="text-3xl font-normal text-accent-300">
              {upcomingBookings.length}
            </p>
            <p className="mt-1 text-sm text-primary-300">Upcoming stays</p>
          </div>
          <div className="border-l border-primary-800 py-5 pl-6">
            <p className="text-3xl font-normal text-accent-300">
              {completedStays}
            </p>
            <p className="mt-1 text-sm text-primary-300">Completed stays</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="quick-actions-heading">
        <h2
          id="quick-actions-heading"
          className="mb-5 text-xl font-normal text-primary-100"
        >
          At your service
        </h2>
        <div className="grid gap-x-8 gap-y-4 border-y border-primary-800 sm:grid-cols-3">
          <Link
            href="/account/reservations"
            className="group flex items-center justify-between gap-3 py-4 text-primary-200 transition-colors hover:text-accent-300"
          >
            <span className="flex items-center gap-3">
              <CalendarDaysIcon className="h-5 w-5 text-primary-400" />
              View reservations
            </span>
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/account/profile"
            className="group flex items-center justify-between gap-3 py-4 text-primary-200 transition-colors hover:text-accent-300"
          >
            <span className="flex items-center gap-3">
              <UserIcon className="h-5 w-5 text-primary-400" />
              Guest profile
            </span>
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/rooms"
            className="group flex items-center justify-between gap-3 py-4 text-primary-200 transition-colors hover:text-accent-300"
          >
            <span>Explore rooms</span>
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="discover-heading"
        className="border-t border-primary-800 pt-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
          The Grand Arcadia
        </p>
        <h2
          id="discover-heading"
          className="mt-3 text-2xl font-normal text-accent-300"
        >
          Discover a place to unwind
        </h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <Link
            href="/rooms"
            className="group border-b border-primary-800 pb-5 transition-colors hover:border-accent-500"
          >
            <span className="text-lg text-primary-100 transition-colors group-hover:text-accent-300">
              Rooms &amp; suites
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-primary-300">
              Explore thoughtfully appointed rooms in the heart of the
              Dolomites.
            </span>
          </Link>
          <Link
            href="/about"
            className="group border-b border-primary-800 pb-5 transition-colors hover:border-accent-500"
          >
            <span className="text-lg text-primary-100 transition-colors group-hover:text-accent-300">
              Our story
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-primary-300">
              Learn about the hospitality and heritage behind Grand Arcadia.
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
