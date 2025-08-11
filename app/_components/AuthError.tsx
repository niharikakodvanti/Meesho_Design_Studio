import React from 'react'
import { Button } from '@/components/ui/button'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'

interface AuthErrorProps {
  message?: string;
}

function AuthError({ message = "Authentication failed. Please try again." }: AuthErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {message}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex flex-col space-y-4">
            <LoginLink postLoginRedirectURL="/dashboard">
              <Button className="w-full">
                Try Again
              </Button>
            </LoginLink>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = '/'}
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthError 