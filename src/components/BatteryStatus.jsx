// components/BatteryStatus.jsx
import { useEffect, useState } from "react";

const BatteryStatus = () => {
  const [battery, setBattery] = useState(null);

  useEffect(() => {
    navigator.getBattery?.().then((bat) => {
      setBattery({
        level: bat.level,
        charging: bat.charging,
      });
    });
  }, []);

  return battery ? (
    <ul className="list-disc list-inside text-lg space-y-1">
      <li>Battery Level: {battery.level * 100}%</li>
      <li>{battery.charging ? "Charging..." : "Not Charging"}</li>
    </ul>
  ) : (
    <p>Battery info not supported on this device.</p>
  );
};

export default BatteryStatus;
