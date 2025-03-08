import { Check, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function CalibrationSteps() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white">
          <Check className="h-4 w-4" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Step 1: Charge to 100%</h3>
          <p className="text-sm text-muted-foreground">
            Charge your device to 100% and keep it plugged in for at least 2 more hours to ensure it's fully charged.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-500 text-amber-500">
          2
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Step 2: Unplug and Use Normally</h3>
          <p className="text-sm text-muted-foreground">
            Unplug your device and use it normally until the battery is completely drained and the device shuts down.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted text-muted-foreground">
          3
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Step 3: Let it Rest</h3>
          <p className="text-sm text-muted-foreground">
            Leave your device powered off for at least 4-6 hours to ensure the battery is completely drained.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted text-muted-foreground">
          4
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Step 4: Charge to 100% Again</h3>
          <p className="text-sm text-muted-foreground">
            Charge your device to 100% without interruption. Don't use the device during this charging period.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted text-muted-foreground">
          5
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Step 5: Calibration Complete</h3>
          <p className="text-sm text-muted-foreground">
            Your battery is now calibrated. The system will have an accurate reading of your battery's capacity.
          </p>
        </div>
      </div>
      <Card className="mt-6 bg-muted/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Current Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Step 1 of 5 completed</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Continue to Step 2
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

