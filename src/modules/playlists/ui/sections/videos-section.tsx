"use client"

import { InfiniteScroll } from "@/components/infinite-scroll"
import { DEFAULT_LIMIT } from "@/constants"
import { VideoGridCard, VideoGridCardSkeletion } from "@/modules/videos/ui/component/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/component/video-row-card"
import { trpc } from "@/trpc/client"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { toast } from "sonner"

interface VideosSectionProps {
  playlistId: string
}

export const VideosSection = (props: VideosSectionProps) => {
  return (
    <Suspense fallback={<VideosSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <VideosSectionSuspense {...props} />
      </ErrorBoundary>
    </Suspense>
  )
}
const VideosSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <VideoGridCardSkeletion key={i} />
        ))}
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        {Array.from({ length: 18 }).map((_, i) => (
          <VideoRowCardSkeleton key={i} size={"compact"} />
        ))}
      </div>
    </div>
  )
}

const VideosSectionSuspense = ({
  playlistId,
}: VideosSectionProps) => {
  const utlis = trpc.useUtils()
  const [videos, query] = trpc.playlists.getVideos.useSuspenseInfiniteQuery({
    limit: DEFAULT_LIMIT,
    playlistId
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  const removeVideo = trpc.playlists.removeVideo.useMutation({
    onSuccess: (data) => {
      toast.success("Video remove from playlist")
      utlis.playlists.getMany.invalidate()
      utlis.playlists.getManyForVideo.invalidate({
        videoId: data.videoId,
      })
      utlis.playlists.getOne.invalidate({ id: data.playlistId })
      utlis.playlists.getVideos.invalidate({ playlistId: data.playlistId })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <>
      <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {videos.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoGridCard
              key={video.id}
              data={video}
              onRemove={() => removeVideo.mutate({ playlistId, videoId: video.id })}
            />
          ))
        }
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        {videos.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoRowCard
              key={video.id}
              data={video}
              size={"compact"}
              onRemove={() => removeVideo.mutate({ playlistId, videoId: video.id })}
            />
          ))
        }
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </>
  )
}