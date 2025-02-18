"use client"

import { Button } from '@/components/ui/button'
import { UserCircleIcon } from 'lucide-react'
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs"

export const AuthButton = () => {
  // TODO: Add diffrent auth states
  return (
    <>
      <SignedIn>
        <UserButton />
        {/* TODO: Add menu items for Studio and User profile */}
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
    </>
  )
}
