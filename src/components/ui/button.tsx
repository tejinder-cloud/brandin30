import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

// shadcn/ui Button, tuned for BrandIn30: pill shape, phone-sized tap targets,
// and an "ink" variant for use on the saffron sections.
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-saffron-soft",
        ink: "bg-ink text-cream hover:bg-[#262626]",
        outline: "border border-input bg-transparent text-foreground hover:border-cream",
        "outline-ink": "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-cream",
        ghost: "text-foreground hover:bg-secondary",
      },
      size: {
        default: "h-11 px-5 text-[15px]",
        lg: "h-12 px-6 text-[16px]",
        xl: "h-14 px-7 text-[17px]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
