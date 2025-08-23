import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Construction, Clock, Bell, ArrowRight, Sparkles } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
  features?: string[];
  estimatedDate?: string;
  showNotifyButton?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export function ComingSoon({ 
  title = "Coming Soon", 
  description = "This feature is currently under development and will be available soon.",
  features = [],
  estimatedDate,
  showNotifyButton = true,
  icon: Icon = Construction
}: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl mx-auto text-center border-dashed border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
        <CardHeader className="pb-6">
          <div className="mx-auto mb-6 p-4 bg-primary/10 rounded-full w-fit">
            <Icon className="w-12 h-12 text-primary animate-pulse" />
          </div>
          <div className="space-y-2">
            <Badge variant="outline" className="mb-2 border-primary/30 text-primary">
              <Clock className="w-3 h-3 mr-1" />
              In Development
            </Badge>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Upcoming Features
              </h3>
              <div className="grid gap-2 max-w-md mx-auto">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg text-sm"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {estimatedDate && (
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-primary">Expected Release:</strong> {estimatedDate}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            {showNotifyButton && (
              <Button variant="default" className="gap-2">
                <Bell className="w-4 h-4" />
                Notify Me When Ready
              </Button>
            )}
            <Button variant="outline" className="gap-2">
              <ArrowRight className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>

          <div className="text-xs text-muted-foreground pt-4 border-t border-border/50">
            We're working hard to bring you this feature. Stay tuned for updates!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}