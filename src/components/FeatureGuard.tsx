import React from 'react';
import { useProjectFeatures } from '@/hooks/useProjectFeatures';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Crown, Zap, Clock } from 'lucide-react';

interface FeatureGuardProps {
  featureId: string;
  projectPlan: 'Standard' | 'Pro' | 'Enterprise';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureGuard: React.FC<FeatureGuardProps> = ({
  featureId,
  projectPlan,
  children,
  fallback
}) => {
  const { isFeatureEnabled, getFeatureStatus, allFeatures } = useProjectFeatures(projectPlan);
  const feature = allFeatures.find(f => f.id === featureId);
  const status = getFeatureStatus(featureId);

  if (status === 'enabled') {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'Pro': return Crown;
      case 'Enterprise': return Zap;
      default: return Lock;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Pro': return 'from-purple-500 to-purple-600';
      case 'Enterprise': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const PlanIcon = getPlanIcon(feature?.plan || 'Standard');

  return (
    <Card className="relative overflow-hidden border-dashed border-2 border-muted-foreground/20">
      <div className={`absolute inset-0 bg-gradient-to-br ${getPlanColor(feature?.plan || 'Standard')} opacity-5`}></div>
      <CardHeader className="text-center relative">
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${getPlanColor(feature?.plan || 'Standard')} rounded-full flex items-center justify-center`}>
            {status === 'coming-soon' ? (
              <Clock className="w-8 h-8 text-white" />
            ) : (
              <PlanIcon className="w-8 h-8 text-white" />
            )}
          </div>
        </div>
        <CardTitle className="text-xl">
          {status === 'coming-soon' ? 'Coming Soon' : `${feature?.plan} Feature`}
        </CardTitle>
        <CardDescription className="text-base">
          {feature?.name || 'Premium Feature'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center space-y-4 relative">
        <p className="text-muted-foreground">
          {feature?.description || 'This feature requires a higher plan.'}
        </p>
        
        {status === 'coming-soon' ? (
          <Badge className="bg-primary text-primary-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Available Soon
          </Badge>
        ) : (
          <div className="space-y-3">
            <Badge className={`bg-gradient-to-r ${getPlanColor(feature?.plan || 'Standard')} text-white`}>
              Requires {feature?.plan} Plan
            </Badge>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm">
                Learn More
              </Button>
              <Button size="sm">
                Upgrade Plan
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};