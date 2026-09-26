import * as Location from 'expo-location';

export interface GPSCoords {
  latitude: number;
  longitude: number;
}

export const LocationService = {
  getRealLocation: async (): Promise<GPSCoords> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('[LocationService] Location permission denied, using default');
        return { latitude: 41.311081, longitude: 69.240562 };
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      console.log('[LocationService] Got real GPS:', location.coords.latitude, location.coords.longitude);
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (err) {
      console.warn('[LocationService] Failed to get GPS coordinates:', err);
      return { latitude: 41.311081, longitude: 69.240562 };
    }
  },
};
