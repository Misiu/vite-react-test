"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, YAxis, Area } from "recharts";
import { Loader2 } from "lucide-react";
import type { SensorState } from "../types/sensor";

interface SensorCardProps {
  title: string;
  data: SensorState;
}

export function SensorCard({ title, data }: SensorCardProps) {
  if (data.isLoading) {
    return (
      <Card className="w-full bg-white rounded-none">
        <div className="flex h-[135px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white rounded-none overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="text-2xl font-semibold text-gray-900">
            {data.currentValue.toFixed(1)}°C
          </div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
        <div className="h-[50px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.history.map((point) => ({
                timestamp: point.timestamp,
                temperature: point.value,
              }))}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorTemperature"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="none"
                fill="url(#colorTemperature)"
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#0EA5E9"
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
