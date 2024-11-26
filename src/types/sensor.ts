export interface SensorData {
  timestamp: number;
  value: number;
}

export interface SensorState {
  currentValue: number;
  history: SensorData[];
  isLoading: boolean;
}
