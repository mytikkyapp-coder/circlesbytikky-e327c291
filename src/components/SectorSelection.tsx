import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Cloud, 
  GraduationCap, 
  Car, 
  Heart, 
  ShoppingBag, 
  Home, 
  Palette, 
  Briefcase,
  ChefHat,
  Store,
  BookOpen,
  Users,
  TrendingUp,
  Zap,
  Crown,
  Settings
} from "lucide-react";
import { useState } from "react";

interface Sector {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
  pricingStructure: {
    starter: { price: number; features: string[] };
    pro: { price: number; features: string[] };
    enterprise: { price: number; features: string[] };
  };
}

const sectors: Sector[] = [
  {
    id: 'cloud-kitchen',
    name: 'Cloud Kitchen',
    description: 'Food delivery and restaurant management',
    icon: ChefHat,
    gradient: 'from-orange-500 to-red-500',
    theme: {
      primary: 'hsl(20, 85%, 55%)',
      secondary: 'hsl(15, 80%, 60%)',
      accent: 'hsl(10, 75%, 65%)'
    },
    features: [
      'Online Menu Management',
      'Order Processing System',
      'Delivery Integration',
      'Kitchen Display System',
      'Customer Reviews Management'
    ],
    pricingStructure: {
      starter: {
        price: 2499,
        features: ['Basic Menu Management', 'Order Notifications', 'Customer Database']
      },
      pro: {
        price: 6499,
        features: ['Advanced Analytics', 'Multi-Platform Integration', 'Automated Marketing']
      },
      enterprise: {
        price: 16499,
        features: ['Custom Integrations', 'Multi-Location Support', 'API Access']
      }
    }
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Educational institutions and online learning',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-purple-500',
    theme: {
      primary: 'hsl(240, 85%, 55%)',
      secondary: 'hsl(250, 80%, 60%)',
      accent: 'hsl(260, 75%, 65%)'
    },
    features: [
      'Student Management System',
      'Course Creation Tools',
      'Assignment Tracking',
      'Parent Communication',
      'Performance Analytics'
    ],
    pricingStructure: {
      starter: {
        price: 3199,
        features: ['Student Portal', 'Basic Course Management', 'Communication Tools']
      },
      pro: {
        price: 8199,
        features: ['Advanced Analytics', 'Automated Grading', 'Parent App Integration']
      },
      enterprise: {
        price: 20499,
        features: ['Multi-Campus Support', 'Custom LMS Integration', 'Advanced Reporting']
      }
    }
  },
  {
    id: 'automobiles',
    name: 'Automobiles',
    description: 'Auto dealerships and service centers',
    icon: Car,
    gradient: 'from-gray-600 to-blue-600',
    theme: {
      primary: 'hsl(210, 85%, 45%)',
      secondary: 'hsl(220, 80%, 50%)',
      accent: 'hsl(200, 75%, 55%)'
    },
    features: [
      'Inventory Management',
      'Service Booking System',
      'Customer Relationship Management',
      'Parts Management',
      'Service History Tracking'
    ],
    pricingStructure: {
      starter: {
        price: 4099,
        features: ['Basic Inventory', 'Appointment Booking', 'Customer Database']
      },
      pro: {
        price: 10699,
        features: ['Advanced CRM', 'Service Analytics', 'Multi-Location Support']
      },
      enterprise: {
        price: 24999,
        features: ['ERP Integration', 'Custom Workflows', 'Advanced Reporting']
      }
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medical practices and healthcare providers',
    icon: Heart,
    gradient: 'from-green-500 to-teal-500',
    theme: {
      primary: 'hsl(160, 85%, 45%)',
      secondary: 'hsl(170, 80%, 50%)',
      accent: 'hsl(150, 75%, 55%)'
    },
    features: [
      'Patient Management',
      'Appointment Scheduling',
      'Medical Records System',
      'Prescription Management',
      'Telemedicine Integration'
    ],
    pricingStructure: {
      starter: {
        price: 4899,
        features: ['Patient Portal', 'Basic Scheduling', 'Records Management']
      },
      pro: {
        price: 12299,
        features: ['Telemedicine', 'Advanced Analytics', 'Insurance Integration']
      },
      enterprise: {
        price: 28999,
        features: ['Hospital Integration', 'HIPAA Compliance', 'Custom Workflows']
      }
    }
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'Online and offline retail businesses',
    icon: ShoppingBag,
    gradient: 'from-pink-500 to-rose-500',
    theme: {
      primary: 'hsl(340, 85%, 55%)',
      secondary: 'hsl(350, 80%, 60%)',
      accent: 'hsl(330, 75%, 65%)'
    },
    features: [
      'Product Catalog Management',
      'Order Processing',
      'Inventory Tracking',
      'Customer Loyalty Programs',
      'Multi-Channel Sales'
    ],
    pricingStructure: {
      starter: {
        price: 2799,
        features: ['Basic E-commerce', 'Inventory Management', 'Order Processing']
      },
      pro: {
        price: 7399,
        features: ['Multi-Channel Selling', 'Advanced Analytics', 'Marketing Automation']
      },
      enterprise: {
        price: 18199,
        features: ['Custom Integrations', 'Advanced Reporting', 'API Access']
      }
    }
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property management and real estate agencies',
    icon: Home,
    gradient: 'from-yellow-500 to-orange-500',
    theme: {
      primary: 'hsl(45, 85%, 55%)',
      secondary: 'hsl(35, 80%, 60%)',
      accent: 'hsl(55, 75%, 65%)'
    },
    features: [
      'Property Listings Management',
      'Lead Generation Tools',
      'Virtual Tour Integration',
      'Document Management',
      'Client Communication System'
    ],
    pricingStructure: {
      starter: {
        price: 3699,
        features: ['Property Listings', 'Lead Management', 'Basic CRM']
      },
      pro: {
        price: 9899,
        features: ['Virtual Tours', 'Advanced Analytics', 'Marketing Automation']
      },
      enterprise: {
        price: 23199,
        features: ['Multi-Office Support', 'Custom Integrations', 'Advanced Reporting']
      }
    }
  }
];

interface SectorSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (sector: Sector) => void;
}

export function SectorSelection({ isOpen, onClose, onSelect }: SectorSelectionProps) {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [step, setStep] = useState<'select' | 'customize'>('select');

  const handleSectorSelect = (sector: Sector) => {
    setSelectedSector(sector);
    setStep('customize');
  };

  const handleCreateWorkspace = () => {
    if (selectedSector) {
      onSelect(selectedSector);
      onClose();
      setStep('select');
      setSelectedSector(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 'select' ? 'Choose Your Business Sector' : `Customize Your ${selectedSector?.name} Workspace`}
          </DialogTitle>
        </DialogHeader>
        
        {step === 'select' ? (
          <div className="space-y-6">
            <p className="text-muted-foreground text-center">
              Select the sector that best matches your business to get customized features and pricing
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectors.map((sector) => {
                const IconComponent = sector.icon;
                return (
                  <Card 
                    key={sector.id} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
                    onClick={() => handleSectorSelect(sector)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${sector.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{sector.name}</CardTitle>
                          <CardDescription>{sector.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Features:</h4>
                        <div className="space-y-1">
                          {sector.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              <span className="text-xs text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Starting from</span>
                          <Badge className={`bg-gradient-to-r ${sector.gradient} text-white`}>
                            ₹{sector.pricingStructure.starter.price}/mo
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : selectedSector && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className={`w-16 h-16 bg-gradient-to-r ${selectedSector.gradient} rounded-lg flex items-center justify-center`}>
                <selectedSector.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedSector.name}</h3>
                <p className="text-muted-foreground">{selectedSector.description}</p>
              </div>
            </div>

            {/* Pricing Plans */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Choose Your Plan</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(selectedSector.pricingStructure).map(([planType, plan]) => (
                  <Card key={planType} className="relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${selectedSector.gradient}`}></div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="capitalize">{planType}</CardTitle>
                        {planType === 'pro' && (
                          <Badge className="bg-primary text-primary-foreground">
                            <Crown className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="text-3xl font-bold">
                        ₹{plan.price}
                        <span className="text-sm font-normal text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Features Overview */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Sector-Specific Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSector.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className={`w-8 h-8 bg-gradient-to-r ${selectedSector.gradient} rounded-lg flex items-center justify-center`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep('select')}>
                Back to Sectors
              </Button>
              <Button onClick={handleCreateWorkspace} className={`bg-gradient-to-r ${selectedSector.gradient} text-white hover:opacity-90`}>
                Create {selectedSector.name} Workspace
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}