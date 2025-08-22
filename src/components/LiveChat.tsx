import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Minimize2, 
  Maximize2, 
  X, 
  User, 
  Clock,
  Phone,
  Video,
  Paperclip,
  Smile
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "customer";
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

interface ChatSession {
  id: string;
  customerName: string;
  customerPhone: string;
  status: "active" | "waiting" | "closed";
  lastMessage: string;
  unreadCount: number;
  timestamp: Date;
  messages: Message[];
}

interface LiveChatProps {
  projectId?: string;
}

export default function LiveChat({ projectId }: LiveChatProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatSessions: ChatSession[] = [
    {
      id: "1",
      customerName: "Sarah Johnson",
      customerPhone: "+1234567890",
      status: "active",
      lastMessage: "Hi, I have a question about your product...",
      unreadCount: 2,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      messages: [
        {
          id: "1",
          sender: "customer",
          content: "Hi, I have a question about your product pricing",
          timestamp: new Date(Date.now() - 300000),
          status: "read"
        },
        {
          id: "2",
          sender: "user",
          content: "Hello! I'd be happy to help you with pricing information. What specific product are you interested in?",
          timestamp: new Date(Date.now() - 240000),
          status: "read"
        },
        {
          id: "3",
          sender: "customer",
          content: "I'm looking at the premium plan. Is there a discount for annual subscriptions?",
          timestamp: new Date(Date.now() - 180000),
          status: "delivered"
        }
      ]
    },
    {
      id: "2",
      customerName: "Mike Chen",
      customerPhone: "+9876543210",
      status: "waiting",
      lastMessage: "Is anyone there?",
      unreadCount: 1,
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      messages: [
        {
          id: "1",
          sender: "customer",
          content: "Is anyone there? I need help with my order",
          timestamp: new Date(Date.now() - 600000),
          status: "sent"
        }
      ]
    }
  ];

  const activeChatData = chatSessions.find(chat => chat.id === activeChat);

  const sendMessage = () => {
    if (!messageInput.trim() || !activeChat) return;

    // Here you would normally send the message to your backend
    console.log("Sending message:", messageInput);
    setMessageInput("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChatData?.messages]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      "active": "bg-green-100 text-green-800",
      "waiting": "bg-yellow-100 text-yellow-800",
      "closed": "bg-gray-100 text-gray-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg"
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
        <CardHeader className="pb-3 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">Live Chat</CardTitle>
                <CardDescription className="text-sm">
                  {activeChatData ? `Chatting with ${activeChatData.customerName}` : 'Customer Support'}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
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
                className="h-8 w-8"
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
            <div className="flex h-full">
              {/* Chat List */}
              <div className="w-1/3 border-r border-border">
                <div className="p-3 border-b border-border">
                  <h4 className="font-medium text-sm">Active Chats</h4>
                </div>
                <ScrollArea className="h-full">
                  <div className="p-2 space-y-2">
                    {chatSessions.map((chat) => (
                      <div
                        key={chat.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                          activeChat === chat.id ? 'bg-primary/10 border border-primary/20' : ''
                        }`}
                        onClick={() => setActiveChat(chat.id)}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                              <User className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{chat.customerName}</p>
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${getStatusColor(chat.status)}`}
                              >
                                {chat.status}
                              </Badge>
                            </div>
                          </div>
                          {chat.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate mb-1">
                          {chat.lastMessage}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatTime(chat.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {activeChatData ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-3 border-b border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{activeChatData.customerName}</h4>
                          <p className="text-xs text-muted-foreground">{activeChatData.customerPhone}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Video className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-3" ref={scrollRef}>
                      <div className="space-y-3">
                        {activeChatData.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                message.sender === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className={`text-xs ${
                                  message.sender === 'user' 
                                    ? 'text-primary-foreground/70' 
                                    : 'text-muted-foreground'
                                }`}>
                                  {formatTime(message.timestamp)}
                                </span>
                                {message.sender === 'user' && (
                                  <span className={`text-xs ${
                                    message.status === 'read' ? 'text-blue-300' :
                                    message.status === 'delivered' ? 'text-primary-foreground/70' :
                                    'text-primary-foreground/50'
                                  }`}>
                                    {message.status === 'read' ? '✓✓' : 
                                     message.status === 'delivered' ? '✓✓' : '✓'}
                                  </span>
                                )}
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
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Smile className="w-4 h-4" />
                        </Button>
                        <Input
                          placeholder="Type a message..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          className="flex-1"
                        />
                        <Button size="icon" onClick={sendMessage} disabled={!messageInput.trim()}>
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-center p-6">
                    <div>
                      <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="font-medium mb-2">No Chat Selected</h4>
                      <p className="text-sm text-muted-foreground">
                        Select a conversation to start chatting
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}