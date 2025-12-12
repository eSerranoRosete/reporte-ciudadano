import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useMemo } from "react";

/**
 * Custom hook to perform reverse geocoding (lat/lng to address).
 * @returns {Function} A function that takes a LatLngLiteral and returns a promise for the formatted address string.
 * @returns {null} If the geocoding library is not yet loaded.
 */
export const useReverseGeocode = () => {
  // 1. Load the 'geocoding' library
  const geocodingLib = useMapsLibrary("geocoding");

  // 2. Create a memoized Geocoder instance once the library is loaded
  const geocoder = useMemo(
    () => (geocodingLib ? new geocodingLib.Geocoder() : null),
    [geocodingLib],
  );

  // 3. Define the stable function to perform the request
  const getStreetAddress = useCallback(
    async (latLng: any): Promise<string | null> => {
      if (!geocoder) {
        // Should not happen if called after checking the hook's readiness
        console.error("Geocoder not initialized. Is the maps library loaded?");
        return null;
      }

      try {
        const response = await geocoder.geocode({ location: latLng });

        // Check for results and return the formatted address
        if (response.results && response.results.length > 0) {
          return response.results[0].formatted_address;
        }
        return "Address not found";
      } catch (e) {
        console.error("Geocoder failed:", e);
        return "Error retrieving address";
      }
    },
    [geocoder],
  );

  // Return the function only if the geocoder is ready
  return geocoder ? getStreetAddress : null;
};
