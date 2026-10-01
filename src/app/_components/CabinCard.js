import { UserGroupIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border border-primary-800 relative">
      {/* Image */}
      <div className="relative w-1/3 min-h-56 shrink-0">
        <Image
          fill
          src={image}
          alt={`Room ${name}`}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover border-r border-primary-800"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1 bg-primary-950 pt-5 pb-4 px-7">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            Room {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UserGroupIcon className="h-5 w-5 text-primary-600" />

            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>

                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}

            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-primary-800 text-right">
          <Link
            href={`/rooms/${id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
