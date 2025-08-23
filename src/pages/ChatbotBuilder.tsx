
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
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

import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FlowsDashboard } from '@/components/chatbot/FlowsDashboard';
import { ChatbotHeader } from '@/components/chatbot/ChatbotHeader';
import { ChatbotRightSidebar } from '@/components/chatbot/ChatbotRightSidebar';
import { NodeLibrary } from '@/components/chatbot/NodeLibrary';
import { PropertiesPanel } from '@/components/chatbot/PropertiesPanel';
import { ChatbotPreview } from '@/components/chatbot/ChatbotPreview';
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
  const { projectId } = useParams();
  const isProjectContext = Boolean(projectId);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [currentFlow, setCurrentFlow] = useState<string | null>(null);

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
        return { label: 'Knowledge Base', model: 'gpt-5-mini-2025-08-07', query: 'Answer user questions based on the context' };
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

  const renderDashboard = () => (
    <FlowsDashboard 
      onCreateFlow={() => {
        setShowDashboard(false);
        setCurrentFlow('new-flow');
      }}
      onEditFlow={(flowId) => {
        setShowDashboard(false);
        setCurrentFlow(flowId);
      }}
    />
  );

  const renderBuilder = () => (
    <div className={`${isProjectContext ? 'h-[calc(100vh-120px)]' : 'h-screen'} flex flex-col bg-gradient-to-br from-background via-background to-primary/5`}>
      <ChatbotHeader 
        currentFlow={currentFlow}
        onBackToDashboard={() => setShowDashboard(true)}
        onPreview={() => setShowPreview(true)}
      />
      
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Node Library - Responsive visibility */}
        <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
          <NodeLibrary onAddNode={addNode} />
        </div>
        
        <div className="flex-1 relative min-w-0 overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-background w-full h-full"
          >
            <Controls 
              className="bg-card border border-border rounded-lg shadow-lg !left-2 !bottom-2 sm:!left-4 sm:!bottom-4"
              showInteractive={false}
            />
            <MiniMap 
              className="bg-card border border-border rounded-lg shadow-lg !right-2 !bottom-2 sm:!right-4 sm:!bottom-4 !w-32 !h-24 sm:!w-48 sm:!h-32"
              nodeStrokeWidth={3}
              nodeColor="hsl(var(--primary))"
              maskColor="hsl(var(--muted) / 0.5)"
            />
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={24} 
              size={1.5}
              color="hsl(var(--primary) / 0.1)"
              className="opacity-60"
            />
          </ReactFlow>
          
          {/* Mobile Node Library - Floating FAB */}
          <div className="lg:hidden absolute bottom-4 left-4 z-10">
            <Button
              onClick={() => setShowPropertiesPanel(!showPropertiesPanel)}
              className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-primary hover:bg-primary/90 shadow-lg"
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>
        </div>

        {/* Properties Panel - Responsive positioning */}
        {showPropertiesPanel && (
          <div className={`
            ${isProjectContext 
              ? 'absolute lg:relative right-0 top-0 h-full w-80 sm:w-96 lg:w-80 xl:w-96 z-20 lg:z-auto' 
              : 'absolute lg:relative right-0 top-0 h-full w-80 sm:w-96 lg:w-80 xl:w-96 z-20 lg:z-auto'
            }
            ${showPropertiesPanel && !isProjectContext ? 'lg:block' : ''}
            ${showPropertiesPanel && isProjectContext ? 'xl:block' : ''}
            bg-card/95 backdrop-blur-sm lg:bg-card lg:backdrop-blur-none
            border-l border-border shadow-xl lg:shadow-none
          `}>
            <PropertiesPanel
              selectedNode={selectedNode}
              onUpdateNode={updateNodeData}
              onClose={() => setShowPropertiesPanel(false)}
            />
          </div>
        )}

        {/* Mobile overlay when properties panel is open */}
        {showPropertiesPanel && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/20 z-10"
            onClick={() => setShowPropertiesPanel(false)}
          />
        )}
      </div>

      <ChatbotPreview 
        open={showPreview}
        onOpenChange={setShowPreview}
      />
    </div>
  );

  if (showDashboard) {
    return isProjectContext ? renderDashboard() : (
      <Layout>
        {renderDashboard()}
      </Layout>
    );
  }

  return isProjectContext ? renderBuilder() : (
    <Layout>
      {renderBuilder()}
    </Layout>
  );
};

export default ChatbotBuilder;
