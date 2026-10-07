"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const filters = [
  { value: "all", label: "All Rooms" },
  { value: "small", label: "1 \u2014 3 Guests" },
  { value: "medium", label: "4 \u2014 7 Guests" },
  { value: "large", label: "8 \u2014 12 Guests" },
];

function Filter() {
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get("capacity") || "all";

  return (
    <div className="border border-primary-800 flex">
      {filters.map((filter) => {
        return (
          <Link
            key={filter.value}
            href={
              filter === "all" ? "/rooms" : `/rooms?capacity=${filter.value}`
            }
            className={`px-5 py-2 hover:bg-primary-700 ${
              currentFilter === filter.value
                ? "bg-primary-700 text-accent-50 font-semibold"
                : ""
            }`}
            scroll={false}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}

// function Filter() {
//   function handleFilter(filter) {
//     console.log(filter);
//   }

//   return (
//     <div className="border border-primary-800 flex">
//       <button
//         className="px-5 py-2 hover:bg-accent-700"
//         onClick={() => handleFilter("all")}
//       >
//         All rooms
//       </button>
//       <button
//         className="px-5 py-2 hover:bg-accent-700"
//         onClick={() => handleFilter("small")}
//       >
//         1 &mdash; 3 guests
//       </button>
//       <button
//         className="px-5 py-2 hover:bg-accent-700"
//         onClick={() => handleFilter("medium")}
//       >
//         4 &mdash; 7 guests
//       </button>
//       <button
//         className="px-5 py-2 hover:bg-accent-700"
//         onClick={() => handleFilter("large")}
//       >
//         8 &mdash; 12 guests{" "}
//       </button>
//     </div>
//   );
// }

export default Filter;
