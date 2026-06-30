import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "h-8 w-8" }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-[0.55rem] bg-[#0b0707]",
        className,
      )}
    >
      <Image
        src="/brand/presitgious-tech-logo.png"
        alt=""
        fill
        sizes="48px"
        className="object-cover"
        priority
      />
    </span>
  );
}
