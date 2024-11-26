"use client";

import { useState, useEffect } from "react";
import type { SensorState } from "../types/sensor";

const generateRandomTemperature = (
  prevTemp: number,
  min: number,
  max: number
) => {
  const change = (Math.random() - 0.5) * 0.5; // Generate a change between -0.25 and 0.25
  let newTemp = prevTemp + change;
  newTemp = Math.max(min, Math.min(max, newTemp)); // Ensure temperature stays within range
  return Number(newTemp.toFixed(1));
};

export function useSensorData(initialMin: number, initialMax: number) {
  const [sensorState, setSensorState] = useState<SensorState>({
    currentValue: 0,
    history: [],
    isLoading: true,
  });

  // Initial data fetch simulation
  useEffect(() => {
    const fetchInitialData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const now = Date.now();
      let prevTemp = generateRandomTemperature(0, initialMin, initialMax);
      const initialData = Array.from({ length: 20 }).map((_, index) => {
        prevTemp = generateRandomTemperature(prevTemp, initialMin, initialMax);
        return {
          timestamp: now - (19 - index) * 1000,
          value: prevTemp,
        };
      });

      setSensorState({
        currentValue: initialData[initialData.length - 1].value,
        history: initialData,
        isLoading: false,
      });
    };

    fetchInitialData();
  }, [initialMin, initialMax]);

  // Real-time updates
  useEffect(() => {
    if (sensorState.isLoading) return;

    const interval = setInterval(() => {
      const newValue = generateRandomTemperature(
        sensorState.currentValue,
        initialMin,
        initialMax
      );
      const newDataPoint = {
        timestamp: Date.now(),
        value: newValue,
      };

      setSensorState((prev) => ({
        currentValue: newValue,
        history: [...prev.history.slice(-19), newDataPoint],
        isLoading: false,
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, [sensorState.isLoading, initialMin, initialMax]);

  return sensorState;
}
