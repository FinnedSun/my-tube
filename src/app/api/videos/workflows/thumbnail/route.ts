import { db } from "@/db"
import { videos } from "@/db/schema"
import { serve } from "@upstash/workflow/nextjs"
import { and, eq } from "drizzle-orm"
import { UTApi } from "uploadthing/server"

interface InputType {
  userId: string
  videoId: string
  prompt: string
}

export const { POST } = serve(
  async (context) => {
    const input = context.requestPayload as InputType
    const { videoId, userId, prompt } = input
    const utapi = new UTApi()


    const video = await context.run("get-video", async () => {
      const [existingVideo] = await db
        .select()
        .from(videos)
        .where(and(
          eq(videos.id, videoId),
          eq(videos.userId, userId)
        ))

      if (!existingVideo) {
        throw new Error("Video not found")
      }

      return existingVideo
    })

    const { body } = await context.call<{ data: { url: string }[] }>("generate-thumbnail", {
      url: "https://api.openai.com/v1/images/generations",
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: {
        prompt,
        n: 1,
        model: "dall-e-3",
        size: "1792x1024"
      }
    })

    const tempThumbnailUrl = body.data[0].url

    if (!tempThumbnailUrl) {
      throw new Error("Failed to generate title")
    }

    await context.run("cleanup-thumbnail", async () => {
      if (video.thumbnailKey) {
        await utapi.deleteFiles(video.thumbnailKey)
        await db
          .update(videos)
          .set({
            thumbnailKey: null,
            thumbnailUrl: null,
            updatedAt: new Date()
          })
          .where(and(
            eq(videos.id, videoId),
            eq(videos.userId, userId)
          ))
      }
    })

    const uploadedThubnail = await context.run("upload-thumbnail", async () => {
      const { data } = await utapi.uploadFilesFromUrl(tempThumbnailUrl)

      if (!data) {
        throw new Error("Failed to upload thumbnail")
      }

      return data
    })


    await context.run("update-video", async () => {
      await db
        .update(videos)
        .set({
          thumbnailKey: uploadedThubnail.key,
          thumbnailUrl: uploadedThubnail.url,
          updatedAt: new Date()
        })
        .where(and(
          eq(videos.id, video.id),
          eq(videos.userId, video.userId)
        ))
    })
  }
)