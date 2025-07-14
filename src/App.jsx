import { useEffect, useRef } from "react";
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
    showTips,
    getCoordinates,
    initNetworkInfo,
    runBackgroundTask,
    setShowTips,
  } = UseLocationStore();

  const lazySectionRef = useRef(null);

  // Initialize APIs
  useEffect(() => {
    getCoordinates();
    const cleanup = initNetworkInfo();
    runBackgroundTask();

    return () => cleanup && cleanup();
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTips(true);
        }
      },
      { threshold: 0.3 }
    );

    if (lazySectionRef.current) observer.observe(lazySectionRef.current);
    return () => observer.disconnect();
  }, [setShowTips]);

  return (
    <main className="min-h-screen px-4 py-10 md:px-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            🌍 Smart Travel Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Realtime location, network awareness & smart travel insights.
          </p>
        </header>

        {/* Location */}
        <section className="bg-gray-900 shadow-md rounded-2xl p-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">📍 Your Location</h2>
          {lat && lon ? (
            <>
              <p>Latitude: <strong>{lat}</strong>, Longitude: <strong>{lon}</strong></p>
              <p><span className="font-medium">Address:</span> {address || "Finding address..."}</p>
            </>
          ) : (
            <p>{isLoading ? "Fetching location..." : "Location unavailable."}</p>
          )}
        </section>

        {/* Network Info */}
        <section className="bg-gray-900 shadow-md rounded-2xl p-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">📡 Network Status</h2>
          {networkInfo ? (
            <p>
              Type: <strong>{networkInfo.type}</strong> | Downlink:{" "}
              <strong>{networkInfo.downlink}</strong> Mbps | RTT:{" "}
              <strong>{networkInfo.rtt}</strong> ms
            </p>
          ) : (
            <p>Checking connection...</p>
          )}
        </section>

        {/* Background Task */}
        <section className="bg-gray-900 shadow-md rounded-2xl p-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">🔄 Background Sync</h2>
          <p>{bgTaskMessage}</p>
        </section>

        {/* Map */}
        <section className="bg-gray-900 shadow-md rounded-2xl overflow-hidden">
          <Map lat={lat} lon={lon} />
        </section>

        {/* Lazy Travel Tips */}
        <section
          ref={lazySectionRef}
          className="bg-gray-900 shadow-md rounded-2xl p-6 transition-opacity duration-700"
        >
          <h2 className="text-xl font-semibold text-blue-700">🧳 Travel Tips</h2>
          {showTips ? (
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Keep your phone charged when on the move</li>
              <li>Avoid low-signal zones during emergency hours</li>
              <li>Use offline maps when network is slow</li>
            </ul>
          ) : (
            <p className="text-gray-500">Loading tips when ready...</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
