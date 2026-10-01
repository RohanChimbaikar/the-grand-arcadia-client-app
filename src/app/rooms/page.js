import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import RoomList from "../_components/RoomList";
import Filter from "../_components/Filter";

export const metadata = {
  title: "Rooms",
};

export const revalidate = 3600;

export default async function Page({ searchParams }) {
  const { capacity: filter = "all" } = await searchParams;

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Rooms
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious rooms, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex mb-8 justify-end">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <RoomList filter={filter} />
      </Suspense>
    </div>
  );
}
