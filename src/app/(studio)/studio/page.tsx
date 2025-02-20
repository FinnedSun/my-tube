// import { DEFAULT_LIMIT } from "@/constants"
// import { StudioView } from "@/modules/studio/ui/view/studio-view"
import { HydrateClient } from "@/trpc/server"


const StudioPage = async () => {
  // void trpc.studio.getMany.prefetchInfinite({
  //   limit: DEFAULT_LIMIT,
  // })
  return (
    <HydrateClient>
      {/* <StudioView /> */}
      <div>
        <h1>Studio</h1>
      </div>
    </HydrateClient>
  )
}

export default StudioPage