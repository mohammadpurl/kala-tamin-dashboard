
import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Geocode from 'react-geocode';

const containerStyle = {
  width: '100%',
  height: '400px'
};

// مرکز پیش‌فرض نقشه (تهران)
const defaultCenter = {
  lat: 35.6892,
  lng: 51.3890
};

interface GoogleMapPickerProps {
  apiKey: string;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
}

const GoogleMapPicker: React.FC<GoogleMapPickerProps> = ({ apiKey, onLocationSelect, initialLocation }) => {
  // تنظیم API کلید برای Geocoding
  React.useEffect(() => {
    Geocode.setApiKey(apiKey);
    Geocode.setLanguage("fa");
    Geocode.setRegion("ir");
  }, [apiKey]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [markerPosition, setMarkerPosition] = useState(initialLocation || defaultCenter);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleMapClick = useCallback(async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      
      setMarkerPosition({ lat, lng });
      
      try {
        // تبدیل مختصات به آدرس
        const response = await Geocode.fromLatLng(lat.toString(), lng.toString());
        const address = response.results[0].formatted_address;
        
        onLocationSelect({ lat, lng, address });
      } catch (error) {
        console.error("Error getting address from coordinates:", error);
        onLocationSelect({ lat, lng, address: "آدرس یافت نشد" });
      }
    }
  }, [onLocationSelect]);

  if (!isLoaded) return <div className="w-full h-64 bg-gray-200 animate-pulse flex items-center justify-center">در حال بارگذاری نقشه...</div>;

  return (
    <div className="rounded overflow-hidden border border-input">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialLocation || defaultCenter}
        zoom={14}
        onClick={handleMapClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapPicker;
