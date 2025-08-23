import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MoreHorizontal, 
  Settings, 
  Users, 
  BarChart3, 
  ExternalLink, 
  Crown, 
  ArrowRight,
  HeadphonesIcon,
  Megaphone,
  UserCheck,
  Truck,
  ShoppingBag
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface WorkspaceCardProps {
  workspace: {
    id: string;
    name: string;
    category: string;
    categoryName: string;
    description: string;
    avatar: string;
    plan: string;
    status: string;
    members: number;
    lastActive: string;
    color: string;
    [key: string]: any;
  };
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const navigate = useNavigate();

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Enterprise": return "bg-primary text-primary-foreground";
      case "Pro": return "bg-accent text-accent-foreground";
      case "Basic": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Paused": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "tech-support": return HeadphonesIcon;
      case "marketing": return Megaphone;
      case "hr-management": return UserCheck;
      case "dealers": return Truck;
      case "distributors": return ShoppingBag;
      default: return Settings;
    }
  };

  const IconComponent = getCategoryIcon(workspace.category);

  const getMetricInfo = () => {
    switch (workspace.category) {
      case "tech-support":
        return { label: "Tickets", value: workspace.tickets || 0 };
      case "marketing":
        return { label: "Campaigns", value: workspace.campaigns || 0 };
      case "hr-management":
        return { label: "Employees", value: workspace.employees || 0 };
      case "dealers":
        return { label: "Dealers", value: workspace.dealers || 0 };
      case "distributors":
        return { label: "Distributors", value: workspace.distributors || 0 };
      default:
        return { label: "Items", value: 0 };
    }
  };

  const metric = getMetricInfo();

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={workspace.avatar} alt={workspace.name} />
              <AvatarFallback>
                <IconComponent className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {workspace.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{workspace.description}</p>
              <Badge variant="outline" className="mt-1 text-xs">
                {workspace.categoryName}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate(`/workspace/${workspace.id}/dashboard`)}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/workspace/${workspace.id}/team`)}>
                <Users className="h-4 w-4 mr-2" />
                Manage Team
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/workspace/${workspace.id}/settings`)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/workspace/${workspace.id}/analytics`)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Status & Plan */}
        <div className="flex items-center justify-between">
          <Badge className={getPlanColor(workspace.plan)}>
            {workspace.plan}
            {workspace.plan === "Enterprise" && <Crown className="w-3 h-3 ml-1" />}
          </Badge>
          <Badge variant="outline" className={getStatusColor(workspace.status)}>
            {workspace.status}
          </Badge>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-foreground">{workspace.members}</div>
            <div className="text-xs text-muted-foreground">Team Members</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-foreground">{metric.value}</div>
            <div className="text-xs text-muted-foreground">{metric.label}</div>
          </div>
        </div>

        {/* Revenue */}
        {workspace.revenue && (
          <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
            <span className="text-sm font-medium text-foreground">Monthly Revenue</span>
            <span className="text-lg font-bold text-primary">{workspace.revenue}</span>
          </div>
        )}

        {/* Last Active */}
        <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-3">
          <span>Last active: {workspace.lastActive}</span>
          <Button 
            size="sm" 
            variant="ghost" 
            className="opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={() => navigate(`/workspace/${workspace.id}/dashboard`)}
          >
            Open
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}