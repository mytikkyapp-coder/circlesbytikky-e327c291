
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  Brain, 
  Zap, 
  Users,
  Star,
  Clock,
  Download,
  Play,
  ChevronRight,
  Filter,
  TrendingUp,
  Award,
  Target
} from "lucide-react";

interface KnowledgeKit {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  students: number;
  price: string;
  image: string;
  tags: string[];
  featured?: boolean;
  bestseller?: boolean;
}

export default function KnowledgeKits() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = [
    "All", "Business", "Marketing", "Technology", "AI & Automation", 
    "WhatsApp Business", "Customer Service", "Sales", "Analytics"
  ];

  const knowledgeKits: KnowledgeKit[] = [
    {
      id: "whatsapp-mastery",
      title: "WhatsApp Business Mastery Kit",
      description: "Complete guide to building successful WhatsApp business campaigns and automation",
      category: "WhatsApp Business",
      level: "Intermediate",
      duration: "4 weeks",
      rating: 4.9,
      students: 2847,
      price: "₹2,999",
      image: "/placeholder.svg",
      tags: ["WhatsApp API", "Automation", "Marketing", "CRM"],
      featured: true,
      bestseller: true
    },
    {
      id: "ai-chatbot-builder",
      title: "AI Chatbot Builder Pro Kit",
      description: "Learn to build intelligent chatbots using latest GPT models and automation tools",
      category: "AI & Automation",
      level: "Advanced",
      duration: "6 weeks",
      rating: 4.8,
      students: 1923,
      price: "₹4,999",
      image: "/placeholder.svg",
      tags: ["GPT-5", "Chatbots", "AI", "Automation"],
      featured: true
    },
    {
      id: "crm-optimization",
      title: "CRM Optimization Toolkit",
      description: "Strategies and tools to maximize your customer relationship management efficiency",
      category: "Customer Service",
      level: "Intermediate",
      duration: "3 weeks",
      rating: 4.7,
      students: 1534,
      price: "₹1,999",
      image: "/placeholder.svg",
      tags: ["CRM", "Customer Service", "Analytics", "Process"]
    },
    {
      id: "marketing-automation",
      title: "Marketing Automation Essentials",
      description: "Master automated marketing campaigns across multiple channels and platforms",
      category: "Marketing",
      level: "Beginner",
      duration: "5 weeks",
      rating: 4.6,
      students: 3421,
      price: "₹1,499",
      image: "/placeholder.svg",
      tags: ["Marketing", "Automation", "Campaigns", "ROI"]
    },
    {
      id: "business-analytics",
      title: "Business Analytics Deep Dive",
      description: "Transform data into actionable insights for business growth and decision making",
      category: "Analytics",
      level: "Advanced",
      duration: "8 weeks",
      rating: 4.8,
      students: 987,
      price: "₹3,999",
      image: "/placeholder.svg",
      tags: ["Analytics", "Data Science", "Business Intelligence", "KPIs"]
    },
    {
      id: "sales-funnel",
      title: "Sales Funnel Optimization Kit",
      description: "Build high-converting sales funnels with proven strategies and templates",
      category: "Sales",
      level: "Intermediate",
      duration: "4 weeks",
      rating: 4.7,
      students: 2156,
      price: "₹2,499",
      image: "/placeholder.svg",
      tags: ["Sales", "Conversion", "Funnel", "Growth"]
    }
  ];

  const filteredKits = knowledgeKits.filter(kit => {
    const matchesSearch = kit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kit.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || kit.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredKits = knowledgeKits.filter(kit => kit.featured);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Knowledge Kits</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive learning resources and toolkits to master business automation, 
            marketing strategies, and customer engagement
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/80 px-4 py-2 rounded-full">
            <Users className="w-4 h-4" />
            <span>10,000+ Students</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/80 px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>4.8 Average Rating</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/80 px-4 py-2 rounded-full">
            <Award className="w-4 h-4 text-primary" />
            <span>Industry Certified</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search knowledge kits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Kits */}
      {!searchQuery && selectedCategory === "All" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Featured Knowledge Kits</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredKits.map((kit) => (
              <Card 
                key={kit.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20"
                onClick={() => navigate(`/knowledge-kits/${kit.id}`)}
              >
                <div className="relative">
                  <img 
                    src={kit.image} 
                    alt={kit.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {kit.bestseller && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500">
                      <Award className="w-3 h-3 mr-1" />
                      Bestseller
                    </Badge>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={getLevelColor(kit.level)}>
                      {kit.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{kit.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{kit.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{kit.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {kit.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {kit.students.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-lg font-bold text-primary">{kit.price}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {kit.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full gap-2">
                    <Play className="w-4 h-4" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Knowledge Kits */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">
            {searchQuery ? `Search Results (${filteredKits.length})` : "All Knowledge Kits"}
          </h2>
          <div className="text-sm text-muted-foreground">
            {filteredKits.length} kits available
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKits.map((kit) => (
            <Card 
              key={kit.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/knowledge-kits/${kit.id}`)}
            >
              <div className="relative">
                <img 
                  src={kit.image} 
                  alt={kit.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                {kit.bestseller && (
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-xs">
                    Bestseller
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className={`text-xs ${getLevelColor(kit.level)}`}>
                    {kit.level}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{kit.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-base leading-tight">{kit.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">{kit.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {kit.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {kit.students.toLocaleString()}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{kit.price}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredKits.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No knowledge kits found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or browse different categories
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Show All Kits
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Ready to Transform Your Business?</h3>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful businesses who have accelerated their growth with our knowledge kits
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="gap-2">
                <Target className="w-5 h-5" />
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Download Catalog
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
