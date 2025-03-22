import { DEFAULT_LIMIT } from "@/constants";
import { SearchView } from "@/modules/search/ui/views/seacrh-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{
    query: string | undefined
    categoryId?: string | undefined
  }>
}

export async function generateMetadata({ searchParams }: SearchPageProps) {

  const { query, categoryId } = await searchParams;

  return {
    title: query || 'Search',
  };
}


const SearchPage = async ({
  searchParams,
}: SearchPageProps) => {
  const { query, categoryId } = await searchParams;

  void trpc.categories.getMany.prefetch()
  void trpc.search.getMany.prefetchInfinite({
    query,
    categoryId,
    limit: DEFAULT_LIMIT
  })

  return (
    <HydrateClient>
      <SearchView query={query} categoryId={categoryId} />
    </HydrateClient>
  )
}

export default SearchPage