"use client"

import { Button } from '@/components/ui/button'
import { ClapperboardIcon, UserCircleIcon } from 'lucide-react'
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs"
import { Skeleton } from '@/components/ui/skeleton'

export const AuthButton = () => {
  // TODO: Add diffrent auth states
  return (
    <>
      <ClerkLoading>
        <Skeleton className="w-[30px] h-[30px] rounded-full" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton >
            <UserButton.MenuItems>
              {/* TODO: add user profile menu button */}
              <UserButton.Link
                href='/studio'
                label='Studio'
                labelIcon={<ClapperboardIcon className='size-4' />}
              />
              <UserButton.Action label='manageAccount' />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
        <SignedOut>
          <SignInButton mode='modal'>
            <Button
              variant="outline"
              className='px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shdow-none'
            >
              <UserCircleIcon />
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </>
  )
}
