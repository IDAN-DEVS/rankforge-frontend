import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[16px] text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-primary to-[#bfc900] text-black shadow-[0_6px_0_0_#f8ff7a,0_2px_8px_0_rgba(248,255,122,0.25)] relative overflow-hidden transition-all duration-150 ease-in-out hover:brightness-90 hover:shadow-[0_4px_0_0_#f8ff7a,0_1px_6px_0_rgba(248,255,122,0.2)] active:brightness-100 active:translate-y-1 active:shadow-[0_2px_0_0_#f8ff7a,0_1px_4px_0_rgba(248,255,122,0.18)] focus:brightness-100 focus:translate-y-1 focus:shadow-[0_2px_0_0_#f8ff7a,0_1px_4px_0_rgba(248,255,122,0.18)] transition-all duration-300 transform-gpu",
        destructive:
          "bg-gradient-to-b from-destructive to-destructive/80 text-white shadow-[0_6px_0_0_#ef4444,0_2px_8px_0_rgba(239,68,68,0.25)] relative overflow-hidden transition-all duration-150 ease-in-out hover:brightness-90 hover:shadow-[0_4px_0_0_#ef4444,0_1px_6px_0_rgba(239,68,68,0.2)] active:brightness-100 active:translate-y-1 active:shadow-[0_2px_0_0_#ef4444,0_1px_4px_0_rgba(239,68,68,0.18)] focus:brightness-100 focus:translate-y-1 focus:shadow-[0_2px_0_0_#ef4444,0_1px_4px_0_rgba(239,68,68,0.18)]",
        outline:
          "border-2 bg-background text-foreground shadow-[0_6px_0_0_#e2e8f0,0_2px_8px_0_rgba(226,232,240,0.25)] relative overflow-hidden transition-all duration-150 ease-in-out hover:brightness-90 hover:shadow-[0_4px_0_0_#e2e8f0,0_1px_6px_0_rgba(226,232,240,0.2)] active:brightness-100 active:translate-y-1 active:shadow-[0_2px_0_0_#e2e8f0,0_1px_4px_0_rgba(226,232,240,0.18)] focus:brightness-100 focus:translate-y-1 focus:shadow-[0_2px_0_0_#e2e8f0,0_1px_4px_0_rgba(226,232,240,0.18)]",
        secondary:
          "bg-gradient-to-b from-secondary to-secondary/80 text-secondary-foreground shadow-[0_6px_0_0_#475569,0_2px_8px_0_rgba(71,85,105,0.25)] relative overflow-hidden transition-all duration-150 ease-in-out hover:brightness-90 hover:shadow-[0_4px_0_0_#475569,0_1px_6px_0_rgba(71,85,105,0.2)] active:brightness-100 active:translate-y-1 active:shadow-[0_2px_0_0_#475569,0_1px_4px_0_rgba(71,85,105,0.18)] focus:brightness-100 focus:translate-y-1 focus:shadow-[0_2px_0_0_#475569,0_1px_4px_0_rgba(71,85,105,0.18)]",
        ghost:
          "bg-transparent text-foreground hover:bg-accent/10 shadow-[0_6px_0_0_transparent] relative overflow-hidden transition-all duration-150 ease-in-out hover:shadow-[0_4px_0_0_transparent] active:translate-y-1 active:shadow-[0_2px_0_0_transparent] focus:translate-y-1 focus:shadow-[0_2px_0_0_transparent]",
        link: "bg-transparent text-primary underline-offset-4 hover:underline shadow-[0_6px_0_0_transparent] relative overflow-hidden transition-all duration-150 ease-in-out hover:shadow-[0_4px_0_0_transparent] active:translate-y-1 active:shadow-[0_2px_0_0_transparent] focus:translate-y-1 focus:shadow-[0_2px_0_0_transparent]",
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
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        "relative select-none"
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };

// import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"
// import { cva, type VariantProps } from "class-variance-authority"

// import { cn } from "@/lib/utils"

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
//         outline:
//           "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
//         secondary:
//           "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
//         ghost:
//           "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-9 px-4 py-2 has-[>svg]:px-3",
//         sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
//         lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
//         icon: "size-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

// function Button({
//   className,
//   variant,
//   size,
//   asChild = false,
//   ...props
// }: React.ComponentProps<"button"> &
//   VariantProps<typeof buttonVariants> & {
//     asChild?: boolean
//   }) {
//   const Comp = asChild ? Slot : "button"

//   return (
//     <Comp
//       data-slot="button"
//       className={cn(buttonVariants({ variant, size, className }))}
//       {...props}
//     />
//   )
// }

// export { Button, buttonVariants }
