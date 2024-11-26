import "./App.css";

import { useSensorData } from "@/hooks/useSensorData";
import { SensorCard } from "./components/sensor-card";

function App() {
  const sensor1 = useSensorData(20, 25);
  const sensor2 = useSensorData(18, 22);
  const sensor3 = useSensorData(15, 20);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid gap-6 md:grid-cols-3">
        <SensorCard title="Sensor 1" data={sensor1} />
        <SensorCard title="Sensor 2" data={sensor2} />
        <SensorCard title="Sensor 3" data={sensor3} />
      </div>
    </div>
  );
}

export default App;
