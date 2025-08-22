import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Play,
  FileText,
  Users,
  Zap
} from "lucide-react";
import { helpArticlesData } from "./help/helpArticlesData";

interface HelpArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  popular?: boolean;
}

interface HelpCategory {
  name: string;
  icon: any;
  description: string;
  articleCount: number;
}

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const categories: HelpCategory[] = [
    {
      name: "Getting Started",
      icon: Zap,
      description: "Learn the basics of Circles by Tikky",
      articleCount: 8
    },
    {
      name: "Circles Management",
      icon: Users,
      description: "Create and manage your member circles",
      articleCount: 12
    },
    {
      name: "Campaigns",
      icon: MessageCircle,
      description: "Create and send WhatsApp campaigns",
      articleCount: 15
    },
    {
      name: "Templates",
      icon: FileText,
      description: "Build and customize message templates",
      articleCount: 9
    }
  ];

  const popularArticles = helpArticlesData;

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Help Center</h1>
          <p className="text-muted-foreground mt-2">Find answers to your questions and learn how to use Circles by Tikky</p>
        </div>
      </div>

      {/* Search */}
      <Card className="mx-auto max-w-2xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Card 
          className="text-center hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => window.open('https://docs.lovable.dev/', '_blank')}
        >
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-foreground">Documentation</h3>
            <p className="text-sm text-muted-foreground mt-1">Complete guides and API reference</p>
          </CardContent>
        </Card>

        <Card 
          className="text-center hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => window.location.href = '/support-tickets'}
        >
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground">Support Tickets</h3>
            <p className="text-sm text-muted-foreground mt-1">Create and track your support requests</p>
          </CardContent>
        </Card>

        <Card 
          className="text-center hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => window.open('mailto:support@tikky.com', '_blank')}
        >
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-foreground">Contact Support</h3>
            <p className="text-sm text-muted-foreground mt-1">Send us an email for detailed assistance</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/help/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <category.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.articleCount} articles</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Articles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            {searchQuery ? `Search Results (${filteredArticles.length})` : "Popular Articles"}
          </h2>
          {!searchQuery && (
            <Button variant="ghost" className="gap-2">
              View All
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((article) => (
            <Card 
              key={article.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/help/article/${article.id}`)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    {article.popular && (
                      <Badge className="text-xs bg-primary/10 text-primary">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Play className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </div>

                <h3 className="font-semibold text-foreground mb-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">Article</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && searchQuery && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or browse our categories above
              </p>
              <Button 
                variant="outline"
                onClick={() => setSearchQuery("")}
              >
                Browse All Articles
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Contact Support */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Still need help?</h3>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Start Live Chat
              </Button>
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" />
                Email Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}