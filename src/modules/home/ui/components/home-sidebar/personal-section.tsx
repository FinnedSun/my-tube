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
import { usePathname } from "next/navigation"

const items = [
  {
    title: "History",
    href: "/playlists/history",
    icon: HistoryIcon,
    auth: true,
  },
  {
    title: "Liked Videos",
    href: "/playlists/liked",
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

  const pathname = usePathname()

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
                isActive={pathname === item.href}
                onClick={(e) => {
                  if (!isSignedIn && item.auth) {
                    e.preventDefault()
                    return clerk.openSignIn()
                  }
                }}
              >
                <Link prefetch href={item.href} className="flex items-center gap-4">
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
