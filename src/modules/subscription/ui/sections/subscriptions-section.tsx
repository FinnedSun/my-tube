"use client"

import { InfiniteScroll } from "@/components/infinite-scroll"
import { DEFAULT_LIMIT } from "@/constants"
import { trpc } from "@/trpc/client"
import Link from "next/link"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { toast } from "sonner"
import { SubscriptionItem } from "../components/subscription-item"


export const SubscriptionsSection = () => {
  return (
    <Suspense fallback={<SubscriptionsSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <SubscriptionsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  )
}
const SubscriptionsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 18 }).map((_, i) => (
        <SubscriptionsSkeleton key={i} />
      ))}
    </div>
  )
}

const SubscriptionsSectionSuspense = () => {
  const utils = trpc.useUtils()
  const [subscriptions, query] = trpc.subscriptions.getMany.useSuspenseInfiniteQuery({
    limit: DEFAULT_LIMIT
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  const unsubscribe = trpc.subscriptions.remove.useMutation({
    onSuccess: (data) => {
      toast.success("Unsubscribed")
      utils.subscriptions.getMany.invalidate()
      utils.videos.getManySubscriptions.invalidate()
      utils.users.getOne.invalidate({ id: data.creatorId })
    },
    onError: (error) => {
      if (error.data?.code === "BAD_REQUEST") {
        toast.error("You cannot unsubscribed to yourself")
      } else {
        toast.error("Something went wrong")
      }
    }
  })

  return (
    <>
      <div className="flex flex-col gap-4">
        {subscriptions.pages
          .flatMap((page) => page.items)
          .map((subscription) => (
            <Link key={subscription.creatorId} href={`/users/${subscription.user.id}`}>
              <SubscriptionItem
                name={subscription.user.name}
                imageUrl={subscription.user.imageUrl}
                subscriberCount={subscription.user.subscriberCount}
                onUnsubscribe={() => {
                  unsubscribe.mutate({
                    userId: subscription.creatorId
                  })
                }}
                disabled={unsubscribe.isPending}
              />
            </Link>
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