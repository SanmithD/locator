# 🧭 Smart Travel Assistant

A React-based PWA that provides real-time **location tracking**, **network diagnostics**, and **battery status monitoring** – perfect for travelers and field agents.

![Smart Travel Assistant Screenshot](./path-to-screenshot.png)

## 🚀 Features

- 📍 **Your Location**
  - Latitude, longitude, and reverse geocoded address using device geolocation.
- 📶 **Network Status**
  - Displays connection type (4G/5G), downlink speed, and round-trip time (RTT).
- 🔋 **Battery Monitor**
  - Real-time battery level updates and charging status using the Battery API.
- 🔁 **Background Sync**
  - Simulates syncing of data or configurations in the background.
- 🗺️ **Interactive Map**
  - Uses Leaflet with React Leaflet to show your current position on a live map.

---

## 🧰 Tech Stack

| Tech              | Purpose                              |
|-------------------|--------------------------------------|
| **React 19**      | Core UI Framework                    |
| **Vite**          | Frontend build tool                  |
| **TailwindCSS**   | Utility-first styling                |
| **Zustand**       | State management                     |
| **React Leaflet** | Interactive maps                     |
| **Lucide React**  | Icon library                         |
| **Axios**         | HTTP requests                        |
| **DaisyUI**       | Tailwind component library           |

---

## 📁 Folder Structure

```bash
src/
│
├── components/             # Reusable UI components
│   ├── BatteryStatus.jsx   # Battery logic and UI
│   └── Map.jsx             # Leaflet-based map component
│
├── store/
│   └── UseLocation.js      # Zustand store for all app state
│
├── App.jsx                 # Main application file
├── index.css               # Global styles
└── main.jsx                # App entry point

```
### Setup Instructions
```bash
# 1. Clone the repository
git clone https://github.com/your-username/locator.git
cd locator

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
npm run build

```

### Create a .env file in the root for storing environment-specific variables (if needed for APIs)
VITE_SOME_KEY=value

### Created by
Create by Sanmith Devadiga


