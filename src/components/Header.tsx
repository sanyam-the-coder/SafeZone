
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Shield, MapPin, AlertTriangle } from "lucide-react";
import safetyIcon from "@/assets/safety-icon.jpg";

interface HeaderProps {
  onSearch: (location: string) => void;
  onShowIncidents: () => void;
  onLogoClick: () => void;
  onMyLocation?: () => void;
}

export const Header = ({ onSearch, onShowIncidents, onLogoClick, onMyLocation }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{place_name: string, center: [number, number]}>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const mapboxToken = 'pk.eyJ1Ijoic2FueWFtMSIsImEiOiJjbWVoYzJrbnMwMnExMmxwdjA1Z2IwZjF0In0.S_N15Rr3wWNxFF0ur7totg';

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&limit=5`
      );
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (location: string) => {
    setSearchQuery(location);
    setIsOpen(false);
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onLogoClick}
          >
            <img src={safetyIcon} alt="SafeZone" className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="text-2xl font-bold text-primary">SafeZone</h1>
              <p className="text-xs text-muted-foreground">Stay Safe, Stay Informed</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Popover open={isOpen && suggestions.length > 0} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
                    <Input
                      type="text"
                      placeholder="Search location for safety data..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsOpen(true);
                      }}
                      onFocus={() => setIsOpen(suggestions.length > 0)}
                      className="pl-10 pr-4"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 max-h-60 overflow-y-auto" align="start">
                  <div className="p-1">
                    {suggestions.length === 0 ? (
                      <div className="p-2 text-sm text-muted-foreground">No locations found.</div>
                    ) : (
                      suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex items-center px-2 py-2 text-sm cursor-pointer rounded hover:bg-muted"
                          onClick={() => handleSearch(suggestion.place_name)}
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          {suggestion.place_name}
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </form>

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onMyLocation}
            >
              <MapPin className="w-4 h-4" />
              My Location
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onShowIncidents}
            >
              <AlertTriangle className="w-4 h-4" />
              Report Incident
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
