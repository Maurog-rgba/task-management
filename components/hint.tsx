
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

export const Hint = ({ children, description, side = "bottom", sideOffset = 0 }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          {children}
        </TooltipTrigger>
        <TooltipContent className="text-xs max-w-[220px] break-words" side={side} sideOffset={sideOffset}>
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};