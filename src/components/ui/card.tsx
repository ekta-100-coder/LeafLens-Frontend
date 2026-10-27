import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl border border-gray-200 bg-white shadow-sm",
        className,
      )}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn("flex flex-col gap-1.5 p-5 sm:p-6", className)}
    />
  );
}

export function CardTitle({ className, ...props }: CardProps) {
  return (
    <h3
      {...props}
      className={cn(
        "text-base font-semibold tracking-tight text-gray-900",
        className,
      )}
    />
  );
}

export function CardDescription({ className, ...props }: CardProps) {
  return (
    <p
      {...props}
      className={cn("text-sm leading-6 text-gray-500", className)}
    />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn("px-5 pb-5 sm:px-6 sm:pb-6", className)}
    />
  );
}

export function CardFooter({ className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center gap-3 border-t border-gray-100 px-5 py-4 sm:px-6",
        className,
      )}
    />
  );
}