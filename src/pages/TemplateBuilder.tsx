import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  MessageSquare, 
  Image, 
  Video, 
  Music, 
  LayoutGrid, 
  FileText, 
  Wand2,
  Eye,
  Save,
  Play,
  Plus,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

interface CTAButton {
  id: string;
  text: string;
  type: "url" | "phone" | "quick_reply";
  value: string;
}

interface TemplateVariable {
  id: string;
  name: string;
  type: "text" | "number" | "date";
  required: boolean;
}

export default function TemplateBuilder() {
  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [templateType, setTemplateType] = useState<"text" | "image" | "video" | "audio" | "carousel" | "form">("text");
  const [content, setContent] = useState("");
  const [variables, setVariables] = useState<TemplateVariable[]>([]);
  const [ctaButtons, setCTAButtons] = useState<CTAButton[]>([]);
  const [headerEnabled, setHeaderEnabled] = useState(false);
  const [footerEnabled, setFooterEnabled] = useState(false);
  const [headerContent, setHeaderContent] = useState("");
  const [footerContent, setFooterContent] = useState("");

  const templateTypes = [
    { value: "text", label: "Text Message", icon: MessageSquare, description: "Simple text message" },
    { value: "image", label: "Image", icon: Image, description: "Text with image attachment" },
    { value: "video", label: "Video", icon: Video, description: "Text with video attachment" },
    { value: "audio", label: "Audio", icon: Music, description: "Text with audio attachment" },
    { value: "carousel", label: "Carousel", icon: LayoutGrid, description: "Multiple cards with images" },
    { value: "form", label: "Form", icon: FileText, description: "Interactive form template" }
  ];

  const categories = [
    "Marketing", "Onboarding", "Support", "Transactional", "Events", "Feedback", "Promotional"
  ];

  const addVariable = () => {
    const newVariable: TemplateVariable = {
      id: `var_${Date.now()}`,
      name: "",
      type: "text",
      required: true
    };
    setVariables([...variables, newVariable]);
  };

  const removeVariable = (id: string) => {
    setVariables(variables.filter(v => v.id !== id));
  };

  const updateVariable = (id: string, field: keyof TemplateVariable, value: any) => {
    setVariables(variables.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  const addCTAButton = () => {
    if (ctaButtons.length >= 3) return; // Max 3 buttons for WhatsApp
    
    const newButton: CTAButton = {
      id: `btn_${Date.now()}`,
      text: "",
      type: "url",
      value: ""
    };
    setCTAButtons([...ctaButtons, newButton]);
  };

  const removeCTAButton = (id: string) => {
    setCTAButtons(ctaButtons.filter(b => b.id !== id));
  };

  const updateCTAButton = (id: string, field: keyof CTAButton, value: string) => {
    setCTAButtons(ctaButtons.map(b => 
      b.id === id ? { ...b, [field]: value } : b
    ));
  };

  const generateWithAI = async () => {
    // AI generation logic would go here
    setContent("🎉 Welcome to {{company_name}}, {{first_name}}! We're thrilled to have you join our exclusive community. Get ready for amazing deals and updates!");
    setVariables([
      { id: "1", name: "company_name", type: "text", required: true },
      { id: "2", name: "first_name", type: "text", required: true }
    ]);
  };

  const getTypeIcon = (type: string) => {
    const iconMap: { [key: string]: any } = {
      text: MessageSquare,
      image: Image,
      video: Video,
      audio: Music,
      carousel: LayoutGrid,
      form: FileText
    };
    const Icon = iconMap[type] || MessageSquare;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/templates">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Template Builder</h1>
          <p className="text-muted-foreground mt-1">Create dynamic message templates with variables and CTAs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Template Info */}
          <Card>
            <CardHeader>
              <CardTitle>Template Information</CardTitle>
              <CardDescription>Basic details about your template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input 
                    id="name"
                    placeholder="Enter template name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe your template"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Template Type */}
          <Card>
            <CardHeader>
              <CardTitle>Template Type</CardTitle>
              <CardDescription>Choose the type of content for your template</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templateTypes.map((type) => (
                  <Card 
                    key={type.value}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      templateType === type.value ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setTemplateType(type.value as any)}
                  >
                    <CardContent className="p-4 text-center">
                      <type.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium text-sm mb-1">{type.label}</h4>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Template Content */}
          <Card>
            <CardHeader>
              <CardTitle>Template Content</CardTitle>
              <CardDescription>Design your message content</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="variables">Variables</TabsTrigger>
                  <TabsTrigger value="cta">Call to Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="header"
                        checked={headerEnabled}
                        onCheckedChange={setHeaderEnabled}
                      />
                      <Label htmlFor="header">Add Header</Label>
                    </div>
                    {headerEnabled && (
                      <Input 
                        placeholder="Header text"
                        value={headerContent}
                        onChange={(e) => setHeaderContent(e.target.value)}
                      />
                    )}
                  </div>

                  {/* Main Content */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content">Message Content</Label>
                      <Button variant="outline" size="sm" onClick={generateWithAI}>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate with AI
                      </Button>
                    </div>
                    <Textarea 
                      id="content"
                      placeholder="Write your message here. Use {{variable_name}} for dynamic content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Use {"{{variable_name}}"} syntax to add dynamic variables
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="footer"
                        checked={footerEnabled}
                        onCheckedChange={setFooterEnabled}
                      />
                      <Label htmlFor="footer">Add Footer</Label>
                    </div>
                    {footerEnabled && (
                      <Input 
                        placeholder="Footer text"
                        value={footerContent}
                        onChange={(e) => setFooterContent(e.target.value)}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="variables" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Template Variables</h4>
                      <p className="text-sm text-muted-foreground">Add dynamic variables to personalize messages</p>
                    </div>
                    <Button onClick={addVariable} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Variable
                    </Button>
                  </div>

                  {variables.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No variables added yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {variables.map((variable) => (
                        <Card key={variable.id}>
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <Label className="text-xs">Variable Name</Label>
                                <Input 
                                  placeholder="first_name"
                                  value={variable.name}
                                  onChange={(e) => updateVariable(variable.id, 'name', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Type</Label>
                                <Select 
                                  value={variable.type} 
                                  onValueChange={(value) => updateVariable(variable.id, 'type', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch 
                                  checked={variable.required}
                                  onCheckedChange={(checked) => updateVariable(variable.id, 'required', checked)}
                                />
                                <Label className="text-xs">Required</Label>
                              </div>
                              <div className="flex items-end">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => removeVariable(variable.id)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="cta" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Call to Action Buttons</h4>
                      <p className="text-sm text-muted-foreground">Add interactive buttons (max 3)</p>
                    </div>
                    <Button 
                      onClick={addCTAButton} 
                      size="sm" 
                      disabled={ctaButtons.length >= 3}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Button
                    </Button>
                  </div>

                  {ctaButtons.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No CTA buttons added yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {ctaButtons.map((button) => (
                        <Card key={button.id}>
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <Label className="text-xs">Button Text</Label>
                                <Input 
                                  placeholder="Click here"
                                  value={button.text}
                                  onChange={(e) => updateCTAButton(button.id, 'text', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Type</Label>
                                <Select 
                                  value={button.type} 
                                  onValueChange={(value) => updateCTAButton(button.id, 'type', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="url">Website URL</SelectItem>
                                    <SelectItem value="phone">Phone Number</SelectItem>
                                    <SelectItem value="quick_reply">Quick Reply</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                    <Label className="text-xs">
                      {button.type === 'url' ? 'URL' : button.type === 'phone' ? 'Phone' : 'Reply Text'}
                    </Label>
                                <Input 
                                  placeholder={
                                    button.type === 'url' ? 'https://example.com' : 
                                    button.type === 'phone' ? '+1234567890' : 'Yes, I\'m interested'
                                  }
                                  value={button.value}
                                  onChange={(e) => updateCTAButton(button.id, 'value', e.target.value)}
                                />
                              </div>
                              <div className="flex items-end">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => removeCTAButton(button.id)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Preview Sidebar */}
        <div className="space-y-6">
          {/* Template Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Template Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                <div className="bg-background rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      {getTypeIcon(templateType)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Your Business</p>
                      <p className="text-xs text-muted-foreground">WhatsApp</p>
                    </div>
                  </div>

                  {/* Header */}
                  {headerEnabled && headerContent && (
                    <div className="bg-primary/10 rounded-t-lg p-2 mb-2">
                      <p className="text-xs font-medium text-primary">{headerContent}</p>
                    </div>
                  )}

                  {/* Content */}
                  <div className="bg-muted/50 rounded-lg p-3 mb-3">
                    <p className="text-sm whitespace-pre-wrap">
                      {content || "Your message content will appear here..."}
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  {ctaButtons.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {ctaButtons.map((button) => (
                        <Button 
                          key={button.id}
                          variant="outline" 
                          size="sm" 
                          className="w-full text-xs"
                          disabled
                        >
                          {button.text || "Button"}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  {footerEnabled && footerContent && (
                    <div className="border-t border-border pt-2">
                      <p className="text-xs text-muted-foreground">{footerContent}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Info */}
          <Card>
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type:</span>
                <Badge variant="secondary">
                  {templateTypes.find(t => t.value === templateType)?.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Variables:</span>
                <span className="text-sm font-medium">{variables.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">CTA Buttons:</span>
                <span className="text-sm font-medium">{ctaButtons.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm font-medium">{category || "Not set"}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <Save className="w-4 h-4 mr-2" />
              Save Template
            </Button>
            <Button variant="outline" className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Test Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}