import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo-gold.svg";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        alt="Grand Arcadia logo"
        priority
        className="w-37.5 h-auto"
        quality={100}
      />
    </Link>
  );
}

export default Logo;
