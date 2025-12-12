import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";

export function useReverseGeocode() {
  const maps = useMapsLibrary("maps");
  const [geocoder, setGeocoder] = useState<any>(null);

  // Create geocoder once maps is available
  if (!geocoder && maps) {
    setGeocoder(new maps.Geocoder());
  }

  const latLngToAddress = useCallback(
    async (lat: number, lng: number) => {
      console.log("🟥 GEOCODER", geocoder);

      if (!geocoder) return null; // or wait until ready

      const res = await geocoder.geocode({ location: { lat, lng } });
      return res.results?.[0]?.formatted_address ?? null;
    },
    [geocoder],
  );

  return { latLngToAddress, ready: !!geocoder };
}
