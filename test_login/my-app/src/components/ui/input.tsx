import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-md border bg-transparent px-4 py-2 text-base shadow-xs transition focus:outline-none",
        "focus-visible:border-ring focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
