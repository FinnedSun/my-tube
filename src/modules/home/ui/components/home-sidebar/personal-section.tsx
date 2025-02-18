"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { useAuth, useClerk } from "@clerk/nextjs"
import {
  HistoryIcon,
  ListVideoIcon,
  ThumbsUpIcon
} from "lucide-react"
import Link from "next/link"

const items = [
  {
    title: "History",
    href: "/playlists/history",
    icon: HistoryIcon,
    auth: true,
  },
  {
    title: "Liked Videos",
    href: "/paylists/liked ",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "All Playlists",
    href: "/playlists",
    icon: ListVideoIcon,
    auth: true,
  },
]

export const PersonalSection = () => {
  const { isSignedIn } = useAuth()
  const clerk = useClerk()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        You
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
            >
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false} // TODO: Change to look at the current pathname
                onClick={(e) => {
                  if (!isSignedIn && item.auth) {
                    e.preventDefault()
                    return clerk.openSignIn()
                  }
                }} // TODO: Do something onClick
              >
                <Link href={item.href} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
