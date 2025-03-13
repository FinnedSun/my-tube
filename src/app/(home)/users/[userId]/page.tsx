import { DEFAULT_LIMIT } from "@/constants";
import { UserView } from "@/modules/users/ui/views/user-view"
import { HydrateClient, trpc } from "@/trpc/server"

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ userId: string }>
}

const UserIdPage = async ({ params }: PageProps) => {
  const { userId } = await params

  void trpc.users.getOne.prefetch({ id: userId })
  void trpc.videos.getMany.prefetch({
    userId,
    limit: DEFAULT_LIMIT
  })

  return (
    <HydrateClient>
      <UserView userId={userId} />
    </HydrateClient>
  )
}

export default UserIdPage