import { AlertCircle, BatteryCharging, Lightbulb, Smartphone, Wifi } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function OptimizationTips() {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Quick Tip</AlertTitle>
        <AlertDescription>Reducing screen brightness to 50% can extend battery life by up to 30%.</AlertDescription>
      </Alert>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-amber-500" />
            <span>Display Settings</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Reduce screen brightness to conserve power</li>
              <li>Set a shorter screen timeout (30 seconds is optimal)</li>
              <li>Use dark mode to save battery on OLED/AMOLED screens</li>
              <li>Disable always-on display features</li>
              <li>Lower screen refresh rate if your device supports it</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-amber-500" />
            <span>Connectivity</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Turn off Wi-Fi, Bluetooth, and GPS when not in use</li>
              <li>Use Airplane mode in areas with poor signal</li>
              <li>Disable mobile data when on Wi-Fi</li>
              <li>Turn off hotspot functionality when not sharing connection</li>
              <li>Disable automatic Wi-Fi scanning</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <span>App Management</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Close background apps that aren't in use</li>
              <li>Disable background refresh for non-essential apps</li>
              <li>Uninstall apps you rarely use</li>
              <li>Use lite versions of apps when available</li>
              <li>Restrict location access to only when using the app</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="flex items-center gap-2">
            <BatteryCharging className="h-4 w-4 text-amber-500" />
            <span>Charging Habits</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Avoid letting battery drain completely (below 20%)</li>
              <li>Don't keep device plugged in at 100% for extended periods</li>
              <li>Use original charger or certified alternatives</li>
              <li>Charge in cooler environments when possible</li>
              <li>Remove protective case while charging if device gets hot</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

