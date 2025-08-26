import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface SafetyScoreProps {
  location: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  factors: Array<{
    name: string;
    score: number;
    status: 'safe' | 'warning' | 'danger';
  }>;
  isLoading?: boolean;
}

export const SafetyScore = ({ location, score, trend, factors, isLoading = false }: SafetyScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'safe';
    if (score >= 40) return 'warning';
    return 'danger';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 70) return 'SAFE';
    if (score >= 40) return 'CAUTION';
    return 'HIGH RISK';
  };

  const scoreColor = getScoreColor(score);
  const status = getScoreStatus(score);

  if (isLoading) {
    return (
      <Card className="p-6 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-muted rounded"></div>
            <div>
              <div className="h-5 bg-muted rounded w-32 mb-1"></div>
              <div className="h-3 bg-muted rounded w-24"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-40"></div>
            <div className="h-3 bg-muted rounded w-full"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Shield className={`w-8 h-8 ${scoreColor === 'safe' ? 'text-safe' : scoreColor === 'warning' ? 'text-warning' : 'text-danger'}`} />
          <div>
            <h3 className="text-lg font-semibold text-foreground">{location}</h3>
            <p className="text-sm text-muted-foreground">
              {score === 0 ? 'Search for location data' : 'Real-time Safety Analysis'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-safe" />
          ) : trend === 'down' ? (
            <TrendingDown className="w-4 h-4 text-danger" />
          ) : null}
          <Badge variant={scoreColor === 'safe' ? 'default' : scoreColor === 'warning' ? 'secondary' : 'destructive'}>
            {status}
          </Badge>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Safety Score</span>
          <span className="text-2xl font-bold text-foreground">
            {score === 0 ? '--' : `${score}/100`}
          </span>
        </div>
        <Progress 
          value={score} 
          className={`h-3 ${scoreColor === 'safe' ? '[&>div]:bg-safe' : scoreColor === 'warning' ? '[&>div]:bg-warning' : '[&>div]:bg-danger'}`}
        />
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground mb-3">Safety Factors</h4>
        {factors.map((factor, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                factor.status === 'safe' ? 'bg-safe' : 
                factor.status === 'warning' ? 'bg-warning' : 'bg-danger'
              }`} />
              <span className="text-sm font-medium">{factor.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {factor.score === 0 ? 'N/A' : `${factor.score}/100`}
              </span>
              <div className="w-16">
                <Progress 
                  value={factor.score} 
                  className={`h-1 ${
                    factor.status === 'safe' ? '[&>div]:bg-safe' : 
                    factor.status === 'warning' ? '[&>div]:bg-warning' : '[&>div]:bg-danger'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
        {score === 0 && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Search for a location to view real-time safety data
          </p>
        )}
      </div>
    </Card>
  );
};