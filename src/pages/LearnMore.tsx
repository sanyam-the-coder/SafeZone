import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { 
  Shield, 
  MapPin, 
  Database, 
  Eye, 
  Users, 
  AlertTriangle, 
  Phone, 
  Info,
  Target,
  Lock,
  MessageSquare,
  CheckCircle,
  Circle,
  AlertCircle,
  Clock,
  Lightbulb,
  Car,
  Cloud,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Header 
        onSearch={() => {}}
        onShowIncidents={() => {}}
        onLogoClick={() => navigate('/')}
      />
      
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl font-bold text-foreground">
            Learn More About <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">SafeZone</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how SafeZone keeps you safe with real-time data, AI-powered insights, and community collaboration.
          </p>
        </div>

        {/* Safety Scoring System */}
        <Card className="bg-white/95 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Safety Scoring System
            </CardTitle>
            <CardDescription>
              Understanding how we calculate safety scores on a 0-100 scale
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Data Sources</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-danger" />
                    <span className="text-sm">Crime statistics & incident reports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-warning" />
                    <span className="text-sm">Emergency response times</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-safe" />
                    <span className="text-sm">Street lighting conditions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-warning" />
                    <span className="text-sm">Traffic accidents & road safety</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-primary" />
                    <span className="text-sm">Weather conditions</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Data Weighting</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Real-time data</span>
                    <Badge variant="default">70%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Historical patterns</span>
                    <Badge variant="secondary">30%</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Recent incidents and current conditions have higher impact on safety scores
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Legend & Interpretation */}
        <Card className="bg-white/95 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Map Legend & Interpretation
            </CardTitle>
            <CardDescription>
              How to read SafeZone maps and understand safety indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 border-safe/20 bg-safe/5">
                <div className="flex items-center gap-3 mb-2">
                  <Circle className="w-4 h-4 fill-safe text-safe" />
                  <span className="font-semibold text-foreground">Safe Zones</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Score: 80-100</p>
                <p className="text-xs">Low crime rates, good lighting, quick emergency response</p>
              </Card>
              <Card className="p-4 border-warning/20 bg-warning/5">
                <div className="flex items-center gap-3 mb-2">
                  <Circle className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-semibold text-foreground">Caution Areas</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Score: 50-79</p>
                <p className="text-xs">Moderate risk, stay alert and avoid late hours</p>
              </Card>
              <Card className="p-4 border-danger/20 bg-danger/5">
                <div className="flex items-center gap-3 mb-2">
                  <Circle className="w-4 h-4 fill-danger text-danger" />
                  <span className="font-semibold text-foreground">High-Risk Zones</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Score: 0-49</p>
                <p className="text-xs">Higher crime rates, avoid if possible, travel in groups</p>
              </Card>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Reading Heatmaps</h4>
              <p className="text-sm text-muted-foreground">
                Darker areas indicate higher incident density. Use the layer controls to view specific data types 
                like crime, traffic accidents, or emergency response coverage.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Sources & Privacy */}
        <Card className="bg-white/95 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary" />
              Data Sources & Privacy
            </CardTitle>
            <CardDescription>
              Transparency in data collection and your privacy protection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Public Data Sources</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Police departments and crime databases</li>
                  <li>• Weather APIs and meteorological services</li>
                  <li>• Traffic management systems</li>
                  <li>• Municipal infrastructure data</li>
                  <li>• Verified community reports</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Privacy Protection</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Location data is anonymized and encrypted</li>
                  <li>• No personal information stored with location data</li>
                  <li>• Data aggregated to protect individual privacy</li>
                  <li>• GDPR and CCPA compliant data handling</li>
                  <li>• You control what data you share</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Features */}
        <Card className="bg-white/95 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Community Features
            </CardTitle>
            <CardDescription>
              How the SafeZone community helps keep everyone safer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Safe Reporting</h4>
                <p className="text-sm text-muted-foreground">
                  Report incidents anonymously through our secure platform
                </p>
              </div>
              <div className="text-center p-4">
                <Activity className="w-8 h-8 text-safe mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Real-time Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Get live safety updates from community members
                </p>
              </div>
              <div className="text-center p-4">
                <CheckCircle className="w-8 h-8 text-warning mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Verification Process</h4>
                <p className="text-sm text-muted-foreground">
                  All reports verified through multiple sources
                </p>
              </div>
            </div>
            <Separator />
            <div className="bg-primary/5 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Community Guidelines</h4>
              <p className="text-sm text-muted-foreground">
                Our community follows strict guidelines to ensure accuracy and prevent misuse. 
                All reports are moderated and cross-referenced with official data sources.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Preparedness */}
        <Card className="bg-white/95 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-6 h-6 text-danger" />
              Emergency Preparedness
            </CardTitle>
            <CardDescription>
              Stay prepared and know what to do in emergency situations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Emergency Contacts</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-danger/5 rounded">
                    <span>Emergency Services</span>
                    <span className="font-mono">911</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/20 rounded">
                    <span>Poison Control</span>
                    <span className="font-mono">1-800-222-1222</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/20 rounded">
                    <span>Crisis Text Line</span>
                    <span className="font-mono">Text HOME to 741741</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Safety Tips</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Share your location with trusted contacts</li>
                  <li>• Trust your instincts and avoid unsafe areas</li>
                  <li>• Keep emergency contacts easily accessible</li>
                  <li>• Stay aware of your surroundings</li>
                  <li>• Have multiple exit strategies planned</li>
                </ul>
              </div>
            </div>
            <div className="bg-warning/5 p-4 rounded-lg border border-warning/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">In Dangerous Situations</h4>
                  <p className="text-sm text-muted-foreground">
                    If you feel unsafe, move to a well-lit, populated area. Contact authorities immediately 
                    and don't hesitate to call 911. Your safety is the top priority.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Capabilities */}
        <Card className="bg-white/95 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              App Capabilities
            </CardTitle>
            <CardDescription>
              Discover all the features that keep you safe and informed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <Eye className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Real-time Monitoring</h4>
                <p className="text-xs text-muted-foreground">24/7 safety data updates</p>
              </div>
              <div className="p-4 border rounded-lg">
                <MapPin className="w-6 h-6 text-safe mb-2" />
                <h4 className="font-semibold mb-1">Interactive Maps</h4>
                <p className="text-xs text-muted-foreground">Detailed safety visualization</p>
              </div>
              <div className="p-4 border rounded-lg">
                <AlertTriangle className="w-6 h-6 text-warning mb-2" />
                <h4 className="font-semibold mb-1">Incident Reports</h4>
                <p className="text-xs text-muted-foreground">Community-driven alerts</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Target className="w-6 h-6 text-danger mb-2" />
                <h4 className="font-semibold mb-1">AI Risk Assessment</h4>
                <p className="text-xs text-muted-foreground">Smart safety predictions</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Users className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Community Network</h4>
                <p className="text-xs text-muted-foreground">Collaborative safety data</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Phone className="w-6 h-6 text-danger mb-2" />
                <h4 className="font-semibold mb-1">Emergency Integration</h4>
                <p className="text-xs text-muted-foreground">Quick access to help</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center space-y-4 py-8">
          <h2 className="text-2xl font-bold text-foreground">Ready to Stay Safe?</h2>
          <p className="text-muted-foreground">Join thousands of users who trust SafeZone for their safety needs.</p>
          <Button 
            onClick={() => navigate('/')}
            variant="hero" 
            size="lg"
            className="shadow-xl"
          >
            <MapPin className="w-5 h-5" />
            Start Exploring
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;