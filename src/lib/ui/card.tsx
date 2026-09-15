import * as React from "react"

import { cn } from "@/src/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-2xl border",
        className
      )}
      {...props}
    />
  )
}

export { Card }
