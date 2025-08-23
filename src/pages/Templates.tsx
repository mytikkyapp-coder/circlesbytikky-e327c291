import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MessageSquare, MoreHorizontal, Edit, Copy, Trash2, Eye } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  content: string;
  variables: string[];
  usageCount: number;
  lastUsed?: string;
  createdAt: string;
}

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");

  const templates: Template[] = [
    {
      id: "1",
      name: "Welcome Message",
      description: "Greeting for new circle members",
      category: "Onboarding",
      content: "Welcome to {{circle_name}}, {{first_name}}! 🎉 We're excited to have you join our community. You'll receive exclusive updates and offers here.",
      variables: ["circle_name", "first_name"],
      usageCount: 234,
      lastUsed: "2024-01-22",
      createdAt: "2024-01-10"
    },
    {
      id: "2",
      name: "Sale Announcement",
      description: "Product sale and discount notifications",
      category: "Marketing",
      content: "🔥 FLASH SALE ALERT! Get {{discount_percent}}% off {{product_name}} for the next 24 hours. Use code: {{coupon_code}}. Shop now: {{shop_url}}",
      variables: ["discount_percent", "product_name", "coupon_code", "shop_url"],
      usageCount: 156,
      lastUsed: "2024-01-20",
      createdAt: "2024-01-08"
    },
    {
      id: "3",
      name: "Event Reminder",
      description: "Reminder for upcoming events or webinars",
      category: "Events",
      content: "📅 Don't forget! {{event_name}} is happening {{event_date}} at {{event_time}}. Join us: {{event_link}}",
      variables: ["event_name", "event_date", "event_time", "event_link"],
      usageCount: 89,
      lastUsed: "2024-01-18",
      createdAt: "2024-01-05"
    },
    {
      id: "4",
      name: "Survey Request",
      description: "Request for customer feedback and surveys",
      category: "Feedback",
      content: "Hi {{first_name}}, we'd love your feedback! 📝 Please take 2 minutes to complete our survey: {{survey_link}}. Your opinion matters to us!",
      variables: ["first_name", "survey_link"],
      usageCount: 67,
      lastUsed: "2024-01-15",
      createdAt: "2024-01-03"
    },
    {
      id: "5",
      name: "Order Confirmation",
      description: "Confirmation message for successful orders",
      category: "Transactional",
      content: "✅ Order confirmed! Thank you {{first_name}} for your purchase of {{product_name}}. Order #{{order_id}} will arrive by {{delivery_date}}.",
      variables: ["first_name", "product_name", "order_id", "delivery_date"],
      usageCount: 0,
      createdAt: "2024-01-24"
    }
  ];

  const categories = ["All", "Onboarding", "Marketing", "Events", "Feedback", "Transactional"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Onboarding": "bg-blue-100 text-blue-800",
      "Marketing": "bg-primary/10 text-primary",
      "Events": "bg-purple-100 text-purple-800",
      "Feedback": "bg-green-100 text-green-800",
      "Transactional": "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Message Templates</h1>
          <p className="text-muted-foreground mt-1">Create and manage reusable message templates</p>
        </div>
        <Link to="create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Template
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={getCategoryColor(template.category)}
                    >
                      {template.category}
                    </Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`${template.id}/edit`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Template
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Message Preview */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-xs font-medium text-muted-foreground">Preview</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {template.content.length > 120 
                    ? `${template.content.substring(0, 120)}...` 
                    : template.content
                  }
                </p>
              </div>

              {/* Variables */}
              {template.variables.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Variables ({template.variables.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.map((variable) => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        {`{{${variable}}}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Usage Stats */}
              <div className="flex items-center justify-between pt-2 border-t border-border text-sm">
                <span className="text-muted-foreground">
                  Used {template.usageCount} times
                </span>
                {template.lastUsed && (
                  <span className="text-muted-foreground">
                    Last used {new Date(template.lastUsed).toLocaleDateString()}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "Try adjusting your search terms or create a new template." : "Create your first message template to get started with automated messaging."}
            </p>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Template
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}