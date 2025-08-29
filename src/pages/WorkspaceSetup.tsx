import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Settings, Users, BarChart3 } from "lucide-react";

const workspaceDetails = {
  'tech-support': {
    name: 'Tech Support Hub',
    description: 'Comprehensive customer service and technical support management platform',
    icon: '🎧',
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Ticket Management System',
      'Live Chat Integration',
      'Knowledge Base',
      'Performance Analytics',
      'Team Collaboration Tools',
      'Customer Feedback System'
    ],
    steps: [
      'Configure support channels',
      'Set up team structure',
      'Import knowledge base',
      'Configure automation rules'
    ],
    stats: {
      'Response Time': '< 2 minutes',
      'Resolution Rate': '95%',
      'Customer Satisfaction': '4.8/5'
    }
  },
  'marketing': {
    name: 'Marketing Hub',
    description: 'Advanced campaign management and lead generation platform',
    icon: '📈',
    color: 'from-purple-500 to-pink-500',
    features: [
      'Campaign Builder',
      'Lead Scoring',
      'Email Automation',
      'Social Media Management',
      'Analytics Dashboard',
      'A/B Testing Tools'
    ],
    steps: [
      'Connect marketing channels',
      'Set up lead scoring',
      'Create campaign templates',
      'Configure tracking pixels'
    ],
    stats: {
      'Lead Generation': '+250%',
      'Conversion Rate': '12.5%',
      'ROI': '4.2x'
    }
  },
  'sales': {
    name: 'Sales Operations',
    description: 'Complete sales pipeline and customer relationship management',
    icon: '💼',
    color: 'from-green-500 to-emerald-500',
    features: [
      'Pipeline Management',
      'Contact Management',
      'Deal Tracking',
      'Sales Forecasting',
      'Activity Logging',
      'Performance Reports'
    ],
    steps: [
      'Import customer data',
      'Set up sales stages',
      'Configure notifications',
      'Create sales templates'
    ],
    stats: {
      'Close Rate': '68%',
      'Sales Cycle': '14 days',
      'Deal Value': '+35%'
    }
  },
  'hr-management': {
    name: 'HR Management',
    description: 'Complete human resources and employee management system',
    icon: '👥',
    color: 'from-indigo-500 to-purple-500',
    features: [
      'Employee Database',
      'Payroll Management',
      'Performance Reviews',
      'Leave Management',
      'Recruitment Tools',
      'Training Modules'
    ],
    steps: [
      'Import employee data',
      'Set up organizational chart',
      'Configure payroll settings',
      'Create evaluation forms'
    ],
    stats: {
      'Employee Satisfaction': '92%',
      'Retention Rate': '89%',
      'Processing Time': '-60%'
    }
  },
  'business': {
    name: 'Business Intelligence',
    description: 'Advanced analytics, reporting, and business insights platform',
    icon: '📊',
    color: 'from-orange-500 to-red-500',
    features: [
      'Real-time Dashboards',
      'Custom Reports',
      'Data Visualization',
      'Predictive Analytics',
      'KPI Monitoring',
      'Export Tools'
    ],
    steps: [
      'Connect data sources',
      'Create custom dashboards',
      'Set up alerts',
      'Configure automated reports'
    ],
    stats: {
      'Data Accuracy': '99.5%',
      'Report Generation': 'Real-time',
      'Decision Speed': '+40%'
    }
  },
  'dealers': {
    name: 'Dealer Network',
    description: 'Comprehensive dealer network management and coordination platform',
    icon: '🚛',
    color: 'from-yellow-500 to-orange-500',
    features: [
      'Dealer Portal',
      'Inventory Tracking',
      'Order Management',
      'Commission Tracking',
      'Training Resources',
      'Performance Analytics'
    ],
    steps: [
      'Register dealer network',
      'Set up territories',
      'Configure commission structure',
      'Create training materials'
    ],
    stats: {
      'Network Growth': '+85%',
      'Order Accuracy': '98%',
      'Dealer Satisfaction': '4.7/5'
    }
  }
};

export default function WorkspaceSetup() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const workspace = workspaceDetails[categoryId as keyof typeof workspaceDetails];
  
  if (!workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <h2 className="text-2xl font-semibold mb-4">Workspace Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The workspace category you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/my-workspace')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Workspaces
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/my-workspace')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workspaces
        </Button>
      </div>

      {/* Workspace Overview */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${workspace.color} p-8 text-white`}>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{workspace.icon}</div>
            <div>
              <h1 className="text-3xl font-bold">{workspace.name}</h1>
              <p className="text-white/90 text-lg">{workspace.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Included Features
            </CardTitle>
            <CardDescription>
              Everything you need to get started with your {workspace.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workspace.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Setup Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              Setup Steps
            </CardTitle>
            <CardDescription>
              Follow these steps to configure your workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workspace.steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            Quick Stats
          </CardTitle>
          <CardDescription>
            Key metrics and performance indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(workspace.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                <div className="text-sm text-muted-foreground">{key}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Ready to Get Started?</h3>
              <p className="text-muted-foreground">
                Set up your {workspace.name} workspace and start boosting your productivity
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                size="lg" 
                className={`bg-gradient-to-r ${workspace.color} text-white hover:opacity-90`}
                onClick={() => navigate('/create-project')}
              >
                Start Setup
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/help')}
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}