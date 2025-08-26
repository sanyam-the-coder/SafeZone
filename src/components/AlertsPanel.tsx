import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Cloud, Construction, Navigation } from "lucide-react";

interface Alert {
  id: string;
  type: 'weather' | 'crime' | 'traffic' | 'construction';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  location: string;
  timestamp: string;
}

interface AlertsPanelProps {
  locationName?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const generateAlertsForLocation = (locationName: string = "Current Location", coordinates?: { lat: number; lng: number }): Alert[] => {
  const alertTypes = [
    {
      type: 'weather' as const,
      titles: ['Severe Weather Warning', 'Storm Alert', 'Heavy Rain Advisory', 'Wind Warning'],
      descriptions: ['Heavy rain and flooding expected in area', 'Thunderstorms approaching the region', 'Potential flooding in low-lying areas', 'Strong winds up to 45 mph expected']
    },
    {
      type: 'crime' as const,
      titles: ['Increased Police Activity', 'Security Alert', 'Police Investigation', 'Safety Advisory'],
      descriptions: ['Multiple police units responding to incident', 'Ongoing investigation in the area', 'Police presence increased for safety', 'Residents advised to stay vigilant']
    },
    {
      type: 'construction' as const,
      titles: ['Road Construction', 'Utility Work', 'Street Maintenance', 'Infrastructure Update'],
      descriptions: ['Lane closures expected until 6 PM', 'Water main repair work in progress', 'Scheduled road maintenance', 'Sidewalk construction ongoing']
    },
    {
      type: 'traffic' as const,
      titles: ['Traffic Incident', 'Road Closure', 'Heavy Traffic', 'Accident Report'],
      descriptions: ['Multi-vehicle accident reported', 'Main road temporarily closed', 'Unusually heavy traffic in area', 'Vehicle breakdown causing delays']
    }
  ];

  const severities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
  const timeStamps = ['2 min ago', '15 min ago', '45 min ago', '1 hour ago', '2 hours ago'];

  // Generate 2-4 random alerts
  const numAlerts = Math.floor(Math.random() * 3) + 2;
  const alerts: Alert[] = [];

  for (let i = 0; i < numAlerts; i++) {
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const titleIndex = Math.floor(Math.random() * alertType.titles.length);
    
    alerts.push({
      id: `${i + 1}`,
      type: alertType.type,
      severity: severities[Math.floor(Math.random() * severities.length)],
      title: alertType.titles[titleIndex],
      description: alertType.descriptions[titleIndex],
      location: locationName,
      timestamp: timeStamps[Math.floor(Math.random() * timeStamps.length)]
    });
  }

  return alerts;
};

export const AlertsPanel = ({ locationName = "Current Location", coordinates }: AlertsPanelProps) => {
  const alerts = generateAlertsForLocation(locationName, coordinates);
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'weather': return Cloud;
      case 'crime': return AlertTriangle;
      case 'construction': return Construction;
      default: return Navigation;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Live Safety Alerts</h3>
        <Badge variant="secondary" className="text-xs">
          {alerts.length} Active
        </Badge>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const IconComponent = getAlertIcon(alert.type);
          return (
            <div key={alert.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-5 h-5 ${
                    alert.severity === 'high' ? 'text-danger' : 
                    alert.severity === 'medium' ? 'text-warning' : 'text-primary'
                  }`} />
                  <div>
                    <h4 className="font-medium text-foreground">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground">{alert.location}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge variant={getSeverityVariant(alert.severity)} className="text-xs">
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                </div>
              </div>
              <p className="text-sm text-foreground">{alert.description}</p>
            </div>
          );
        })}
      </div>

    </Card>
  );
};