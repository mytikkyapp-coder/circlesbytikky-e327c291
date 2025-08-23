import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Sparkles, Brain } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  nodeType?: string;
}

interface ChatbotPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChatbotPreview: React.FC<ChatbotPreviewProps> = ({ open, onOpenChange }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      nodeType: 'message'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you said "${inputValue}". This is a preview of your GPT-powered chatbot. In the live version, this would be processed by your configured AI model to provide intelligent responses.`,
        sender: 'bot',
        timestamp: new Date(),
        nodeType: 'knowledgeBase'
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg h-[600px] flex flex-col bg-gradient-to-b from-card to-card/80">
        <DialogHeader className="border-b border-border/50 pb-4">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Chatbot Preview
              </span>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="text-xs bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  GPT Enabled
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 shadow-sm">
                    {message.nodeType === 'knowledgeBase' ? (
                      <Brain className="w-4 h-4 text-primary" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary" />
                    )}
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-primary to-accent text-white'
                      : 'bg-gradient-to-r from-muted/50 to-card border border-border/50'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.nodeType === 'knowledgeBase' && message.sender === 'bot' && (
                    <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                      <Brain className="w-3 h-3" />
                      <span>AI Response</span>
                    </div>
                  )}
                </div>

                {message.sender === 'user' && (
                  <div className="p-2 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 shadow-sm">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 shadow-sm">
                  <Brain className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="bg-gradient-to-r from-muted/50 to-card border border-border/50 p-3 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border/50 p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-gradient-to-r from-background to-muted/30 border-primary/20 focus:border-primary/40"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This is a preview. Live chatbot will use your configured GPT models.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};