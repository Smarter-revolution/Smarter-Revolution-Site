"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { clsx } from "clsx";

// Root Select component
const Select = SelectPrimitive.Root;

// Select Group
const SelectGroup = SelectPrimitive.Group;

// Select Value
const SelectValue = SelectPrimitive.Value;

// Select Trigger
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    error?: boolean;
  }
>(({ className, children, error, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={clsx(
      // Base styles
      "flex w-full items-center justify-between gap-2",
      "rounded-xl border px-4 py-3",
      "text-sm text-left",
      "transition-all duration-200",
      "focus:outline-none focus:ring-1",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Dark theme styles
      "bg-black/40 backdrop-blur-sm",
      "placeholder:text-gray-500",
      // Border and focus states
      error
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
        : "border-white/10 hover:border-white/20 focus:border-red-500/60 focus:ring-red-500/60",
      // Text color
      "text-white data-[placeholder]:text-gray-500",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <svg
        className="h-4 w-4 text-gray-400 transition-transform duration-200 data-[state=open]:rotate-180"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// Select Scroll Up Button
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={clsx(
      "flex cursor-default items-center justify-center py-1",
      "text-gray-400",
      className
    )}
    {...props}
  >
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

// Select Scroll Down Button
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={clsx(
      "flex cursor-default items-center justify-center py-1",
      "text-gray-400",
      className
    )}
    {...props}
  >
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

// Select Content
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={clsx(
        // Base styles
        "relative z-50 min-w-[8rem] overflow-hidden",
        "rounded-xl border border-white/10",
        "bg-gray-900/95 backdrop-blur-xl",
        "shadow-2xl shadow-black/50",
        // Animations
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        // Position styles
        position === "popper" && [
          "data-[side=bottom]:translate-y-1",
          "data-[side=left]:-translate-x-1",
          "data-[side=right]:translate-x-1",
          "data-[side=top]:-translate-y-1",
        ],
        className
      )}
      position={position}
      {...props}
    >
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={clsx(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

// Select Label
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={clsx(
      "py-1.5 pl-3 pr-2 text-xs font-semibold uppercase tracking-wider text-gray-500",
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

// Select Item
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={clsx(
      // Base styles
      "relative flex w-full cursor-pointer select-none items-center gap-2",
      "rounded-lg py-2.5 pl-3 pr-8",
      "text-sm outline-none",
      "transition-colors duration-150",
      // States
      "text-gray-300",
      "focus:bg-white/5 focus:text-white",
      "data-[highlighted]:bg-white/5 data-[highlighted]:text-white",
      "data-[state=checked]:bg-red-500/10 data-[state=checked]:text-red-400",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    {/* Selection indicator */}
    <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <svg
          className="h-4 w-4 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// Select Separator
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={clsx("-mx-1 my-1 h-px bg-white/10", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
