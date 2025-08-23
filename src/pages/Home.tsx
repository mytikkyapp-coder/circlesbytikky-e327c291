import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  MessageCircle, 
  Zap, 
  Video,
  Plus
} from "lucide-react";

export default function Home() {
  // Mock stats data
  const totalMessages = 12547;
  const totalSpent = 25890;

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20 p-8 border border-primary/20">
        <div className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Welcome to Your Business Platform
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              Streamline your business operations with WhatsApp API, automated workflows, and powerful analytics across multiple sectors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <a href="/my-projects">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Project
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/project-features">
                  Explore Features
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl opacity-50"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 border-green-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Messages Sent</h3>
                <p className="text-2xl font-bold text-foreground">{totalMessages.toLocaleString()}</p>
                <p className="text-xs text-green-600 font-medium">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Spent</h3>
                <p className="text-2xl font-bold text-foreground">₹{totalSpent.toLocaleString()}</p>
                <p className="text-xs text-blue-600 font-medium">+8% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Features */}
      <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Meta Calling API</CardTitle>
              <CardDescription>Advanced voice calling features coming soon</CardDescription>
            </div>
            <Badge variant="secondary" className="ml-auto bg-amber-100 text-amber-800">
              Coming Soon
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get ready for integrated voice calling capabilities directly through WhatsApp Business API. 
            Enable voice conversations with your customers for enhanced support and engagement.
          </p>
          <Button variant="outline" className="w-full sm:w-auto">
            Get Notified When Available
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}