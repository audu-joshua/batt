"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"

const data = [
  { time: "00:00", percentage: 100 },
  { time: "02:00", percentage: 95 },
  { time: "04:00", percentage: 90 },
  { time: "06:00", percentage: 85 },
  { time: "08:00", percentage: 75 },
  { time: "10:00", percentage: 65 },
  { time: "12:00", percentage: 55 },
  { time: "14:00", percentage: 45 },
  { time: "16:00", percentage: 35 },
  { time: "18:00", percentage: 25 },
  { time: "20:00", percentage: 15 },
  { time: "22:00", percentage: 10 },
  { time: "00:00", percentage: 5 },
]

export function BatteryUsageChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <XAxis dataKey="time" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card>
                  <CardContent className="py-2 px-3">
                    <p className="text-sm font-medium">{payload[0].payload.time}</p>
                    <p className="text-sm text-muted-foreground">{payload[0].value}% remaining</p>
                  </CardContent>
                </Card>
              )
            }
            return null
          }}
        />
        <Area
          type="monotone"
          dataKey="percentage"
          stroke="hsl(var(--amber-500))"
          fill="hsl(var(--amber-500) / 0.2)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

