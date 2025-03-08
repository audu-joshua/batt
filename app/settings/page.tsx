"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Battery, Info, Shield, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getAnonymousId } from "@/lib/battery-service"

export default function SettingsPage() {
  const [dataCollection, setDataCollection] = useState(true)
  const [anonymousId, setAnonymousId] = useState("")
  const [showResetDialog, setShowResetDialog] = useState(false)

  useEffect(() => {
    // Get data collection preference
    const dataCollectionEnabled = localStorage.getItem("battAppDataCollection") !== "false"
    setDataCollection(dataCollectionEnabled)

    // Get anonymous ID
    const userId = getAnonymousId()
    setAnonymousId(userId)
  }, [])

  const handleDataCollectionToggle = (checked: boolean) => {
    setDataCollection(checked)
    localStorage.setItem("battAppDataCollection", checked.toString())
  }

  const handleResetData = () => {
    // Clear all data except the anonymous ID
    localStorage.removeItem("battAppBatteryData")
    localStorage.removeItem("battAppFirstLaunch")
    setShowResetDialog(false)

    // Reload the page to reinitialize
    window.location.reload()
  }

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
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6 md:py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-amber-500" />
                    Privacy & Data
                  </CardTitle>
                  <CardDescription>Manage how your battery data is collected and used</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="data-collection" className="flex flex-col gap-1">
                        <span>Automatic Data Collection</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Allow Batt to collect battery data to provide personalized insights
                        </span>
                      </Label>
                      <Switch
                        id="data-collection"
                        checked={dataCollection}
                        onCheckedChange={handleDataCollectionToggle}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Your Anonymous ID</h3>
                    <p className="text-sm text-muted-foreground">
                      This ID is used to track your battery data across sessions without identifying you personally.
                    </p>
                    <div className="flex items-center gap-2 rounded-md bg-muted p-2 font-mono text-sm">
                      {anonymousId}
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Data Privacy</AlertTitle>
                    <AlertDescription>
                      All battery data is stored locally on your device. We do not collect or transmit your data to
                      external servers.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        Reset All Data
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset All Data</DialogTitle>
                        <DialogDescription>
                          This will delete all collected battery data and reset the app to its initial state. Your
                          anonymous ID will be preserved.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowResetDialog(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleResetData}>
                          Reset Data
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <p className="text-xs text-muted-foreground">
                    Resetting will clear all battery history and settings, but will preserve your anonymous ID.
                  </p>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Battery className="h-5 w-5 text-amber-500" />
                    Battery Data Collection
                  </CardTitle>
                  <CardDescription>Control what battery data is collected</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="collect-health" className="flex flex-col gap-1">
                        <span>Battery Health</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Capacity, wear level, and charge cycles
                        </span>
                      </Label>
                      <Switch id="collect-health" defaultChecked={dataCollection} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="collect-usage" className="flex flex-col gap-1">
                        <span>Usage Statistics</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Power consumption and app usage patterns
                        </span>
                      </Label>
                      <Switch id="collect-usage" defaultChecked={dataCollection} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="collect-charging" className="flex flex-col gap-1">
                        <span>Charging Patterns</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Charging frequency and duration
                        </span>
                      </Label>
                      <Switch id="collect-charging" defaultChecked={dataCollection} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Changes to these settings will take effect immediately.
                  </p>
                </CardFooter>
              </Card>
            </div>
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

