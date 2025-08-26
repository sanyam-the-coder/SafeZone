import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface SafetyMapProps {
  searchLocation?: string;
  onLocationUpdate?: (lat: number, lng: number, name?: string) => void;
  dangerZones?: Array<{
    lng: number;
    lat: number;
    type: 'safe' | 'warning' | 'danger';
    score: number;
    name: string;
    reason: string;
  }>;
}

export interface SafetyMapRef {
  getCurrentLocation: () => void;
  searchLocation: (location: string) => void;
}

export const SafetyMap = forwardRef<SafetyMapRef, SafetyMapProps>(({ searchLocation, onLocationUpdate, dangerZones = [] }, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapboxToken = 'pk.eyJ1Ijoic2FueWFtMSIsImEiOiJjbWVoYzJrbnMwMnExMmxwdjA1Z2IwZjF0In0.S_N15Rr3wWNxFF0ur7totg';
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(coords);
          if (map.current) {
            map.current.flyTo({
              center: coords,
              zoom: 14
            });
            // Add user location marker
            new mapboxgl.Marker({ color: '#0066FF' })
              .setLngLat(coords)
              .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Location</h3>'))
              .addTo(map.current);
            
            // Notify parent component about location update
            if (onLocationUpdate) {
              onLocationUpdate(position.coords.latitude, position.coords.longitude, 'Your Location');
            }
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const searchLocationOnMap = async (location: string) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxToken}&limit=1`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        if (map.current) {
          map.current.flyTo({
            center: [lng, lat],
            zoom: 12
          });
          
          // Add marker for searched location
          new mapboxgl.Marker({ color: '#FF6B35' })
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${data.features[0].place_name}</h3>`))
            .addTo(map.current);
          
          // Notify parent component about location update
          if (onLocationUpdate) {
            onLocationUpdate(lat, lng, data.features[0].place_name);
          }
        }
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    getCurrentLocation,
    searchLocation: searchLocationOnMap
  }));

  const addSafetyMarkers = () => {
    if (!map.current || dangerZones.length === 0) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker:not([data-user-marker])');
    existingMarkers.forEach(marker => marker.remove());

    dangerZones.forEach((zone) => {
      const color = zone.type === 'safe' ? 'hsl(120, 70%, 45%)' : 
                   zone.type === 'warning' ? 'hsl(45, 100%, 50%)' : 
                   'hsl(0, 85%, 55%)';
      
      new mapboxgl.Marker({ color })
        .setLngLat([zone.lng, zone.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="p-3 max-w-xs">
              <h3 class="font-semibold text-sm mb-1">${zone.name}</h3>
              <p class="text-xs mb-2">Safety Score: ${zone.score}/100</p>
              <p class="text-xs text-gray-600 mb-1">Status: ${zone.type.toUpperCase()}</p>
              <p class="text-xs text-gray-500">${zone.reason}</p>
            </div>
          `)
        )
        .addTo(map.current!);
    });
  };

  const initializeMap = () => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.006, 40.7128], // NYC
      zoom: 12,
      pitch: 45,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      if (dangerZones.length > 0) {
        addSafetyMarkers();
      }
    });
  };

  useEffect(() => {
    initializeMap();

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (searchLocation && map.current) {
      searchLocationOnMap(searchLocation);
    }
  }, [searchLocation]);

  // Update danger zones when they change
  useEffect(() => {
    if (map.current && map.current.loaded()) {
      addSafetyMarkers();
    }
  }, [dangerZones]);

  return (
    <div className="relative w-full h-[600px] mx-4 rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 z-10">
        <Button 
          onClick={getCurrentLocation}
          variant="glass"
          size="sm"
        >
          <MapPin className="w-4 h-4" />
          Find Me
        </Button>
      </div>
    </div>
  );
});

SafetyMap.displayName = 'SafetyMap';
