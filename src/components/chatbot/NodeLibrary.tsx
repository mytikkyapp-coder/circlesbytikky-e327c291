import React from 'react';
import { 
  MessageSquare, 
  Type, 
  GitBranch, 
  Zap, 
  Puzzle, 
  Brain, 
  StopCircle,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NodeLibraryProps {
  onAddNode: (nodeType: string, position: { x: number; y: number }) => void;
}

const nodeTypes = [
  {
    type: 'message',
    label: 'Message',
    icon: MessageSquare,
    description: 'Send a message to user',
    color: 'text-blue-500'
  },
  {
    type: 'input',
    label: 'User Input',
    icon: Type,
    description: 'Collect user response',
    color: 'text-green-500'
  },
  {
    type: 'condition',
    label: 'Condition',
    icon: GitBranch,
    description: 'Branch conversation flow',
    color: 'text-yellow-500'
  },
  {
    type: 'apiCall',
    label: 'API Call',
    icon: Zap,
    description: 'External API integration',
    color: 'text-purple-500'
  },
  {
    type: 'integration',
    label: 'Integration',
    icon: Puzzle,
    description: 'Third-party services',
    color: 'text-orange-500'
  },
  {
    type: 'knowledgeBase',
    label: 'Knowledge Base',
    icon: Brain,
    description: 'AI-powered responses',
    color: 'text-pink-500'
  },
  {
    type: 'end',
    label: 'End Node',
    icon: StopCircle,
    description: 'End conversation',
    color: 'text-red-500'
  }
];

export const NodeLibrary: React.FC<NodeLibraryProps> = ({ onAddNode }) => {
  const handleNodeAdd = (nodeType: string) => {
    // Add node at random position in the center area
    const position = {
      x: Math.random() * 400 + 200,
      y: Math.random() * 400 + 200,
    };
    onAddNode(nodeType, position);
  };

  return (
    <Card className="w-72 h-full rounded-none border-r border-l-0 border-t-0 border-b-0 bg-gradient-to-b from-card to-card/50">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          🎨 Node Library
        </CardTitle>
        <p className="text-xs text-muted-foreground">Drag & drop to build your flow</p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-2 p-4 pt-0">
            {nodeTypes.map((nodeType) => {
              const Icon = nodeType.icon;
              return (
                <Button
                  key={nodeType.type}
                  variant="ghost"
                  className="w-full justify-start h-auto p-4 hover:bg-gradient-to-r hover:from-accent/20 hover:to-primary/10 transition-all duration-300 group border border-transparent hover:border-primary/20 rounded-xl"
                  onClick={() => handleNodeAdd(nodeType.type)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 group-hover:from-accent/30 group-hover:to-primary/20 transition-all duration-300 shadow-sm`}>
                      <Icon className={`w-5 h-5 ${nodeType.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm group-hover:text-primary transition-colors">{nodeType.label}</div>
                      <div className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">{nodeType.description}</div>
                    </div>
                    <Plus className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};