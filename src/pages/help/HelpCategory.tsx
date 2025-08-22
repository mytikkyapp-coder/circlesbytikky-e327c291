import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { helpArticlesData } from "./helpArticlesData";

export default function HelpCategory() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const categoryArticles = helpArticlesData.filter(
    article => article.category.toLowerCase().replace(/\s+/g, '-') === category
  );

  const categoryName = categoryArticles[0]?.category || "Category";

  if (categoryArticles.length === 0) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Category Not Found</h1>
        <p className="text-muted-foreground">The help category you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/help")}>
          Back to Help Center
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <Button 
        variant="ghost" 
        onClick={() => navigate("/help")}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Help Center
      </Button>

      {/* Category Header */}
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          {categoryName}
        </Badge>
        <h1 className="text-3xl font-bold text-foreground">{categoryName} Articles</h1>
        <p className="text-muted-foreground">
          {categoryArticles.length} article{categoryArticles.length !== 1 ? 's' : ''} in this category
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryArticles.map((article) => (
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
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </div>
              </div>

              <h3 className="font-semibold text-foreground mb-2">{article.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Updated {article.lastUpdated}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Related Categories */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Other Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from(new Set(helpArticlesData.map(a => a.category)))
              .filter(cat => cat !== categoryName)
              .map(cat => {
                const catArticles = helpArticlesData.filter(a => a.category === cat);
                const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
                
                return (
                  <div 
                    key={cat}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/help/category/${catSlug}`)}
                  >
                    <h4 className="font-medium text-foreground mb-1">{cat}</h4>
                    <p className="text-sm text-muted-foreground">
                      {catArticles.length} article{catArticles.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}