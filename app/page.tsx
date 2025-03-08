"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Battery, BatteryCharging, BatteryFull, ChevronRight, Settings, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BatteryHealthChart } from "@/components/battery-health-chart"
import { BatteryUsageChart } from "@/components/battery-usage-chart"
import { CalibrationSteps } from "@/components/calibration-steps"
import { OptimizationTips } from "@/components/optimization-tips"
import { InitialLoader } from "@/components/initial-loader"
import { DataCollectionLoader } from "@/components/data-collection-loader"
import { PrivacyBanner } from "@/components/privacy-banner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { generateAnonymousId, collectBatteryData, getBatteryData } from "@/lib/battery-service"
import { RealTimeBatteryMonitor } from "@/components/real-time-battery-monitor"

export default function Home() {
  // App state
  const [initialLoading, setInitialLoading] = useState(true)
  const [showStartButton, setShowStartButton] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [dataCollecting, setDataCollecting] = useState(false)
  const [dataCollected, setDataCollected] = useState(false)
  const [showPrivacyBanner, setShowPrivacyBanner] = useState(false)

  // Battery data
  const [batteryData, setBatteryData] = useState({
    currentCapacity: 0,
    maxCapacity: 0,
    percentage: 0,
    wearLevel: 0,
    chargeCycles: 0,
    temperature: 0,
    estimatedLifespan: 0,
    currentUsage: 0,
    screenUsage: 0,
    wifiUsage: 0,
    backgroundUsage: 0,
    otherUsage: 0,
  })

  useEffect(() => {
    // Check if this is first launch
    const isFirstLaunch = localStorage.getItem("battAppFirstLaunch") !== "false"

    // Simulate initial app loading
    setTimeout(() => {
      setInitialLoading(false)

      if (isFirstLaunch) {
        // Show start button if first launch
        setShowStartButton(true)
      } else {
        // Get existing battery data if not first launch
        const data = getBatteryData()
        setBatteryData(data)
        setDataCollected(true)
      }
    }, 2000)
  }, [])

  const handleStartAnalysis = () => {
    setShowConfirmDialog(true)
  }

  const handleConfirmCollection = async () => {
    setShowConfirmDialog(false)
    setShowStartButton(false)
    setDataCollecting(true)

    // Generate anonymous ID
    const userId = generateAnonymousId()
    console.log("Anonymous User ID:", userId)

    try {
      // Collect battery data
      await collectBatteryData()

      // Mark first launch complete
      localStorage.setItem("battAppFirstLaunch", "false")

      // Get the collected data
      const data = getBatteryData()
      setBatteryData(data)

      // Finish data collection
      setDataCollecting(false)
      setDataCollected(true)

      // Show privacy banner
      setShowPrivacyBanner(true)
    } catch (error) {
      console.error("Error collecting battery data:", error)
      // Even if there's an error, we should still show the dashboard
      setDataCollecting(false)
      setDataCollected(true)
    }
  }

  // Show initial loading screen
  if (initialLoading) {
    return <InitialLoader />
  }

  // Show data collection progress
  if (dataCollecting) {
    return <DataCollectionLoader />
  }

  return (
    <div className="flex min-h-screen flex-col">
      {showPrivacyBanner && <PrivacyBanner onClose={() => setShowPrivacyBanner(false)} />}

      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BatteryFull className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-bold">Batt</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Statistics
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Calibration
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Tips
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="hidden md:flex gap-2" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {showStartButton ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <div className="text-center max-w-md mx-auto space-y-6">
              <BatteryFull className="h-16 w-16 text-amber-500 mx-auto" />
              <h1 className="text-3xl font-bold">Welcome to Batt</h1>
              <p className="text-muted-foreground">
                Batt helps you monitor your battery health, optimize usage, and extend your device's battery life.
              </p>
              <Button
                size="lg"
                className="w-full bg-amber-500 hover:bg-amber-600 text-lg py-6"
                onClick={handleStartAnalysis}
              >
                Start Analysis
              </Button>
            </div>
          </div>
        ) : (
          <div className="container py-6 md:py-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-2xl font-bold">Battery Health</CardTitle>
                    <CardDescription>Current status and health of your battery</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <BatteryCharging className="h-8 w-8 text-amber-500" />
                    <span className="text-2xl font-bold">{batteryData.percentage}%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Current Capacity</span>
                        <span className="font-medium">
                          {batteryData.currentCapacity.toLocaleString()} mAh /{" "}
                          {batteryData.maxCapacity.toLocaleString()} mAh
                        </span>
                      </div>
                      <Progress value={batteryData.percentage} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Wear Level</p>
                        <p className="text-lg font-medium">{batteryData.wearLevel}%</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Charge Cycles</p>
                        <p className="text-lg font-medium">{batteryData.chargeCycles}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Temperature</p>
                        <p className="text-lg font-medium">{batteryData.temperature}°C</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Est. Lifespan</p>
                        <p className="text-lg font-medium">{batteryData.estimatedLifespan} years</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="col-span-full">
                <RealTimeBatteryMonitor />
              </div>
            </div>

            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="statistics">Statistics</TabsTrigger>
                <TabsTrigger value="calibration">Calibration</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Usage</CardTitle>
                      <CardDescription>Real-time power consumption</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center py-4">
                        <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-muted">
                          <Zap className="h-12 w-12 text-amber-500" />
                          <span className="absolute text-xl font-bold">{batteryData.currentUsage} mA</span>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Screen</p>
                          <p className="text-sm font-medium">{batteryData.screenUsage} mA</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Wi-Fi</p>
                          <p className="text-sm font-medium">{batteryData.wifiUsage} mA</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Background</p>
                          <p className="text-sm font-medium">{batteryData.backgroundUsage} mA</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Other</p>
                          <p className="text-sm font-medium">{batteryData.otherUsage} mA</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Battery Health</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BatteryHealthChart />
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-1 md:col-span-2">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Optimize your battery</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <Button variant="outline" className="justify-between">
                        <div className="flex items-center gap-2">
                          <Battery className="h-4 w-4 text-amber-500" />
                          <span>Run Battery Diagnostic</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between">
                        <div className="flex items-center gap-2">
                          <BatteryCharging className="h-4 w-4 text-amber-500" />
                          <span>Start Calibration</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-amber-500" />
                          <span>Power Saving Mode</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="statistics" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="col-span-full">
                    <CardHeader>
                      <CardTitle>Usage Statistics</CardTitle>
                      <CardDescription>Battery consumption over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <BatteryUsageChart />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>App Usage</CardTitle>
                      <CardDescription>Battery consumption by app</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Social Media</span>
                            <span className="font-medium">32%</span>
                          </div>
                          <Progress value={32} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Video Streaming</span>
                            <span className="font-medium">24%</span>
                          </div>
                          <Progress value={24} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Gaming</span>
                            <span className="font-medium">18%</span>
                          </div>
                          <Progress value={18} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Browsing</span>
                            <span className="font-medium">15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Other</span>
                            <span className="font-medium">11%</span>
                          </div>
                          <Progress value={11} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Discharge Rate</CardTitle>
                      <CardDescription>Average battery drain per hour</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-6">
                        <div className="text-5xl font-bold text-amber-500">8.2%</div>
                        <p className="mt-2 text-sm text-muted-foreground">per hour</p>
                        <div className="mt-6 grid w-full grid-cols-2 gap-4">
                          <div className="rounded-lg bg-muted p-3 text-center">
                            <p className="text-xs text-muted-foreground">Screen On</p>
                            <p className="text-lg font-medium">12.5%</p>
                          </div>
                          <div className="rounded-lg bg-muted p-3 text-center">
                            <p className="text-xs text-muted-foreground">Screen Off</p>
                            <p className="text-lg font-medium">2.1%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="calibration" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Battery Calibration</CardTitle>
                    <CardDescription>Follow these steps to calibrate your battery</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CalibrationSteps />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600">Start Calibration Process</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="tips" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Tips</CardTitle>
                    <CardDescription>Improve your battery life with these suggestions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OptimizationTips />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
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

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Battery Data Collection</AlertDialogTitle>
            <AlertDialogDescription>
              We will collect battery data to provide an accurate analysis. Do you wish to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCollection} className="bg-amber-500 hover:bg-amber-600">
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

