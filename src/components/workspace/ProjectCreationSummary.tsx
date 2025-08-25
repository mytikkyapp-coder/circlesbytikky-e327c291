
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target, Activity, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectCreationSummaryProps {
  selectedCategory: any;
  selectedSector: any;
  onBack: () => void;
}

export default function ProjectCreationSummary({ selectedCategory, selectedSector, onBack }: ProjectCreationSummaryProps) {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    console.log('Creating workspace:', { category: selectedCategory, sector: selectedSector });
    navigate('/create-project');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <div className={`w-16 h-16 bg-gradient-to-r ${selectedSector.gradient} rounded-xl flex items-center justify-center`}>
          <selectedSector.icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{selectedSector.name} Workspace</h3>
          <p className="text-muted-foreground">Category: {selectedCategory.name}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workspace Configuration</CardTitle>
          <CardDescription>
            Your workspace will be optimized for {selectedSector.name} businesses using {selectedCategory.name} tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Included Features</h4>
              <div className="space-y-1">
                {selectedSector.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Category Benefits</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Specialized {selectedCategory.name} tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Advanced analytics dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Team collaboration features</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack}>
          Back to Sectors
        </Button>
        <Button onClick={handleCreateProject} className={`bg-gradient-to-r ${selectedSector.gradient} text-white hover:opacity-90`}>
          <Plus className="w-4 h-4 mr-2" />
          Create Workspace
        </Button>
      </div>
    </div>
  );
}
