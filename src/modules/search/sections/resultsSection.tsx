"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { trpc } from "@/trpc/client"

import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/component/video-row-card"
import { VideoGridCard, VideoGridCardSkeletion } from "@/modules/videos/ui/component/video-grid-card"
import { InfiniteScroll } from "@/components/infinite-scroll"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface ResultsSectionProps {
  query: string | undefined
  categoryId: string | undefined
}

export const ResultsSection = ({
  query,
  categoryId,
}: ResultsSectionProps) => {
  return (
    <Suspense
      key={`${query}-${categoryId}`}
      fallback={<ResultsSectionSkeleton />}
    >
      <ErrorBoundary fallback={<p>Error...</p>}>
        <ResultsSectionSuspense
          query={query}
          categoryId={categoryId}
        />
      </ErrorBoundary>
    </Suspense>
  )
}

const ResultsSectionSkeleton = () => {
  return (
    <div>
      <div className="hidden flex-col gap-4 md:flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <VideoRowCardSkeleton key={i} />
        ))}
      </div>
      <div className="flex flex-col gap-4 p-4 gap-y-10 pt-6 md:hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <VideoGridCardSkeletion key={i} />
        ))}
      </div>
    </div>
  )
}

const ResultsSectionSuspense = ({
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
