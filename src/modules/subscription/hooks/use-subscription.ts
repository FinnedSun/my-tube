import { toast } from "sonner";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "@/trpc/client";

interface UseSubscriptionProps {
  userId: string;
  isSubscribed: boolean;
  fromVideoId?: string;
}

export const useSubscription = ({
  userId,
  isSubscribed,
  fromVideoId,
}: UseSubscriptionProps) => {
  const clerk = useClerk()
  const utils = trpc.useUtils()

  const subscribe = trpc.subscriptions.create.useMutation({
    onSuccess: () => {
      toast.success("Subscribed")
      // TODO: Reinvalidate the subscriptions.getMany, users.getOne

      if (fromVideoId) {
        utils.videos.getOne.invalidate({ id: fromVideoId })
      }
    },
    onError: (error) => {
      if (error.data?.code === "BAD_REQUEST") {
        toast.error("You cannot subscribe to yourself")
      } else if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn()
        toast.error("You must be logged in to subscribe")
      } else {
        toast.error("Something went wrong")
      }
    }
  })

  const unsubscribe = trpc.subscriptions.remove.useMutation({
    onSuccess: () => {
      toast.success("Unsubscribed")
      // TODO: Reinvalidate the subscriptions.getMany, users.getOne

      if (fromVideoId) {
        utils.videos.getOne.invalidate({ id: fromVideoId })
      }
    },
    onError: (error) => {
      if (error.data?.code === "BAD_REQUEST") {
        toast.error("You cannot unsubscribed to yourself")
      } else if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn()
        toast.error("You must be logged in to unsubscribed")
      } else {
        toast.error("Something went wrong")
      }
    }
  })

  const isPending = subscribe.isPending || unsubscribe.isPending

  const onClick = () => {
    if (isSubscribed) {
      unsubscribe.mutate({ userId })
    } else {
      subscribe.mutate({ userId })
    }
  }

  return {
    isPending,
    onClick,
  }
}