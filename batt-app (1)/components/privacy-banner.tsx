"use client"
import { AlertCircle, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PrivacyBannerProps {
  onClose: () => void
}

export function PrivacyBanner({ onClose }: PrivacyBannerProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <Alert className="relative border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-50">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Data Collection Notice</AlertTitle>
        <AlertDescription className="pr-8">
          <p className="mb-2">
            Batt has collected battery data from your device to provide personalized insights and recommendations. This
            data is stored locally on your device and is not shared with any third parties.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="border-amber-500 bg-transparent hover:bg-amber-100" asChild>
              <Link href="/settings">Manage Data Collection</Link>
            </Button>
            <Button size="sm" variant="outline" className="border-amber-500 bg-transparent hover:bg-amber-100" asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
          </div>
        </AlertDescription>
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1 rounded-full hover:bg-amber-100"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </Alert>
    </div>
  )
}

