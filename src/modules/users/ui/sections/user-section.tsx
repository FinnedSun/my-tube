"use client"

import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"


import { trpc } from "@/trpc/client";
import { UserPageBanner, UserPageBannerSkeleton } from "../components/user-page-banner";
import { UserPageInfo, UserPageInfoSeleton } from "../components/user-page-info";
import { Separator } from "@/components/ui/separator";

interface UserSectionProps {
  userId: string;
}

export const UserSection = ({ userId }: UserSectionProps) => {
  return (
    <Suspense fallback={<UserSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error..</p>}>
        <UserSectionSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  )
}

const UserSectionSkeleton = () => {
  return (
    <div className="flex flex-col">
      <UserPageBannerSkeleton />
      <UserPageInfoSeleton />
    </div>
  )
}

const UserSectionSuspense = ({ userId }: UserSectionProps) => {
  const [user] = trpc.users.getOne.useSuspenseQuery({ id: userId })


  return (
    <div className="flex flex-col">
      <UserPageBanner user={user} />
      <UserPageInfo user={user} />
      <Separator />
    </div>
  )
}