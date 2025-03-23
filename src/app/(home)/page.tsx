import { DEFAULT_LIMIT } from "@/constants";
import { HomeViews } from "@/modules/home/ui/views/home-views";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";
interface PageProps {
  searchParams: Promise<{
    categoryId?: string
  }>
}

export async function generateMetadata({ searchParams }: PageProps) {
  const { categoryId } = await searchParams;

  if (!categoryId) {
    return {
      title: "Home",
    };
  }

  try {
    const category = await trpc.categories.getOne({ id: categoryId });
    return {
      title: `${category.name}`,
    };
  } catch {
    return {
      title: "Home",
    };
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;

  void trpc.categories.getMany.prefetch()
  void trpc.videos.getMany.prefetchInfinite({
    categoryId,
    limit: DEFAULT_LIMIT
  })

  return (
    <HydrateClient>
      <HomeViews categoryId={categoryId} />
    </HydrateClient>
  );
}

export default Page;
