import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SafetyMap, SafetyMapRef } from "@/components/SafetyMap";
import { SafetyScore } from "@/components/SafetyScore";
import { AlertsPanel } from "@/components/AlertsPanel";
import { IncidentReportForm } from "@/components/IncidentReportForm";
import { fetchSafetyData, geocodeLocation, SafetyData, LocationCoordinates } from "@/services/safetyDataService";

const Index = () => {
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [shouldGetLocation, setShouldGetLocation] = useState(false);
  const [safetyData, setSafetyData] = useState<SafetyData | null>(null);
  const [currentCoordinates, setCurrentCoordinates] = useState<LocationCoordinates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<SafetyMapRef>(null);

  const handleSearch = async (location: string) => {
    setSearchLocation(location);
    setShowMap(true);
    await fetchSafetyDataForLocation(location);
  };

  const handleGetStarted = () => {
    setShowMap(true);
  };

  const handleMyLocation = () => {
    if (showMap && mapRef.current) {
      mapRef.current.getCurrentLocation();
    } else {
      setShowMap(true);
      setShouldGetLocation(true);
    }
  };

  const fetchSafetyDataForLocation = async (locationName: string) => {
    setIsLoading(true);
    try {
      const coordinates = await geocodeLocation(locationName);
      if (coordinates) {
        setCurrentCoordinates(coordinates);
        const data = await fetchSafetyData(coordinates);
        setSafetyData(data);
      }
    } catch (error) {
      console.error('Error fetching safety data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationUpdate = async (lat: number, lng: number, name?: string) => {
    const coordinates: LocationCoordinates = {
      lat,
      lng,
      name: name || `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
    };
    
    setCurrentCoordinates(coordinates);
    setIsLoading(true);
    
    try {
      const data = await fetchSafetyData(coordinates);
      setSafetyData(data);
    } catch (error) {
      console.error('Error fetching safety data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldGetLocation && showMap && mapRef.current) {
      mapRef.current.getCurrentLocation();
      setShouldGetLocation(false);
    }
  }, [shouldGetLocation, showMap, mapRef.current]);

  const defaultSafetyData: SafetyData = {
    location: "Select a location",
    score: 0,
    trend: 'stable',
    factors: [
      { name: 'Crime Rate', score: 0, status: 'warning' },
      { name: 'Traffic Safety', score: 0, status: 'warning' },
      { name: 'Weather Conditions', score: 0, status: 'warning' },
      { name: 'Emergency Response', score: 0, status: 'warning' },
      { name: 'Street Lighting', score: 0, status: 'warning' },
    ],
    dangerZones: []
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={handleSearch}
        onShowIncidents={() => setShowIncidentForm(true)}
        onLogoClick={() => setShowMap(false)}
        onMyLocation={handleMyLocation}
      />
      
      {!showMap ? (
        <HeroSection onGetStarted={handleGetStarted} />
      ) : (
        <main className="container mx-auto py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SafetyMap 
                ref={mapRef} 
                searchLocation={searchLocation} 
                onLocationUpdate={handleLocationUpdate}
                dangerZones={safetyData?.dangerZones || []}
              />
            </div>
            
            <div className="space-y-6">
              <SafetyScore 
                {...(safetyData || defaultSafetyData)} 
                isLoading={isLoading}
              />
              <AlertsPanel 
                locationName={currentCoordinates?.name}
                coordinates={currentCoordinates ? { lat: currentCoordinates.lat, lng: currentCoordinates.lng } : undefined}
              />
            </div>
          </div>
        </main>
      )}

      <IncidentReportForm 
        isOpen={showIncidentForm}
        onClose={() => setShowIncidentForm(false)}
      />
    </div>
  );
};

export default Index;
