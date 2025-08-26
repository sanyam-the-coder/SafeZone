import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, MapPin, Clock } from "lucide-react";

interface IncidentReportFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IncidentReportForm = ({ isOpen, onClose }: IncidentReportFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    severity: '',
    anonymous: true
  });
  const [suggestions, setSuggestions] = useState<Array<{place_name: string, center: [number, number]}>>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const mapboxToken = 'pk.eyJ1Ijoic2FueWFtMSIsImEiOiJjbWVoYzJrbnMwMnExMmxwdjA1Z2IwZjF0In0.S_N15Rr3wWNxFF0ur7totg';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit to your backend
    console.log('Incident report:', formData);
    
    toast({
      title: "Report Submitted",
      description: "Thank you for helping keep our community safe. Your report has been submitted for review.",
    });
    
    // Reset form
    setFormData({
      type: '',
      location: '',
      description: '',
      severity: '',
      anonymous: true
    });
    
    onClose();
  };

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
      fetchSuggestions(formData.location);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData.location]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'location') {
      setIsPopoverOpen(true);
    }
  };

  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
    setIsPopoverOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span>Report Safety Incident</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="incident-type">Incident Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crime">Crime</SelectItem>
                <SelectItem value="accident">Accident</SelectItem>
                <SelectItem value="natural-disaster">Natural Disaster</SelectItem>
                <SelectItem value="health-hazard">Health Hazard</SelectItem>
                <SelectItem value="infrastructure">Infrastructure Issue</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <Popover open={isPopoverOpen && suggestions.length > 0} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
                    <Input
                      id="location"
                      placeholder="Enter location or address"
                      value={formData.location}
                      onChange={(e) => {
                        handleInputChange('location', e.target.value);
                        setIsPopoverOpen(true);
                      }}
                      onFocus={() => setIsPopoverOpen(suggestions.length > 0)}
                      className="pl-10"
                      required
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
                          onClick={() => handleLocationSelect(suggestion.place_name)}
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">Severity Level</Label>
            <Select value={formData.severity} onValueChange={(value) => handleInputChange('severity', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Minor concern</SelectItem>
                <SelectItem value="medium">Medium - Moderate risk</SelectItem>
                <SelectItem value="high">High - Immediate attention needed</SelectItem>
                <SelectItem value="critical">Critical - Emergency response required</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide details about the incident..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Reports are submitted anonymously and reviewed within 24 hours</span>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="danger"
              className="flex-1"
              disabled={!formData.type || !formData.location || !formData.description || !formData.severity}
            >
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};