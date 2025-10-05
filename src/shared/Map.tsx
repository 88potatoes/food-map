import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";

export type LocationPin = {
  id: string;
  name: string;
  address?: string;
  lat: number;
  lng: number;
  reelUrl?: string;
};

type MapProps = {
  locations: LocationPin[];
};

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Map({ locations }: MapProps) {
  const center = useMemo(() => {
    if (!locations.length) return { lat: 0, lng: 0 };
    const avgLat =
      locations.reduce((sum, l) => sum + l.lat, 0) / locations.length;
    const avgLng =
      locations.reduce((sum, l) => sum + l.lng, 0) / locations.length;
    return { lat: avgLat, lng: avgLng };
  }, [locations]);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={12}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", borderRadius: 8 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="space-y-1">
              <div className="font-medium">{loc.name}</div>
              {loc.address ? (
                <div className="text-sm text-gray-600">{loc.address}</div>
              ) : null}
              {loc.reelUrl ? (
                <a
                  className="text-blue-600 underline text-sm"
                  href={loc.reelUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View reel
                </a>
              ) : null}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}


