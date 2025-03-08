"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { getBatteryData } from "@/lib/battery-service"

export function RealTimeBatteryMonitor() {
  const [batteryData, setBatteryData] = useState(getBatteryData())
  const [batteryIcon, setBatteryIcon] = useState<React.ReactNode>(<Battery className="h-6 w-6 text-amber-500" />)
  const [isCharging, setIsCharging] = useState(false)

  useEffect(() => {
    // Try to use the Browser Battery API for real-time updates
    const setupBatteryMonitoring = async () => {
      if ("getBattery" in navigator) {
        try {
          const battery = await (navigator as any).getBattery()

          // Update initial state
          updateBatteryStatus(battery)

          // Set up event listeners for battery status changes
          battery.addEventListener("levelchange", () => updateBatteryStatus(battery))
          battery.addEventListener("chargingchange", () => updateBatteryStatus(battery))

          return true
        } catch (error) {
          console.error("Error setting up battery monitoring:", error)
          return false
        }
      }
      return false
    }

    const updateBatteryStatus = (battery: any) => {
      setIsCharging(battery.charging)

      // Update the icon based on level and charging state
      updateBatteryIcon(Math.round(battery.level * 100), battery.charging)

      // Get the stored battery data and update just the percentage
      const storedData = getBatteryData()
      storedData.percentage = Math.round(battery.level * 100)
      setBatteryData(storedData)
    }

    const updateBatteryIcon = (percentage: number, charging: boolean) => {
      if (charging) {
        setBatteryIcon(<BatteryCharging className="h-6 w-6 text-amber-500" />)
        return
      }

      if (percentage >= 90) {
        setBatteryIcon(<BatteryFull className="h-6 w-6 text-amber-500" />)
      } else if (percentage >= 60) {
        setBatteryIcon(<BatteryMedium className="h-6 w-6 text-amber-500" />)
      } else if (percentage >= 30) {
        setBatteryIcon(<BatteryLow className="h-6 w-6 text-amber-500" />)
      } else {
        setBatteryIcon(<BatteryWarning className="h-6 w-6 text-amber-500" />)
      }
    }

    // Set up battery monitoring
    setupBatteryMonitoring()

    // Fallback to polling the stored data if Browser Battery API is not available
    const interval = setInterval(() => {
      const data = getBatteryData()
      setBatteryData(data)
      updateBatteryIcon(data.percentage, isCharging)
    }, 5000)

    return () => clearInterval(interval)
  }, [isCharging])

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {batteryIcon}
            <span className="font-medium">{batteryData.percentage}%</span>
            {isCharging && <span className="text-xs text-muted-foreground">Charging</span>}
          </div>
          <div className="text-xs text-muted-foreground">
            {batteryData.currentCapacity} mAh / {batteryData.maxCapacity} mAh
          </div>
        </div>
        <Progress value={batteryData.percentage} className="h-1.5 mt-2" />
      </CardContent>
    </Card>
  )
}

