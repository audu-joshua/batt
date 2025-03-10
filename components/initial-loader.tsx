"use client"

import { BatteryFull } from "lucide-react"

export function InitialLoader() {
  return (
    <div className="flex min-h-screen overflow-hidden flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex flex-col items-center gap-2">
          {/* Replace the BatteryFull icon with your image */}
          <img src="/batt.svg" alt="Loader Image" className="h-40 w-40 animate-pulse" />
          {/*  
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Batt</h1>*/}
        </div>

        {/*<div className="text-lg text-muted-foreground">Loading...</div>*/}
      </div>
    </div>
  )
}
