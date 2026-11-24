import * as React from "react"
import { cn } from "@/lib/utils"

// shadcn/ui Input at phone size: 52px tall, 17px text so iOS never zooms on focus.
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-13 w-full min-w-0 rounded-xl border border-input bg-ink px-4 text-[17px] text-foreground transition-colors placeholder:text-[#8c8c84] selection:bg-primary selection:text-primary-foreground hover:border-[#8c8c84] disabled:pointer-events-none disabled:opacity-50",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
