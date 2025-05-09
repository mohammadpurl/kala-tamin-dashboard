
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation } from 'lucide-react';

interface AddressMapProps {
  onSelectLocation: (location: { lat: number; lng: number; address?: string }) => void;
}

const AddressMap: React.FC<AddressMapProps> = ({ onSelectLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [manualAddress, setManualAddress] = useState('');
  
  useEffect(() => {
    // بررسی وجود توکن در localStorage
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  useEffect(() => {
    // اگر توکن نداریم، نقشه را نمایش نمی‌دهیم
    if (!mapboxToken || !mapContainer.current) return;
    
    // تنظیم توکن mapbox
    mapboxgl.accessToken = mapboxToken;
    
    // ایجاد نقشه
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [51.3890, 35.6892], // تهران به عنوان مرکز اولیه
      zoom: 12
    });
    
    // اضافه کردن کنترل‌های ناوبری
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // ایجاد مارکر
    marker.current = new mapboxgl.Marker({
      draggable: true,
      color: '#FF0000'
    })
    .setLngLat([51.3890, 35.6892])
    .addTo(map.current);
    
    // رویداد برای زمانی که کاربر مارکر را می‌کشد
    marker.current.on('dragend', () => {
      const lngLat = marker.current?.getLngLat();
      if (lngLat) {
        reverseGeocode(lngLat.lng, lngLat.lat);
      }
    });
    
    // رویداد کلیک روی نقشه برای جابجایی مارکر
    map.current.on('click', (e) => {
      marker.current?.setLngLat([e.lngLat.lng, e.lngLat.lat]);
      reverseGeocode(e.lngLat.lng, e.lngLat.lat);
    });
    
    // پاکسازی نقشه هنگام unmount
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);
  
  // تبدیل موقعیت مکانی به آدرس
  const reverseGeocode = async (lng: number, lat: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}&language=fa`
      );
      
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        setManualAddress(address);
        onSelectLocation({ lat, lng, address });
      }
    } catch (error) {
      console.error('خطا در دریافت آدرس:', error);
    }
  };
  
  // ذخیره توکن mapbox در localStorage
  const handleTokenSubmit = () => {
    localStorage.setItem('mapbox_token', mapboxToken);
    window.location.reload(); // بارگذاری مجدد صفحه برای اعمال توکن جدید
  };
  
  // تنظیم موقعیت فعلی کاربر
  const handleSetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: 15
          });
          marker.current?.setLngLat([longitude, latitude]);
          reverseGeocode(longitude, latitude);
        },
        (error) => {
          console.error('خطا در دریافت موقعیت:', error);
        }
      );
    }
  };
  
  if (!mapboxToken) {
    return (
      <div className="p-6 border rounded-md space-y-4">
        <h3 className="text-lg font-medium">تنظیم توکن Mapbox</h3>
        <p className="text-sm text-muted-foreground">
          برای استفاده از نقشه، نیاز به توکن عمومی Mapbox دارید. این توکن را می‌توانید از سایت
          <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary mx-1">
            Mapbox
          </a>
          دریافت کنید.
        </p>
        <div className="flex gap-2">
          <Input
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            placeholder="توکن عمومی Mapbox را وارد کنید"
            className="flex-1"
          />
          <Button onClick={handleTokenSubmit}>ذخیره</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="relative h-[400px] rounded-md border overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
        <div className="absolute top-2 left-2 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleSetCurrentLocation}
            title="موقعیت فعلی من"
          >
            <Navigation className="mr-1 h-4 w-4" />
            موقعیت من
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">آدرس انتخاب شده:</span>
        </div>
        <Input
          value={manualAddress}
          onChange={(e) => setManualAddress(e.target.value)}
          placeholder="آدرس دقیق را وارد کنید"
        />
        <p className="text-xs text-muted-foreground">
          می‌توانید آدرس را به صورت دستی ویرایش کنید یا روی نقشه نقطه مورد نظر را انتخاب کنید.
        </p>
      </div>
    </div>
  );
};

export default AddressMap;
