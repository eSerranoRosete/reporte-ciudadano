import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useGeolocated } from "react-geolocated";

interface IFProps {
  pinCoords: { lat: number; lng: number } | null;
  setPinCoords: (coords: IFProps["pinCoords"]) => void;
}

export const MapComponent = ({ pinCoords, setPinCoords }: IFProps) => {
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
  });

  if (!coords) return;

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        className="w-full h-full"
        defaultZoom={15}
        onClick={(e) => {
          const { latLng } = e.detail;
          setPinCoords(latLng);
        }}
        gestureHandling="greedy"
        disableDefaultUI
        defaultCenter={{ lat: coords.latitude, lng: coords.longitude }}
      >
        {pinCoords && <Marker position={pinCoords} />}
      </Map>
    </APIProvider>
  );
};
