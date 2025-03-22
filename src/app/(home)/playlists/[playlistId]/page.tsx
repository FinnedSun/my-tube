import { DEFAULT_LIMIT } from "@/constants";

import { VideosView } from "@/modules/playlists/ui/views/videos-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface PlaylistIdPageProps {
  params: Promise<{
    playlistId: string;
  }>;
}

export async function generateMetadata({ params }: PlaylistIdPageProps) {
  const { playlistId } = await params


  const playlist = await trpc.playlists.getOne({ id: playlistId });

  return {
    title: playlist.name,
    description: playlist.description,
  };
}

const PlaylistIdPage = async ({
  params,
}: PlaylistIdPageProps) => {
  const { playlistId } = await params;

  void trpc.playlists.getOne.prefetch({
    id: playlistId,
  })
  void trpc.playlists.getVideos.prefetchInfinite({
    limit: DEFAULT_LIMIT,
    playlistId,
  })

  return (
    <HydrateClient>
      <VideosView playlistId={playlistId} />
    </HydrateClient>
  )
}

export default PlaylistIdPage