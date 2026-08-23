import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[opacity,transform,background-color,color] duration-150 ease-[var(--ease-out)] disabled:pointer-events-none disabled:opacity-40 min-h-11 px-4",
  {
    variants: {
      variant: {
        primary: "bg-paper text-ink hover:opacity-90 active:scale-[0.98]",
        ghost:
          "bg-transparent text-fg border border-border hover:bg-bg-elevated active:scale-[0.98]",
        paper: "bg-paper text-ink hover:bg-paper-deep active:scale-[0.98]",
        official: "bg-official text-official-fg hover:opacity-90 active:scale-[0.98]",
        stamp: "bg-stamp text-stamp-fg hover:opacity-90 active:scale-[0.98]",
      },
      size: {
        md: "min-h-11 px-4",
        sm: "min-h-10 px-3 text-sm",
        lg: "min-h-12 px-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
