"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { clsx } from "clsx";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={clsx(
      // Base styles
      "peer h-5 w-5 shrink-0",
      "rounded-md border",
      "transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Unchecked state
      "border-white/20 bg-black/40",
      "hover:border-white/30 hover:bg-black/60",
      // Checked state
      "data-[state=checked]:border-red-500 data-[state=checked]:bg-red-600",
      "data-[state=checked]:hover:bg-red-500",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={clsx("flex items-center justify-center text-white")}
    >
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
