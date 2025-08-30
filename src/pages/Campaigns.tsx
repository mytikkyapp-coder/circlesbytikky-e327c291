import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Send, Eye, MoreHorizontal, Play, Pause, Copy } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link, useParams } from "react-router-dom";

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: "draft" | "scheduled" | "sending" | "completed" | "paused";
  circle: string;
  sent: number;
  delivered: number;
  opened: number;
  replied: number;
  scheduledDate?: string;
  createdAt: string;
}

export default function Campaigns() {
  const { projectId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "Summer Sale Announcement",
      description: "20% off summer collection for VIP customers",
      status: "completed",
      circle: "VIP Customers",
      sent: 342,
      delivered: 338,
      opened: 267,
      replied: 43,
      createdAt: "2024-01-20"
    },
    {
      id: "2",
      name: "Weekly Newsletter #45",
      description: "Product updates and industry insights",
      status: "sending",
      circle: "Newsletter Subscribers",
      sent: 856,
      delivered: 843,
      opened: 521,
      replied: 12,
      createdAt: "2024-01-22"
    },
    {
      id: "3",
      name: "Beta Feature Launch",
      description: "New AI assistant feature announcement",
      status: "scheduled",
      circle: "Beta Testers",
      sent: 0,
      delivered: 0,
      opened: 0,
      replied: 0,
      scheduledDate: "2024-01-25T10:00:00Z",
      createdAt: "2024-01-23"
    },
    {
      id: "4",
      name: "Re-engagement Campaign",
      description: "Win back inactive users with special offer",
      status: "draft",
      circle: "Inactive Users",
      sent: 0,
      delivered: 0,
      opened: 0,
      replied: 0,
      createdAt: "2024-01-24"
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      "draft": "bg-gray-100 text-gray-800",
      "scheduled": "bg-blue-100 text-blue-800",
      "sending": "bg-yellow-100 text-yellow-800",
      "completed": "bg-green-100 text-green-800",
      "paused": "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getEngagementRate = (opened: number, sent: number) => {
    if (sent === 0) return "0%";
    return `${Math.round((opened / sent) * 100)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground mt-1">Create and manage your WhatsApp campaigns</p>
        </div>
        <Link to={useParams().projectId ? "create" : "/campaigns/create"}>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">Filter by Status</Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={getStatusColor(campaign.status)}
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardDescription>{campaign.description}</CardDescription>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Circle: {campaign.circle}</span>
                    <span>•</span>
                    <span>Created {new Date(campaign.createdAt).toLocaleDateString()}</span>
                    {campaign.scheduledDate && (
                      <>
                        <span>•</span>
                        <span>Scheduled for {new Date(campaign.scheduledDate).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={projectId ? `${campaign.id}/analytics` : `/campaigns/${campaign.id}/analytics`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Analytics
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    {campaign.status === "sending" && (
                      <DropdownMenuItem>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Campaign
                      </DropdownMenuItem>
                    )}
                    {campaign.status === "paused" && (
                      <DropdownMenuItem>
                        <Play className="w-4 h-4 mr-2" />
                        Resume Campaign
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{campaign.sent.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{campaign.delivered.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{campaign.opened.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Opened</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{campaign.replied.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Replied</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{getEngagementRate(campaign.opened, campaign.sent)}</div>
                  <div className="text-xs text-muted-foreground">Open Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No campaigns found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "Try adjusting your search terms or create a new campaign." : "Create your first campaign to start reaching your audience with targeted messaging."}
            </p>
            <Link to={projectId ? "create" : "/campaigns/create"}>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Your First Campaign
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}