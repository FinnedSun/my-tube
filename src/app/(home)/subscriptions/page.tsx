import { DEFAULT_LIMIT } from "@/constants"
import { SubscriptionsView } from "@/modules/subscription/ui/views/subscriptions-view";
import { HydrateClient, trpc } from "@/trpc/server"

export const dynamic = "force-dynamic";

export const metadata = {
  title: 'All subscriptions',
}

const SubscriptionsPage = async () => {
  void trpc.subscriptions.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT
  })

  return (
    <HydrateClient>
      <SubscriptionsView />
    </HydrateClient>
  )
}

export default SubscriptionsPage