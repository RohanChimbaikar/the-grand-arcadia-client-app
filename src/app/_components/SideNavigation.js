"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-primary-900 pb-3 lg:border-b-0 lg:border-r lg:pb-0">
      <ul className="flex flex-wrap items-center gap-1 text-sm sm:text-base lg:h-full lg:flex-col lg:items-stretch lg:gap-2 lg:text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`flex items-center gap-2 px-3 py-2 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 lg:gap-4 lg:px-5 lg:py-3 ${link.href === pathname ? "bg-primary-900" : ""}`}
              href={link.href}
            >
              {link.icon}
              <span className="whitespace-nowrap">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="lg:mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
