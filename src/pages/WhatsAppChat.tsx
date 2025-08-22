import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

interface WhatsAppMessage {
  id: string;
  sender: "user" | "customer";
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  type: "text" | "image" | "file";
}

interface WhatsAppContact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: "online" | "offline" | "typing";
  isGroup: boolean;
}

const mockContacts: WhatsAppContact[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "+91 98765 43210",
    avatar: "/placeholder.svg",
    lastMessage: "Thanks for the quick response!",
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    status: "online",
    isGroup: false,
  },
  {
    id: "2",
    name: "Sarah Wilson",
    phone: "+91 87654 32109",
    lastMessage: "When will the product be available?",
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 0,
    status: "offline",
    isGroup: false,
  },
  {
    id: "3",
    name: "Fitness Group",
    phone: "+91 76543 21098",
    lastMessage: "Welcome to our fitness community!",
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 5,
    status: "online",
    isGroup: true,
  },
];

const mockMessages: { [key: string]: WhatsAppMessage[] } = {
  "1": [
    {
      id: "1",
      sender: "customer",
      content: "Hi, I'm interested in your fitness coaching program",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      status: "read",
      type: "text",
    },
    {
      id: "2",
      sender: "user",
      content: "Hello! Thank you for your interest. I'd be happy to help you with our fitness coaching program. What are your specific fitness goals?",
      timestamp: new Date(Date.now() - 55 * 60 * 1000),
      status: "read",
      type: "text",
    },
    {
      id: "3",
      sender: "customer",
      content: "I want to lose weight and build muscle",
      timestamp: new Date(Date.now() - 50 * 60 * 1000),
      status: "read",
      type: "text",
    },
    {
      id: "4",
      sender: "user",
      content: "Great! That's a perfect combination. Our program includes personalized workout plans and nutrition guidance. Would you like to schedule a free consultation call?",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      status: "delivered",
      type: "text",
    },
    {
      id: "5",
      sender: "customer",
      content: "Thanks for the quick response!",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: "sent",
      type: "text",
    },
  ],
  "2": [
    {
      id: "1",
      sender: "customer",
      content: "When will the product be available?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: "read",
      type: "text",
    },
  ],
  "3": [
    {
      id: "1",
      sender: "user",
      content: "Welcome to our fitness community!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "read",
      type: "text",
    },
  ],
};

export default function WhatsAppChat() {
  const { projectId } = useParams();
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<WhatsAppContact | null>(mockContacts[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showContactInfo, setShowContactInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedContact]);

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const currentMessages = selectedContact ? mockMessages[selectedContact.id] || [] : [];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    toast({
      title: "Message sent",
      description: `Message sent to ${selectedContact.name}`,
    });

    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return "✓";
      case "delivered":
        return "✓✓";
      case "read":
        return "✓✓";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "read" ? "text-blue-500" : "text-muted-foreground";
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">WhatsApp Business</h2>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Contacts List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                  selectedContact?.id === contact.id ? "bg-primary/10 border border-primary/20" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {contact.status === "online" && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {formatLastMessageTime(contact.lastMessageTime)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                    <p className="text-xs text-muted-foreground">{contact.phone}</p>
                  </div>
                  {contact.unreadCount > 0 && (
                    <Badge variant="default" className="bg-green-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                      {contact.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedContact.avatar} />
                  <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedContact.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    {selectedContact.status === "online" && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                    {selectedContact.status === "typing" ? "typing..." : selectedContact.status}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowContactInfo(!showContactInfo)}
                >
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className={`flex items-center gap-1 mt-1 text-xs ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}>
                      <span className="opacity-70">{formatTime(message.timestamp)}</span>
                      {message.sender === "user" && (
                        <span className={`${getStatusColor(message.status)}`}>
                          {getStatusIcon(message.status)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="pr-10"
                />
                <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={handleSendMessage} size="sm" className="bg-green-600 hover:bg-green-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-muted/20">
          <div className="text-center">
            <h3 className="text-lg font-medium text-muted-foreground">Select a contact to start chatting</h3>
            <p className="text-sm text-muted-foreground mt-2">Choose from your contacts on the left</p>
          </div>
        </div>
      )}

      {/* Contact Info Panel */}
      {showContactInfo && selectedContact && (
        <div className="w-80 border-l border-border bg-background">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-medium">Contact Info</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowContactInfo(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={selectedContact.avatar} />
                  <AvatarFallback className="text-2xl">{selectedContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-medium">{selectedContact.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedContact.phone}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Status</h4>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedContact.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}></div>
                  <span className="text-sm capitalize">{selectedContact.status}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Contact Type</h4>
                <Badge variant={selectedContact.isGroup ? "secondary" : "outline"}>
                  {selectedContact.isGroup ? "Group" : "Individual"}
                </Badge>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}