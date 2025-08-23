import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  MessageCircle, 
  Zap, 
  Video,
  Plus,
  Bot,
  Facebook,
  BarChart3,
  Check,
  Clock
} from "lucide-react";

export default function Home() {
  // Mock stats data
  const totalMessages = 12547;
  const totalSpent = 25890;

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-blue-100/30 to-purple-50 dark:from-blue-950/20 dark:via-blue-900/10 dark:to-purple-950/20 p-8 lg:p-12">
        <div className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4">
                📱 WhatsApp Business Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Manage Your Business{" "}
                <span className="text-blue-600 dark:text-blue-400">Projects</span>{" "}
                Seamlessly
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Connect WhatsApp API, integrate Facebook Login, and manage up to 10 business projects with advanced automation and analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project (3/10)
                </Button>
                <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50">
                  👥 My Projects
                </Button>
                <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50">
                  📺 Watch Demo
                </Button>
              </div>
            </div>

            {/* Platform Integrations */}
            <div className="lg:justify-self-end">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4">Platform Integrations</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">WhatsApp API</p>
                        <p className="text-sm text-green-700 dark:text-green-300">Business messaging</p>
                      </div>
                    </div>
                    <Badge className="bg-green-200 text-green-800 border-green-300">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Facebook className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100">Facebook Login</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">Social authentication</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-200 text-blue-800 border-blue-300">Connected</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200/50">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                    <p className="text-2xl font-bold text-green-600">2</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Members</p>
                    <p className="text-2xl font-bold text-blue-600">490</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Core Features</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Streamline your business operations with our powerful automation tools
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* WhatsApp Broadcast */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10 border-green-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">WhatsApp Broadcast</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Send mass messages to your customers instantly with our powerful WhatsApp API integration
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* AI Flow Builder */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10 border-purple-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">AI Flow Builder</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Create intelligent chatbots and automation workflows with our visual flow builder
            </p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Build Flows
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Meta Ads */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 border-blue-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Meta Ads</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Launch high-converting Facebook and Instagram ads with AI-powered optimization
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Launch Ads
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="text-center p-8">
          <div className="text-4xl font-bold text-foreground mb-2">3/10</div>
          <p className="text-muted-foreground font-medium">Projects</p>
        </Card>
        
        <Card className="text-center p-8">
          <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
          <p className="text-muted-foreground font-medium">API Uptime</p>
        </Card>
        
        <Card className="text-center p-8">
          <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
          <p className="text-muted-foreground font-medium">Support</p>
        </Card>
      </div>

      {/* Usage Stats */}
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