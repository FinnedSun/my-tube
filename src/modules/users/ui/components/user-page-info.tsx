import { UserAvatar } from "@/components/user-avatar"
import { UserGetOneOutput } from "../../types"
import { useClerk } from "@clerk/nextjs"
import { useAuth } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SubscriptionButton } from "@/modules/subscription/ui/components/subscription-button"
import { useSubscription } from "@/modules/subscription/hooks/use-subscription"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface UserPageInfoProps {
  user: UserGetOneOutput
}

export const UserPageInfoSeleton = () => {
  return (
    <div className="py-6">
      {/* Mobile layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <Skeleton className="size-[60px] rounded-full" />
          <div className="flex-1 min-w-0">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-48 h-4 mt-1" />
          </div>
        </div>
        <Skeleton className="h-10 w-full mt-3 rounded-full" />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-start gap-4">
        <Skeleton className="size-[160px] rounded-full" />
        <div className="flex-1 min-w-0">
          <Skeleton className="w-64 h-8" />
          <Skeleton className="w-48 h-5 mt-4" />
          <Skeleton className="h-10 w-32 mt-3 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export const UserPageInfo = ({
  user
}: UserPageInfoProps) => {
  const { userId, isLoaded } = useAuth()
  const clerk = useClerk()

  const { isPending, onClick } = useSubscription({
    userId: user.id,
    isSubscribed: user.viewerSubscribed,
  })
  return (
    <div className="py-6">
      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <UserAvatar
            imageUrl={user.imageUrl}
            name={user.name}
            size="lg"
            className="size-[60px]"
            onClick={() => {
              if (user.clerkId === userId) {
                clerk.openUserProfile()
              }
            }}
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>{user.subsciberCount} subscibers</span>
              <span>&bull;</span>
              <span>{user.videoCount} videos</span>
            </div>
          </div>
        </div>
        {userId === user.clerkId ? (
          <Button
            variant={"secondary"}
            asChild
            className="w-full mt-3 rounded-full"
          >
            <Link prefetch href={`/studio`}>
              Go to studio
            </Link>
          </Button>
        ) : (
          <SubscriptionButton
            disabled={isPending || !isLoaded}
            isSubscribed={user.viewerSubscribed}
            onClick={onClick}
            className="w-full mt-3 "
          />
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-start gap-4">
        <UserAvatar
          imageUrl={user.imageUrl}
          name={user.name}
          size="xl"
          className={cn(
            userId === user.clerkId && "cursor-pointer hover:opacity-80 transition-opacity duration-300",
          )}
          onClick={() => {
            if (user.clerkId === userId) {
              clerk.openUserProfile()
            }
          }}
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
            <span>{user.subsciberCount} subscibers</span>
            <span>&bull;</span>
            <span>{user.videoCount} videos</span>
          </div>
          {userId === user.clerkId ? (
            <Button
              variant={"secondary"}
              asChild
              className="mt-3 rounded-full"
            >
              <Link prefetch href={`/studio`}>
                Go to studio
              </Link>
            </Button>
          ) : (
            <SubscriptionButton
              disabled={isPending || !isLoaded}
              isSubscribed={user.viewerSubscribed}
              onClick={onClick}
              className="mt-3 "
            />
          )}
        </div>

      </div>
    </div>
  )
}
