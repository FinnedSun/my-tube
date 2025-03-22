import { DEFAULT_LIMIT } from '@/constants'
import { PlaylistsView } from '@/modules/playlists/ui/views/playlists-view'
import { HydrateClient, trpc } from '@/trpc/server'
import React from 'react'

export const dynamic = "force-dynamic";

export const metadata = {
  title: 'liked',
}

const PlaylistsPage = async () => {
  void trpc.playlists.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT
  })

  return (
    <HydrateClient>
      <PlaylistsView />
    </HydrateClient>
  )
}

export default PlaylistsPage