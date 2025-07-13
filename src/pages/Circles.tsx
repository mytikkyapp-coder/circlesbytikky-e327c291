import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Circle {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  tags: string[];
  status: "active" | "paused";
  createdAt: string;
}

export default function Circles() {
  const [searchQuery, setSearchQuery] = useState("");

  const circles: Circle[] = [
    {
      id: "1",
      name: "VIP Customers",
      description: "High-value customers with premium access",
      memberCount: 342,
      tags: ["Paid", "Premium"],
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "Newsletter Subscribers",
      description: "Weekly newsletter and updates circle",
      memberCount: 1247,
      tags: ["Free", "Newsletter"],
      status: "active",
      createdAt: "2024-01-10"
    },
    {
      id: "3",
      name: "Beta Testers",
      description: "Early access to new features and testing",
      memberCount: 89,
      tags: ["Beta", "Testing"],
      status: "active",
      createdAt: "2024-01-08"
    },
    {
      id: "4",
      name: "Inactive Users",
      description: "Users who haven't engaged in 30+ days",
      memberCount: 523,
      tags: ["Inactive", "Re-engagement"],
      status: "paused",
      createdAt: "2024-01-05"
    }
  ];

  const filteredCircles = circles.filter(circle =>
    circle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    circle.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      "Paid": "bg-primary/10 text-primary",
      "Premium": "bg-purple-100 text-purple-800",
      "Free": "bg-blue-100 text-blue-800",
      "Newsletter": "bg-indigo-100 text-indigo-800",
      "Beta": "bg-orange-100 text-orange-800",
      "Testing": "bg-yellow-100 text-yellow-800",
      "Inactive": "bg-red-100 text-red-800",
      "Re-engagement": "bg-pink-100 text-pink-800"
    };
    return colors[tag] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Circles</h1>
          <p className="text-muted-foreground mt-1">Manage your member circles and segments</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Circle
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search circles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Circles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCircles.map((circle) => (
          <Card key={circle.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{circle.name}</CardTitle>
                  <CardDescription className="mt-1">{circle.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Circle
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="w-4 h-4 mr-2" />
                      Manage Members
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Circle
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Member Count */}
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {circle.memberCount.toLocaleString()} members
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {circle.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className={getTagColor(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Status and Date */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(circle.status)}
                  >
                    {circle.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Created {new Date(circle.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCircles.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No circles found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first circle"}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Circle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}