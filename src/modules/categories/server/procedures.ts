
import { db } from "@/db";
import { categories } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const categoriesRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const [existingCategory] = await db
        .select()
        .from(categories)
        .where(eq(categories.id, id))
      if (!existingCategory) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Category not found" });
      }
      return existingCategory;
    }),
  getMany: baseProcedure.query(async () => {

    const data = await db.select().from(categories)

    return data;
  })
});