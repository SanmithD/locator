import axios from "axios";
import { create } from "zustand";

export const UseLocationStore = create((set, get) => ({
  lat: null,
  lon: null,
  address: null,
  isLoading: true,

  networkInfo: null,

  bgTaskMessage: "",

  showTips: false,

  getCoordinates: () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          set({ lat: latitude, lon: longitude, isLoading: false });
          get().fetchAddress(latitude, longitude); 
        },
        (err) => {
          console.error("Geolocation error:", err);
          set({ isLoading: false });
        }
      );
    }
  },

  fetchAddress: async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${import.meta.env.VITE_LOCATION_API_KET}`
      );
      const place = response.data.results[0]?.formatted;
      set({ address: place });
    } catch (error) {
      console.error("Reverse geocoding error:", error);
    }
  },

  initNetworkInfo: () => {
    const updateNetwork = () => {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

      if (connection) {
        set({
          networkInfo: {
            type: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
          },
        });
      }
    };

    updateNetwork();
    navigator.connection?.addEventListener("change", updateNetwork);

    return () => {
      navigator.connection?.removeEventListener("change", updateNetwork);
    };
  },

  runBackgroundTask: () => {
    if ("scheduler" in window && "postTask" in window.scheduler) {
      window.scheduler.postTask(() =>
        set({ bgTaskMessage: "Background task completed: synced local data." })
      );
    } else {
      setTimeout(() => {
        set({ bgTaskMessage: "Background sync simulated." });
      }, 2000);
    }
  },

  setShowTips: (val) => set({ showTips: val }),
}));
