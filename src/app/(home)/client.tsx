"use client"

import { trpc } from "@/trpc/client"

export const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "John" })
  return (
    <div>

      Page client seys: {data.greeting}

    </div>
  )
}
