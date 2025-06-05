import * as React from "react";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[16px] text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-[#DAFF01] to-[#bfc900] text-black shadow-[0_6px_0_0_#f8ff7a,0_2px_8px_0_rgba(248,255,122,0.25)] relative overflow-hidden active:translate-y-1 active:shadow-[0_2px_0_0_#f8ff7a,0_1px_4px_0_rgba(248,255,122,0.18)] hover:translate-y-1 hover:shadow-[0_2px_0_0_#f8ff7a,0_1px_4px_0_rgba(248,255,122,0.18)]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-white/10 text-[#DAFF01] border border-[#DAFF01] shadow-none hover:bg-[#DAFF01]/10 hover:text-[#bfc900]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4 text-base",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-sm",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6 text-lg",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  const Comp = "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        "relative select-none"
      )}
      {...props}
    >
      {/* Glossy overlay for primary button */}
      {variant === undefined || variant === "default" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 w-full h-full rounded-[16px] overflow-hidden"
        >
          <span
            className="absolute left-0 top-0 w-full h-2/3 rounded-t-[16px] bg-white/20"
            style={{ filter: "blur(1px)" }}
          />
        </span>
      ) : null}
      <span className="relative z-10">{children}</span>
    </Comp>
  );
}

export { Button, buttonVariants };
