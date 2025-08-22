import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  Minimize2, 
  Maximize2, 
  X, 
  Phone,
  Clock,
  CheckCircle2,
  Check
} from "lucide-react";

interface WhatsAppMessage {
  id: string;
  sender: "user" | "customer";
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  phoneNumber?: string;
  customerName?: string;
}

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  sent: number;
  delivered: number;
  read: number;
  replies: number;
  totalCost: number;
}

interface WhatsAppLiveChatProps {
  projectId?: string;
}

export default function WhatsAppLiveChat({ projectId }: WhatsAppLiveChatProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"messages" | "campaigns">("messages");
  const [messageInput, setMessageInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages: WhatsAppMessage[] = [
    {
      id: "1",
      sender: "customer",
      content: "Hi! I'm interested in your fitness coaching program. Can you tell me more about the pricing?",
      timestamp: new Date(Date.now() - 300000),
      status: "read",
      phoneNumber: "+1 (555) 123-4567",
      customerName: "Sarah Johnson"
    },
    {
      id: "2",
      sender: "user",
      content: "Hello Sarah! Thanks for your interest. Our basic coaching program starts at $99/month and includes weekly check-ins and a custom workout plan.",
      timestamp: new Date(Date.now() - 240000),
      status: "read"
    },
    {
      id: "3",
      sender: "customer",
      content: "That sounds great! Do you offer any trial period?",
      timestamp: new Date(Date.now() - 180000),
      status: "delivered",
      phoneNumber: "+1 (555) 123-4567",
      customerName: "Sarah Johnson"
    }
  ];

  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "New Year Fitness Challenge",
      status: "active",
      sent: 1250,
      delivered: 1198,
      read: 856,
      replies: 127,
      totalCost: 45.50
    },
    {
      id: "2",
      name: "Premium Plan Promotion",
      status: "completed",
      sent: 890,
      delivered: 867,
      read: 623,
      replies: 89,
      totalCost: 32.40
    },
    {
      id: "3",
      name: "Weekend Workshop Invite",
      status: "paused",
      sent: 456,
      delivered: 445,
      read: 312,
      replies: 45,
      totalCost: 16.60
    }
  ];

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    console.log("Sending WhatsApp message:", messageInput);
    setMessageInput("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "read": return <CheckCircle2 className="w-3 h-3 text-blue-500" />;
      case "delivered": return <Check className="w-3 h-3 text-muted-foreground" />;
      default: return <Clock className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg bg-green-600 hover:bg-green-700"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <Card className="h-full shadow-2xl border-2">
        {/* Header */}
        <CardHeader className="pb-3 cursor-pointer bg-green-600 text-white rounded-t-lg" onClick={() => setIsMinimized(!isMinimized)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">WhatsApp Business</CardTitle>
                <CardDescription className="text-white/80 text-sm">
                  Live Chat & Campaigns
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 h-full flex flex-col">
            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              <Button
                variant={activeTab === "messages" ? "default" : "ghost"}
                className="flex-1 rounded-none border-r"
                onClick={() => setActiveTab("messages")}
              >
                Messages
              </Button>
              <Button
                variant={activeTab === "campaigns" ? "default" : "ghost"}
                className="flex-1 rounded-none"
                onClick={() => setActiveTab("campaigns")}
              >
                Campaigns
              </Button>
            </div>

            {activeTab === "messages" ? (
              <>
                {/* Messages */}
                <ScrollArea className="flex-1 p-3" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="max-w-[70%]">
                          {message.sender === 'customer' && (
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs bg-green-100 text-green-800">
                                  {message.customerName?.slice(0, 2) || "C"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">
                                {message.customerName} • {message.phoneNumber}
                              </span>
                            </div>
                          )}
                          <div
                            className={`rounded-lg p-3 ${
                              message.sender === 'user'
                                ? 'bg-green-600 text-white'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className={`text-xs ${
                                message.sender === 'user' 
                                  ? 'text-white/70' 
                                  : 'text-muted-foreground'
                              }`}>
                                {formatTime(message.timestamp)}
                              </span>
                              {message.sender === 'user' && getStatusIcon(message.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Type a WhatsApp message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button size="icon" onClick={sendMessage} disabled={!messageInput.trim()} className="bg-green-600 hover:bg-green-700">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Campaigns Tab */
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{campaign.name}</h4>
                        <Badge className={getCampaignStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Sent</p>
                          <p className="font-semibold">{campaign.sent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Delivered</p>
                          <p className="font-semibold text-green-600">{campaign.delivered.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Read</p>
                          <p className="font-semibold text-blue-600">{campaign.read.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Replies</p>
                          <p className="font-semibold text-primary">{campaign.replies.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total Cost</span>
                          <span className="font-bold text-green-600">${campaign.totalCost}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Response Rate</span>
                          <span className="font-medium">
                            {((campaign.replies / campaign.sent) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}