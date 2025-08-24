
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Play, 
  Download, 
  Star, 
  Clock, 
  Users, 
  CheckCircle,
  Award,
  BookOpen,
  Video,
  FileText,
  Headphones,
  Share2,
  Heart,
  ShoppingCart
} from "lucide-react";

export default function KnowledgeKitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on id
  const kit = {
    id: "whatsapp-mastery",
    title: "WhatsApp Business Mastery Kit",
    description: "Complete guide to building successful WhatsApp business campaigns and automation",
    fullDescription: "Master the art of WhatsApp Business with our comprehensive kit. Learn to create automated campaigns, build customer relationships, and scale your business using WhatsApp's powerful features.",
    category: "WhatsApp Business",
    level: "Intermediate",
    duration: "4 weeks",
    rating: 4.9,
    totalRatings: 847,
    students: 2847,
    price: "₹2,999",
    originalPrice: "₹4,999",
    image: "/placeholder.svg",
    instructor: "Sarah Johnson",
    instructorTitle: "WhatsApp Business Expert",
    instructorRating: 4.9,
    instructorStudents: 15420,
    tags: ["WhatsApp API", "Automation", "Marketing", "CRM"],
    features: [
      "Complete WhatsApp Business API setup",
      "Advanced automation strategies",
      "Customer segmentation techniques",
      "ROI tracking and analytics",
      "24/7 support and community access"
    ],
    curriculum: [
      {
        week: 1,
        title: "WhatsApp Business Fundamentals",
        lessons: 8,
        duration: "2.5 hours",
        topics: ["Account Setup", "Business Profile", "Catalog Management", "Quick Replies"]
      },
      {
        week: 2,
        title: "Automation & API Integration",
        lessons: 12,
        duration: "4 hours",
        topics: ["WhatsApp API", "Webhook Setup", "Automated Messages", "Flow Builder"]
      },
      {
        week: 3,
        title: "Advanced Marketing Strategies",
        lessons: 10,
        duration: "3.5 hours",
        topics: ["Campaign Design", "Personalization", "A/B Testing", "Customer Journey"]
      },
      {
        week: 4,
        title: "Analytics & Optimization",
        lessons: 6,
        duration: "2 hours",
        topics: ["Performance Metrics", "ROI Analysis", "Optimization", "Scaling"]
      }
    ],
    resources: [
      { type: "video", count: 36, label: "Video Lessons" },
      { type: "document", count: 15, label: "PDF Guides" },
      { type: "template", count: 8, label: "Templates" },
      { type: "tool", count: 5, label: "Tools & Scripts" }
    ]
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Navigation */}
      <Button 
        variant="ghost" 
        onClick={() => navigate("/knowledge-kits")}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Knowledge Kits
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section */}
          <Card>
            <div className="relative">
              <img 
                src={kit.image} 
                alt={kit.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black/40 rounded-t-lg flex items-center justify-center">
                <Button size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  Preview Course
                </Button>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getLevelColor(kit.level)}>{kit.level}</Badge>
                <Badge variant="outline">{kit.category}</Badge>
              </div>
              <CardTitle className="text-2xl">{kit.title}</CardTitle>
              <CardDescription className="text-base">{kit.fullDescription}</CardDescription>
              
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{kit.rating}</span>
                  <span className="text-muted-foreground">({kit.totalRatings} ratings)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{kit.students.toLocaleString()} students</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Tabs Content */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {kit.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {kit.resources.map((resource, index) => {
                      const icons = {
                        video: Video,
                        document: FileText,
                        template: BookOpen,
                        tool: Award
                      };
                      const Icon = icons[resource.type as keyof typeof icons];
                      
                      return (
                        <div key={index} className="text-center p-4 border border-border rounded-lg">
                          <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-xl font-bold text-foreground">{resource.count}</div>
                          <div className="text-sm text-muted-foreground">{resource.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-4">
              {kit.curriculum.map((week, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Week {week.week}: {week.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {week.lessons} lessons
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {week.duration}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {week.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="outline">{topic}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="instructor" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground">{kit.instructor}</h3>
                      <p className="text-muted-foreground mb-3">{kit.instructorTitle}</p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{kit.instructorRating} instructor rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{kit.instructorStudents.toLocaleString()} students</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Certified WhatsApp Business expert with 8+ years of experience helping businesses 
                        scale through automated messaging and customer engagement strategies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-2xl font-bold">{kit.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({kit.totalRatings} reviews)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 min-w-[60px]">
                          <span>{stars}</span>
                          <Star className="w-4 h-4 text-yellow-500" />
                        </div>
                        <Progress 
                          value={stars === 5 ? 80 : stars === 4 ? 15 : stars === 3 ? 3 : stars === 2 ? 1 : 1} 
                          className="flex-1" 
                        />
                        <span className="text-sm text-muted-foreground min-w-[40px]">
                          {stars === 5 ? '80%' : stars === 4 ? '15%' : '3%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Purchase Card */}
          <Card className="sticky top-6">
            <CardHeader>
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">{kit.price}</span>
                  <span className="text-lg text-muted-foreground line-through">{kit.originalPrice}</span>
                </div>
                <Badge className="bg-red-100 text-red-800 mb-4">40% Off Limited Time</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <Button className="w-full gap-2" size="lg">
                <ShoppingCart className="w-4 h-4" />
                Enroll Now
              </Button>
              
              <Button variant="outline" className="w-full gap-2">
                <Heart className="w-4 h-4" />
                Add to Wishlist
              </Button>
              
              <Button variant="ghost" className="w-full gap-2">
                <Share2 className="w-4 h-4" />
                Share Course
              </Button>
              
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{kit.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Level:</span>
                  <Badge className={getLevelColor(kit.level)}>{kit.level}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Access:</span>
                  <span>Lifetime</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Certificate:</span>
                  <span>Yes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Courses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "AI Chatbot Builder Pro", price: "₹4,999", rating: 4.8 },
                { title: "CRM Optimization Toolkit", price: "₹1,999", rating: 4.7 }
              ].map((course, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{course.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{course.rating}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
