"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"

const Drawer = DrawerPrimitive.Root
const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerClose = DrawerPrimitive.Close
const DrawerPortal = DrawerPrimitive.Portal
const DrawerTitle = DrawerPrimitive.Title
const DrawerDescription = DrawerPrimitive.Description

function DrawerBackdrop({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      className={cn("fixed inset-0 z-40 bg-black/40 backdrop-blur-sm", className)}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  side = "right",
  ...props
}: DrawerPrimitive.Popup.Props & {
  side?: "left" | "right" | "top" | "bottom"
}) {
  const sideClass =
    side === "right"
      ? "inset-y-0 right-0 h-full"
      : side === "left"
        ? "inset-y-0 left-0 h-full"
        : side === "top"
          ? "inset-x-0 top-0 w-full"
          : "inset-x-0 bottom-0 w-full"

  const slide =
    side === "right"
      ? "data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-right-full data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-right-full"
      : side === "left"
        ? "data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-left-full data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-left-full"
        : side === "top"
          ? "data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-full data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-top-full"
          : "data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-full data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-full"

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Popup
        className={cn(
          "fixed z-50 flex flex-col bg-background shadow-xl ring-1 ring-foreground/10 w-80",
          sideClass,
          slide,
          className
        )}
        {...props}
      />
    </DrawerPrimitive.Portal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1 p-4", className)} {...props} />
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-auto flex flex-col gap-2 border-t border-border/40 p-4", className)} {...props} />
  )
}

function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex-1 overflow-y-auto p-4", className)} {...props} />
}

export {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}
