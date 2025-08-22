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
    <Card className="w-64 h-full rounded-none border-r border-l-0 border-t-0 border-b-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Node Library</CardTitle>
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
                  className="w-full justify-start h-auto p-3 hover:bg-accent/50 transition-colors group"
                  onClick={() => handleNodeAdd(nodeType.type)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className={`p-2 rounded-lg bg-accent/30 group-hover:bg-accent/50 transition-colors`}>
                      <Icon className={`w-4 h-4 ${nodeType.color}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{nodeType.label}</div>
                      <div className="text-xs text-muted-foreground">{nodeType.description}</div>
                    </div>
                    <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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