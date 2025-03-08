"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"

const data = [
  { day: "1", health: 88 },
  { day: "5", health: 88 },
  { day: "10", health: 87 },
  { day: "15", health: 87 },
  { day: "20", health: 87 },
  { day: "25", health: 86 },
  { day: "30", health: 86 },
]

export function BatteryHealthChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <YAxis domain={[80, 100]} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card>
                  <CardContent className="py-2 px-3">
                    <p className="text-sm font-medium">Day {payload[0].payload.day}</p>
                    <p className="text-sm text-muted-foreground">{payload[0].value}% health</p>
                  </CardContent>
                </Card>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="health"
          stroke="hsl(var(--amber-500))"
          strokeWidth={2}
          dot={{ r: 4, fill: "hsl(var(--amber-500))" }}
          activeDot={{ r: 6, fill: "hsl(var(--amber-500))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

