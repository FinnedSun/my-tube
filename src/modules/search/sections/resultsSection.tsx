"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { trpc } from "@/trpc/client"

import { VideoRowCard } from "@/modules/videos/ui/component/video-row-card"
import { VideoGridCard } from "@/modules/videos/ui/component/video-grid-card"
import { InfiniteScroll } from "@/components/infinite-scroll"

interface ResultsSectionProps {
  query: string | undefined
  categoryId: string | undefined
}

export const ResultsSection = ({
  query,
  categoryId,
}: ResultsSectionProps) => {
  const isMobile = useIsMobile()
  const [results, resultsQuery] = trpc.search.getMany.useSuspenseInfiniteQuery({
    query,
    categoryId,
    limit: 10,
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-4 gap-y-10">
          {results.pages
            .flatMap((page) => page.items)
            .map((video) => (
              <VideoGridCard
                key={video.id}
                data={video}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {results.pages
            .flatMap((page) => page.items)
            .map((video) => (
              <VideoRowCard
                key={video.id}
                data={video}
              />
            ))}
        </div>
      )}
      <InfiniteScroll
        hasNextPage={resultsQuery.hasNextPage}
        isFetchingNextPage={resultsQuery.isFetchingNextPage}
        fetchNextPage={resultsQuery.fetchNextPage}
      />
    </>
  )
}
