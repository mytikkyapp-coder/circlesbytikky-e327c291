import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, ThumbsUp, ThumbsDown } from "lucide-react";
import { helpArticlesData } from "./helpArticlesData";

export default function HelpArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const article = helpArticlesData.find(a => a.id === id);

  if (!article) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Article Not Found</h1>
        <p className="text-muted-foreground">The help article you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/help")}>
          Back to Help Center
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Navigation */}
      <Button 
        variant="ghost" 
        onClick={() => navigate("/help")}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Help Center
      </Button>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{article.category}</Badge>
          {article.popular && (
            <Badge className="bg-primary/10 text-primary">Popular</Badge>
          )}
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">{article.title}</h1>
        <p className="text-lg text-muted-foreground">{article.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime} read
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            Last updated: {article.lastUpdated}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <Card>
        <CardContent className="pt-6">
          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Was this article helpful?</h3>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="gap-2">
                <ThumbsUp className="w-4 h-4" />
                Yes, helpful
              </Button>
              <Button variant="outline" className="gap-2">
                <ThumbsDown className="w-4 h-4" />
                Needs improvement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Articles */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpArticlesData
              .filter(a => a.category === article.category && a.id !== article.id)
              .slice(0, 4)
              .map(relatedArticle => (
                <div 
                  key={relatedArticle.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/help/article/${relatedArticle.id}`)}
                >
                  <h4 className="font-medium text-foreground mb-1">{relatedArticle.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{relatedArticle.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{relatedArticle.category}</Badge>
                    <span className="text-xs text-muted-foreground">{relatedArticle.readTime}</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}