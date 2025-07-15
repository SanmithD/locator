import { Battery, LocateFixedIcon, Wifi } from "lucide-react";
import { useEffect } from "react";
import BatteryStatus from "./components/BatteryStatus";
import Map from "./components/Map";
import { UseLocationStore } from "./store/UseLocation";

const App = () => {
  const {
    lat,
    lon,
    address,
    isLoading,
    networkInfo,
    bgTaskMessage,
    getCoordinates,
    initNetworkInfo,
    runBackgroundTask,
  } = UseLocationStore();


  useEffect(() => {
    getCoordinates();
    const cleanup = initNetworkInfo();
    runBackgroundTask();
    return () => cleanup && cleanup();
  }, []);


  return (
    <main className="min-h-screen px-4 py-10 md:px-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Smart Travel Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Realtime location, network insights, and travel-friendly tips.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="shadow-xl border-1 rounded-2xl p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-3 "><LocateFixedIcon size={20} /> Your Location</h2>
            {lat && lon ? (
              <>
                <p>
                  <span className="font-medium">Latitude:</span> {lat}
                </p>
                <p>
                  <span className="font-medium">Longitude:</span> {lon}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {address || "Finding address..."}
                </p>
              </>
            ) : (
              <p>
                {isLoading ? (
                  <p className="skeleton h-32 w-32" ></p>
                ) : (
                  "Location unavailable."
                )}
              </p>
            )}
          </section>

          <section className=" shadow-xl border-1 rounded-2xl p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-3.5 "><Wifi size={20} /> Network Status</h2>
            {networkInfo ? (
              <p>
                <strong>Type:</strong> {networkInfo.type} | <strong>Downlink:</strong>{" "}
                {networkInfo.downlink} Mbps | <br />
                <strong>RTT:</strong> {networkInfo.rtt} ms
              </p>
            ) : (
              <p className="text-gray-400 animate-pulse">Checking connection...</p>
            )}
          </section>
          <div className=" shadow-xl border-1 rounded-2xl p-6 space-y-3">
            <h1 className="text-2xl font-semibold text-blue-700 flex items-center gap-3.5 "> <Battery size={20} className="rotate-270" /> Battery Status</h1>
            <BatteryStatus/>
          </div>
        </div>

        <section className="shadow-xl rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-blue-700">🔄 Background Sync</h2>
          <p className="text-md">{bgTaskMessage}</p>
        </section>

        {/* Map */}
        <section className="shadow-xl rounded-2xl overflow-hidden">
          <Map lat={lat} lon={lon} />
        </section>
      </div>
    </main>
  );
};

export default App;
