import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ChatbotToolbar } from '@/components/chatbot/ChatbotToolbar';
import { NodeLibrary } from '@/components/chatbot/NodeLibrary';
import { PropertiesPanel } from '@/components/chatbot/PropertiesPanel';
import { MessageNode } from '@/components/chatbot/nodes/MessageNode';
import { InputNode } from '@/components/chatbot/nodes/InputNode';
import { ConditionNode } from '@/components/chatbot/nodes/ConditionNode';
import { ApiCallNode } from '@/components/chatbot/nodes/ApiCallNode';
import { IntegrationNode } from '@/components/chatbot/nodes/IntegrationNode';
import { KnowledgeBaseNode } from '@/components/chatbot/nodes/KnowledgeBaseNode';
import { EndNode } from '@/components/chatbot/nodes/EndNode';

const nodeTypes = {
  message: MessageNode,
  input: InputNode,
  condition: ConditionNode,
  apiCall: ApiCallNode,
  integration: IntegrationNode,
  knowledgeBase: KnowledgeBaseNode,
  end: EndNode,
};

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'message',
    position: { x: 250, y: 100 },
    data: { 
      label: 'Welcome Message',
      message: 'Hello! How can I help you today?',
      isStart: true
    },
  },
];

const initialEdges: Edge[] = [];

const ChatbotBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }
    }, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setShowPropertiesPanel(true);
  }, []);

  const addNode = (nodeType: string, position: { x: number; y: number }) => {
    const id = `${nodeType}_${Date.now()}`;
    const newNode: Node = {
      id,
      type: nodeType,
      position,
      data: getDefaultNodeData(nodeType),
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const getDefaultNodeData = (nodeType: string) => {
    switch (nodeType) {
      case 'message':
        return { label: 'New Message', message: 'Enter your message here...' };
      case 'input':
        return { label: 'User Input', placeholder: 'Enter your response...', inputType: 'text' };
      case 'condition':
        return { label: 'Condition', condition: 'user_input == "yes"', trueLabel: 'Yes', falseLabel: 'No' };
      case 'apiCall':
        return { label: 'API Call', endpoint: 'https://api.example.com', method: 'POST' };
      case 'integration':
        return { label: 'Integration', service: 'webhook', url: '' };
      case 'knowledgeBase':
        return { label: 'Knowledge Base', provider: 'chatgpt', query: '' };
      case 'end':
        return { label: 'End Conversation', message: 'Thank you for using our chatbot!' };
      default:
        return { label: 'New Node' };
    }
  };

  const updateNodeData = (nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
    if (selectedNode?.id === nodeId) {
      setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, ...newData } });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <ChatbotToolbar />
      
      <div className="flex-1 flex">
        <NodeLibrary onAddNode={addNode} />
        
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-background"
          >
            <Controls 
              className="bg-card border border-border rounded-lg shadow-lg"
              showInteractive={false}
            />
            <MiniMap 
              className="bg-card border border-border rounded-lg shadow-lg"
              nodeStrokeWidth={3}
              nodeColor="hsl(var(--primary))"
              maskColor="hsl(var(--muted) / 0.5)"
            />
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1}
              color="hsl(var(--border))"
            />
          </ReactFlow>
        </div>

        {showPropertiesPanel && (
          <PropertiesPanel
            selectedNode={selectedNode}
            onUpdateNode={updateNodeData}
            onClose={() => setShowPropertiesPanel(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ChatbotBuilder;