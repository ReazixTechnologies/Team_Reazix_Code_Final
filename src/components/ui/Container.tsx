import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

/** Max-width wrapper with responsive gutters: 20px mobile / 40px tablet / 64px desktop. */
export function Container({ as: Tag = "div", className, children, ...props }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-page px-5 sm:px-10 lg:px-16", className)} {...props}>
      {children}
    </Tag>
  );
}
