import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { useState } from "react"

interface VideoDescriptionProps {
  compactView: string
  expendedView: string
  compactDate: string
  expendedDate: string
  description?: string | null
}

export const VideoDescription = ({
  compactView,
  expendedView,
  compactDate,
  expendedDate,
  description,
}: VideoDescriptionProps) => {
  const [isExpended, setIsExpended] = useState(false)
  return (
    <div
      onClick={() => setIsExpended((current) => !current)}
      className="bg-secondary/50 rounded-xl p-3 cursor-pointer hover:bg-secondary/70 transition"
    >
      <div className="flex gap-2 text-sm mb-2">
        <span className="font-medium">
          {isExpended ? expendedView : compactView} views
        </span>
        <span className="font-medium">
          {isExpended ? expendedDate : compactDate}
        </span>
      </div>
      <div className="relative">
        <p className={cn(
          "text-sm  whitespace-pre-wrap",
          !isExpended && "line-clamp-2"
        )}>
          {description || "No description"}
        </p>
        <div className="flex items-center gap-1 mt-4 text-sm font-medium">
          {isExpended ? (
            <>
              Show less <ChevronUpIcon className="size-4" />
            </>
          ) : (
            <>
              Show more <ChevronDownIcon className="size-4" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
