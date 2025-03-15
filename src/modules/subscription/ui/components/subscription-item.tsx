import { UserAvatar } from "@/components/user-avatar";
import { SubscriptionButton } from "./subscription-button";
import { Skeleton } from "@/components/ui/skeleton";

interface SubscriptionItemProps {
  name: string;
  imageUrl: string;
  subscriberCount: number;
  onUnsubscribe: () => void;
  disabled: boolean;
}

export const SubscriptionItemSkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-10 rounded-full" />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="w-24 h-4" />
            <Skeleton className="mt-1 w-20 h-3" />
          </div>

          <Skeleton className="w-20 h-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}
export const SubscriptionItem = ({
  name,
  imageUrl,
  subscriberCount,
  onUnsubscribe,
  disabled,
}: SubscriptionItemProps) => {
  return (
    <div className="flex items-start gap-4">
      <UserAvatar
        name={name}
        imageUrl={imageUrl}
        size={"lg"}
      />

      <div className="flex-1">
        <div className="items-center flex justify-between">
          <div>
            <h3 className="text-sm">
              {name}
            </h3>
            <p className="text-muted-foreground text-xs">
              {subscriberCount.toLocaleString()} subscribers
            </p>
          </div>

          <SubscriptionButton
            size={"sm"}
            onClick={(e) => {
              e.preventDefault();
              onUnsubscribe();
            }}
            disabled={disabled}
            isSubscribed
          />
        </div>
      </div>
    </div>
  )
}
