import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Video, Download, ExternalLink, Clock, Users } from "lucide-react";

const KnowledgeKit = () => {
  const knowledgeItems = [
    {
      id: "meta-campaigns",
      title: "How Meta Campaigns Work",
      description: "Learn how to create, manage, and optimize Meta advertising campaigns for maximum ROI",
      type: "Guide",
      duration: "15 min read",
      difficulty: "Beginner",
      topics: ["Facebook Ads", "Instagram Ads", "Campaign Setup", "Targeting", "Budget Management"],
      icon: "📱",
      status: "Available"
    },
    {
      id: "circle-works",
      title: "How Circle Works",
      description: "Understanding the core concepts of circle management and community building",
      type: "Tutorial",
      duration: "20 min read",
      difficulty: "Beginner",
      topics: ["Community Building", "Member Management", "Engagement", "Growth Strategies"],
      icon: "🔵",
      status: "Available"
    },
    {
      id: "create-templates",
      title: "How to Create Templates",
      description: "Master the art of creating reusable templates for messages, campaigns, and workflows",
      type: "Workshop",
      duration: "30 min read",
      difficulty: "Intermediate",
      topics: ["Template Design", "Variables", "Personalization", "Best Practices"],
      icon: "📝",
      status: "Available"
    },
    {
      id: "launch-ai-ads",
      title: "How to Launch AI Ads",
      description: "Harness the power of AI to create and launch high-converting advertising campaigns",
      type: "Advanced Guide",
      duration: "45 min read",
      difficulty: "Advanced",
      topics: ["AI Targeting", "Automated Bidding", "Creative Generation", "Performance Optimization"],
      icon: "🤖",
      status: "Available"
    },
    {
      id: "build-chatbot",
      title: "How to Build ChatBot",
      description: "Step-by-step guide to building intelligent chatbots for customer service and engagement",
      type: "Technical Guide",
      duration: "60 min read",
      difficulty: "Advanced",
      topics: ["Bot Design", "Natural Language Processing", "Integrations", "Analytics"],
      icon: "💬",
      status: "Available"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Guide": return "bg-blue-100 text-blue-800";
      case "Tutorial": return "bg-purple-100 text-purple-800";
      case "Workshop": return "bg-orange-100 text-orange-800";
      case "Advanced Guide": return "bg-indigo-100 text-indigo-800";
      case "Technical Guide": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Knowledge Kit</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to make the most of our platform with comprehensive guides and tutorials
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">5</div>
            <div className="text-sm text-muted-foreground">Guides Available</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">170</div>
            <div className="text-sm text-muted-foreground">Minutes of Content</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">1,500+</div>
            <div className="text-sm text-muted-foreground">Users Trained</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Video className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">24/7</div>
            <div className="text-sm text-muted-foreground">Access Available</div>
          </CardContent>
        </Card>
      </div>

      {/* Knowledge Items */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Learning Resources</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {knowledgeItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="flex gap-2">
                    <Badge className={getDifficultyColor(item.difficulty)}>
                      {item.difficulty}
                    </Badge>
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.duration}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Topics Covered:</div>
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1">
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Can't find what you're looking for? Check out these additional resources for more help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Video Tutorials</div>
                <div className="text-sm text-muted-foreground">Watch step-by-step guides</div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Community Forum</div>
                <div className="text-sm text-muted-foreground">Connect with other users</div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Live Training</div>
                <div className="text-sm text-muted-foreground">Join weekly sessions</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeKit;