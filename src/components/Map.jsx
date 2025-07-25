import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = ({ lat, lon }) => {
  if (lat == null || lon == null) return <div className="h-screen flex justify-center items-center" ><p className="skeleton h-full w-full" ></p></div>;
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>You are here!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
