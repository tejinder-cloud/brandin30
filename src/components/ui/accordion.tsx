"use client"

// shadcn/ui Accordion, drawn as a chat: the question is one bubble, the answer replies in saffron.

import * as React from "react"
import { PlusIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn(className)} {...props} />
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex min-h-14 flex-1 cursor-pointer items-center justify-between gap-4 rounded-[20px] rounded-bl-[4px] border border-border bg-field px-5 py-3.5 text-left text-[17px] font-medium transition-colors hover:border-foreground data-[state=open]:border-foreground [&[data-state=open]>svg]:rotate-45",
          className
        )}
        {...props}
      >
        {children}
        <PlusIcon className="pointer-events-none size-5 shrink-0 text-saffron-deep transition-transform duration-200 ease-out" aria-hidden="true" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("mt-2 ml-6 rounded-[20px] rounded-br-[4px] bg-saffron px-5 py-4 text-ink sm:ml-12", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
