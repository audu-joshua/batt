import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center py-4">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Privacy Policy</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6 md:py-8">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="flex items-center gap-2 text-amber-500">
              <Shield className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Batt App Privacy Policy</h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Data Collection</h3>
              <p>
                Batt collects battery-related data from your device to provide you with insights about your battery
                health and usage patterns. This data includes:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Battery capacity and health metrics</li>
                <li>Charge cycles and charging patterns</li>
                <li>Power consumption statistics</li>
                <li>App usage as it relates to battery consumption</li>
              </ul>
              <p>
                All data is stored locally on your device and is not transmitted to our servers or any third parties.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Anonymous Identifier</h3>
              <p>
                Batt generates a random anonymous identifier for your device that allows the app to maintain consistent
                data across sessions without requiring you to create an account. This identifier cannot be used to
                personally identify you and is stored only on your device.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Your Control Over Data</h3>
              <p>You have complete control over your data:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>You can disable automatic data collection at any time in the Settings</li>
                <li>You can reset all collected data from the Settings page</li>
                <li>You can choose which specific types of data are collected</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Data Security</h3>
              <p>
                Since all data is stored locally on your device, the security of your data is maintained by your
                device's own security measures. Batt does not transmit your data over the internet, eliminating
                network-related security concerns.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Changes to This Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at <Link href="mailto:empire4josh@gmail.com" className="text-amber-500">empire4josh@gmail.com </Link></p>
            </div>

            <p className="text-sm text-muted-foreground">Last Updated: March 8, 2025</p>
          </div>
        </div>
      </main>

      <footer className="border-t py-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Batt App. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

