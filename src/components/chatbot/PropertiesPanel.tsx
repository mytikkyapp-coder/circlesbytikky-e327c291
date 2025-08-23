import React from 'react';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Node } from '@xyflow/react';
import { MessageProperties } from './properties/MessageProperties';
import { InputProperties } from './properties/InputProperties';
import { ConditionProperties } from './properties/ConditionProperties';
import { ApiCallProperties } from './properties/ApiCallProperties';
import { IntegrationProperties } from './properties/IntegrationProperties';
import { KnowledgeBaseProperties } from './properties/KnowledgeBaseProperties';
import { EndProperties } from './properties/EndProperties';

interface PropertiesPanelProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, newData: any) => void;
  onClose: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedNode,
  onUpdateNode,
  onClose,
}) => {
  if (!selectedNode) {
    return (
      <Card className="w-80 h-full rounded-none border-l border-r-0 border-t-0 border-b-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground text-sm py-8">
            Select a node to edit its properties
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderProperties = () => {
    const handleUpdate = (data: any) => {
      onUpdateNode(selectedNode.id, data);
    };

    switch (selectedNode.type) {
      case 'message':
        return <MessageProperties node={selectedNode} onUpdate={handleUpdate} />;
      case 'input':
        return <InputProperties node={selectedNode} onUpdate={handleUpdate} />;
      case 'condition':
        return <ConditionProperties node={selectedNode} onUpdate={handleUpdate} />;
      case 'apiCall':
        return <ApiCallProperties node={selectedNode} onUpdate={handleUpdate} />;
      case 'integration':
        return <IntegrationProperties node={selectedNode} onUpdate={handleUpdate} />;
      case 'knowledgeBase':
        return <KnowledgeBaseProperties node={selectedNode} onUpdate={handleUpdate} />;
      case 'end':
        return <EndProperties node={selectedNode} onUpdate={handleUpdate} />;
      default:
        return (
          <div className="space-y-4">
            <div className="text-sm font-medium">Node: {String(selectedNode.data.label || selectedNode.type)}</div>
            <div className="text-xs text-muted-foreground">Unknown node type</div>
          </div>
        );
    }
  };

  return (
    <Card className="w-80 h-full rounded-none border-l border-r-0 border-t-0 border-b-0 bg-gradient-to-b from-card to-card/50">
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ⚙️ Properties
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {String(selectedNode.data.label || selectedNode.type)}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-destructive/10 hover:text-destructive">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-4 pt-0">
            {renderProperties()}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};