"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("Initializing...")
  const [batteryIcon, setBatteryIcon] = useState<React.ReactNode>(<Battery className="h-12 w-12 text-amber-500" />)

  useEffect(() => {
    const steps = [
      { progress: 10, text: "Initializing...", icon: <Battery className="h-12 w-12 text-amber-500" /> },
      { progress: 25, text: "Generating anonymous ID...", icon: <BatteryLow className="h-12 w-12 text-amber-500" /> },
      {
        progress: 40,
        text: "Collecting battery data...",
        icon: <BatteryMedium className="h-12 w-12 text-amber-500" />,
      },
      {
        progress: 60,
        text: "Analyzing battery health...",
        icon: <BatteryWarning className="h-12 w-12 text-amber-500" />,
      },
      {
        progress: 80,
        text: "Processing usage statistics...",
        icon: <BatteryFull className="h-12 w-12 text-amber-500" />,
      },
      { progress: 95, text: "Finalizing...", icon: <BatteryCharging className="h-12 w-12 text-amber-500" /> },
      { progress: 100, text: "Ready!", icon: <BatteryFull className="h-12 w-12 text-amber-500" /> },
    ]

    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress)
        setStatusText(steps[currentStep].text)
        setBatteryIcon(steps[currentStep].icon)
        currentStep++
      } else {
        clearInterval(interval)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="flex flex-col items-center gap-2">
          {batteryIcon}
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Batt</h1>
          <p className="text-muted-foreground">Battery Health & Optimization</p>
        </div>

        <div className="w-full max-w-md space-y-2">
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-sm text-muted-foreground">{statusText}</p>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>Collecting battery data to provide personalized insights</p>
        </div>
      </div>
    </div>
  )
}

