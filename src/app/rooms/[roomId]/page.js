import { getCabin, getCabins } from "../../_lib/data-service";

import Reservation from "../../_components/Reservation";
import { Suspense } from "react";
import Spinner from "../../_components/Spinner";
import Room from "../../_components/Room";

export async function generateMetadata({ params }) {
  const { roomId } = await params;
  const { name } = await getCabin(roomId);

  return {
    title: `${name}`,
  };
}

export async function generateStaticParams() {
  const rooms = await getCabins();
  const ids = rooms.map((room) => ({
    roomId: String(room.id),
  }));

  return ids;
}

export default async function Page({ params }) {
  const { roomId } = await params;
  const room = await getCabin(roomId);

  const { name } = room;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Room room={room} />
      <div>
        <h2 className="text-5xl mb-10 font-semibold text-center">
          Reserve <span className="text-accent-500"> {name}</span> today. Pay on
          arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation room={room} />
        </Suspense>
      </div>
    </div>
  );
}
