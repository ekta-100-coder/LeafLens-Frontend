import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlantImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  sizes?: string;
}

export function PlantImage({
  src,
  alt,
  className,
  fallbackClassName,
}: PlantImageProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-emerald-50 text-emerald-700",
          fallbackClassName,
          className,
        )}
      >
        <Leaf className="size-8" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-100",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="size-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}