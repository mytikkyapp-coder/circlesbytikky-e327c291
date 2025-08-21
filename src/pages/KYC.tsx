import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Upload, 
  FileText, 
  Building, 
  User, 
  Camera, 
  Globe,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Briefcase,
  Star,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type KYCStatus = "not_started" | "in_progress" | "submitted" | "approved" | "rejected";
type DocumentType = "business_license" | "tax_certificate" | "id_document" | "address_proof" | "bank_statement";

interface DocumentUpload {
  type: DocumentType;
  name: string;
  status: "pending" | "uploaded" | "verified" | "rejected";
  file?: File;
}

const KYC = () => {
  const [kycStatus, setKycStatus] = useState<KYCStatus>("not_started");
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  // Form state
  const [businessInfo, setBusinessInfo] = useState({
    legalName: "",
    tradeName: "",
    registrationNumber: "",
    taxId: "",
    businessType: "",
    industry: "",
    yearEstablished: "",
    website: "",
    description: ""
  });

  const [contactInfo, setContactInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    email: "",
    contactPerson: "",
    contactTitle: ""
  });

  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { type: "business_license", name: "Business Registration Certificate", status: "pending" },
    { type: "tax_certificate", name: "Tax Registration Certificate", status: "pending" },
    { type: "id_document", name: "Director/Owner ID Document", status: "pending" },
    { type: "address_proof", name: "Business Address Proof", status: "pending" },
    { type: "bank_statement", name: "Bank Statement (Last 3 months)", status: "pending" }
  ]);

  const handleDocumentUpload = (type: DocumentType, file: File) => {
    setDocuments(prev => prev.map(doc => 
      doc.type === type 
        ? { ...doc, file, status: "uploaded" as const }
        : doc
    ));
    
    toast({
      title: "Document Uploaded",
      description: `${file.name} has been uploaded successfully`,
    });

    // Simulate verification
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => 
        doc.type === type 
          ? { ...doc, status: "verified" as const }
          : doc
      ));
    }, 2000);
  };

  const handleSubmitKYC = () => {
    const allDocsUploaded = documents.every(doc => doc.status === "verified");
    
    if (!allDocsUploaded) {
      toast({
        title: "Documents Required",
        description: "Please upload and verify all required documents",
        variant: "destructive"
      });
      return;
    }

    setKycStatus("submitted");
    setProgress(100);
    
    toast({
      title: "KYC Submitted Successfully! 🎉",
      description: "Your application is now under review. We'll notify you within 24-48 hours.",
    });
  };

  const getStatusColor = (status: KYCStatus) => {
    switch (status) {
      case "approved": return "bg-green-500";
      case "submitted": return "bg-blue-500";
      case "in_progress": return "bg-yellow-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case "business_license": return Building;
      case "tax_certificate": return CreditCard;
      case "id_document": return User;
      case "address_proof": return MapPin;
      case "bank_statement": return Briefcase;
      default: return FileText;
    }
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(businessInfo).length + Object.keys(contactInfo).length;
    const filledFields = Object.values(businessInfo).filter(v => v).length + 
                        Object.values(contactInfo).filter(v => v).length;
    const documentProgress = documents.filter(doc => doc.status === "verified").length * 20;
    
    return Math.min(((filledFields / totalFields) * 60) + documentProgress, 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Business KYC Verification</h1>
            <p className="text-muted-foreground">Complete your business verification to unlock all features</p>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className={`w-12 h-12 rounded-full ${getStatusColor(kycStatus)} flex items-center justify-center mx-auto`}>
                {kycStatus === "approved" ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <Shield className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">Verification Status</h3>
                <Badge variant={kycStatus === "approved" ? "default" : "secondary"}>
                  {kycStatus.replace("_", " ").toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Processing Time</h3>
                <p className="text-sm text-muted-foreground">24-48 hours</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Verification Level</h3>
                <p className="text-sm text-muted-foreground">Business Verified</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion Progress</span>
              <span>{Math.round(calculateProgress())}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* KYC Form */}
      <Tabs value={`step-${currentStep}`} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="step-1">Business Info</TabsTrigger>
          <TabsTrigger value="step-2">Contact Details</TabsTrigger>
          <TabsTrigger value="step-3">Documents</TabsTrigger>
        </TabsList>

        {/* Step 1: Business Information */}
        <TabsContent value="step-1" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Business Information
              </CardTitle>
              <CardDescription>
                Provide your official business details as registered with authorities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="legal-name">Legal Business Name *</Label>
                  <Input
                    id="legal-name"
                    placeholder="Official registered name"
                    value={businessInfo.legalName}
                    onChange={(e) => setBusinessInfo({...businessInfo, legalName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trade-name">Trade/Brand Name</Label>
                  <Input
                    id="trade-name"
                    placeholder="Business operating name"
                    value={businessInfo.tradeName}
                    onChange={(e) => setBusinessInfo({...businessInfo, tradeName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registration-number">Business Registration Number *</Label>
                  <Input
                    id="registration-number"
                    placeholder="Official registration number"
                    value={businessInfo.registrationNumber}
                    onChange={(e) => setBusinessInfo({...businessInfo, registrationNumber: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID/EIN *</Label>
                  <Input
                    id="tax-id"
                    placeholder="Tax identification number"
                    value={businessInfo.taxId}
                    onChange={(e) => setBusinessInfo({...businessInfo, taxId: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type *</Label>
                  <Select value={businessInfo.businessType} onValueChange={(value) => setBusinessInfo({...businessInfo, businessType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                      <SelectItem value="nonprofit">Non-Profit Organization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={businessInfo.industry} onValueChange={(value) => setBusinessInfo({...businessInfo, industry: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="retail">Retail & E-commerce</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year-established">Year Established *</Label>
                  <Input
                    id="year-established"
                    placeholder="YYYY"
                    value={businessInfo.yearEstablished}
                    onChange={(e) => setBusinessInfo({...businessInfo, yearEstablished: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    value={businessInfo.website}
                    onChange={(e) => setBusinessInfo({...businessInfo, website: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your business activities and services"
                  rows={4}
                  value={businessInfo.description}
                  onChange={(e) => setBusinessInfo({...businessInfo, description: e.target.value})}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setCurrentStep(2)}>
                  Next: Contact Details
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Contact Information */}
        <TabsContent value="step-2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Provide your business address and primary contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Business Address *</Label>
                <Input
                  id="address"
                  placeholder="Street address"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={contactInfo.city}
                    onChange={(e) => setContactInfo({...contactInfo, city: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    placeholder="State or Province"
                    value={contactInfo.state}
                    onChange={(e) => setContactInfo({...contactInfo, state: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select value={contactInfo.country} onValueChange={(value) => setContactInfo({...contactInfo, country: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="gb">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code *</Label>
                  <Input
                    id="postal-code"
                    placeholder="Postal/ZIP code"
                    value={contactInfo.postalCode}
                    onChange={(e) => setContactInfo({...contactInfo, postalCode: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Business Phone *</Label>
                  <Input
                    id="phone"
                    placeholder="+1234567890"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Business Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="business@example.com"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-person">Primary Contact Person *</Label>
                  <Input
                    id="contact-person"
                    placeholder="Full name"
                    value={contactInfo.contactPerson}
                    onChange={(e) => setContactInfo({...contactInfo, contactPerson: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-title">Contact Title/Position *</Label>
                  <Input
                    id="contact-title"
                    placeholder="CEO, Director, etc."
                    value={contactInfo.contactTitle}
                    onChange={(e) => setContactInfo({...contactInfo, contactTitle: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Previous
                </Button>
                <Button onClick={() => setCurrentStep(3)}>
                  Next: Upload Documents
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 3: Document Upload */}
        <TabsContent value="step-3" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Required Documents
              </CardTitle>
              <CardDescription>
                Upload clear, legible copies of the following documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {documents.map((doc) => {
                  const IconComponent = getDocumentIcon(doc.type);
                  return (
                    <div key={doc.type} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-muted-foreground" />
                          <span className="font-medium">{doc.name}</span>
                        </div>
                        <Badge 
                          variant={doc.status === "verified" ? "default" : "secondary"}
                          className={doc.status === "verified" ? "bg-green-500" : ""}
                        >
                          {doc.status}
                        </Badge>
                      </div>
                      
                      {doc.status === "pending" && (
                        <div className="space-y-2">
                          <input
                            type="file"
                            id={`upload-${doc.type}`}
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleDocumentUpload(doc.type, file);
                            }}
                          />
                          <Button 
                            variant="outline" 
                            onClick={() => document.getElementById(`upload-${doc.type}`)?.click()}
                            className="w-full"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                          </Button>
                        </div>
                      )}

                      {doc.status === "uploaded" && (
                        <Alert>
                          <Clock className="w-4 h-4" />
                          <AlertDescription>
                            Document uploaded successfully. Verification in progress...
                          </AlertDescription>
                        </Alert>
                      )}

                      {doc.status === "verified" && (
                        <Alert>
                          <CheckCircle className="w-4 h-4" />
                          <AlertDescription>
                            Document verified successfully! ✅
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  );
                })}
              </div>

              <Alert>
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>
                  <strong>Document Requirements:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Documents must be clear and legible</li>
                    <li>• Accepted formats: PDF, JPG, PNG (max 10MB)</li>
                    <li>• Documents must be recent (issued within last 12 months)</li>
                    <li>• All text must be clearly visible</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Previous
                </Button>
                <Button 
                  onClick={handleSubmitKYC}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!documents.every(doc => doc.status === "verified")}
                >
                  Submit for Review
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Success State */}
      {kycStatus === "submitted" && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-green-800">KYC Application Submitted!</h3>
                <p className="text-green-700 mt-2">
                  Your business verification application has been submitted successfully. 
                  Our team will review your documents and contact you within 24-48 hours.
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Check Email
                </Button>
                <Button>
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KYC;