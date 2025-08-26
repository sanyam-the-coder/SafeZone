import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, MapPin, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-safezone.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-foreground leading-tight">
                Stay Safe with
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> SafeZone</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Real-time safety insights, AI-powered risk assessment, and community-driven incident reporting 
                to keep you informed and secure wherever you go.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={onGetStarted}
                variant="hero" 
                size="lg"
                className="shadow-xl"
              >
                <MapPin className="w-5 h-5" />
                Explore Safety Map
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/learn-more')}
              >
                <Shield className="w-5 h-5" />
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <Card className="p-4 text-center bg-white/50 backdrop-blur-sm border-safe/20">
                <Shield className="w-8 h-8 text-safe mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </Card>
              <Card className="p-4 text-center bg-white/50 backdrop-blur-sm border-primary/20">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </Card>
              <Card className="p-4 text-center bg-white/50 backdrop-blur-sm border-warning/20">
                <TrendingUp className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="SafeZone Safety Dashboard" 
                className="rounded-2xl shadow-2xl border border-border/20"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform translate-x-4 translate-y-4 -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};