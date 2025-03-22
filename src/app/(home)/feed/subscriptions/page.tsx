import { DEFAULT_LIMIT } from "@/constants";
import { SubscripionsView } from "@/modules/home/ui/views/subscriptions-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Subscriptions',
}

const Page = async () => {

  void trpc.videos.getManySubscriptions.prefetchInfinite({
    limit: DEFAULT_LIMIT
  })

  return (
    <HydrateClient>
      <SubscripionsView />
    </HydrateClient>
  );
}

export default Page;
