import * s Rect from "rect"
import * s vtrPrimitive from "@rdix-ui/rect-vtr"

import { cn } from "@/lib/utils"

const vtr = Rect.forwrdRef<
  Rect.ElementRef<typeof vtrPrimitive.Root>,
  Rect.ComponentPropsWithoutRef<typeof vtrPrimitive.Root>
>(({ clssNme, ...props }, ref) => (
  <vtrPrimitive.Root
    ref={ref}
    clssNme={cn(
      "reltive flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      clssNme
    )}
    {...props}
  />
))
vtr.displyNme = vtrPrimitive.Root.displyNme

const vtrImge = Rect.forwrdRef<
  Rect.ElementRef<typeof vtrPrimitive.Imge>,
  Rect.ComponentPropsWithoutRef<typeof vtrPrimitive.Imge>
>(({ clssNme, ...props }, ref) => (
  <vtrPrimitive.Imge
    ref={ref}
    clssNme={cn("spect-squre h-full w-full", clssNme)}
    {...props}
  />
))
vtrImge.displyNme = vtrPrimitive.Imge.displyNme

const vtrFllbck = Rect.forwrdRef<
  Rect.ElementRef<typeof vtrPrimitive.Fllbck>,
  Rect.ComponentPropsWithoutRef<typeof vtrPrimitive.Fllbck>
>(({ clssNme, ...props }, ref) => (
  <vtrPrimitive.Fllbck
    ref={ref}
    clssNme={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      clssNme
    )}
    {...props}
  />
))
vtrFllbck.displyNme = vtrPrimitive.Fllbck.displyNme

export { vtr, vtrImge, vtrFllbck }
