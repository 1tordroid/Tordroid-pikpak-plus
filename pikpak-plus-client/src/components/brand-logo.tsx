import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "lg";
  className?: string;
  // "plain" is the public-page lockup: 28px icon, solid ink name at every
  // width (styled by app/(public)/td-public.css). "brand" is the app header.
  tone?: "brand" | "plain";
}

export function BrandLogo({
  size = "sm",
  className,
  tone = "brand",
}: Readonly<BrandLogoProps>) {
  const plain = tone === "plain";
  const iconSize = plain ? 28 : size === "lg" ? 56 : 40;

  return (
    <div
      className={cn("flex items-center gap-2.5", className)}
      data-brand-tone={tone}
    >
      <Image
        src="/tordroid-plus-icon.svg"
        alt="Tordroid Plus"
        width={iconSize}
        height={iconSize}
        className="shrink-0"
        priority
      />
      <span
        data-brand-name=""
        className={
          plain
            ? undefined
            : cn(
                "font-bold tracking-tight bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent",
                size === "lg"
                  ? "text-3xl sm:text-4xl"
                  : "hidden sm:inline text-2xl",
              )
        }
      >
        Tordroid Plus
      </span>
    </div>
  );
}
