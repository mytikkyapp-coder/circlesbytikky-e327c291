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
    return (
      <div className="space-y-4">
        <div className="text-sm font-medium">Node: {String(selectedNode.data.label || selectedNode.type)}</div>
        <div className="text-xs text-muted-foreground">Properties panel coming soon...</div>
      </div>
    );
  };

  return (
    <Card className="w-80 h-full rounded-none border-l border-r-0 border-t-0 border-b-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {String(selectedNode.data.label || 'Node Properties')}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
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