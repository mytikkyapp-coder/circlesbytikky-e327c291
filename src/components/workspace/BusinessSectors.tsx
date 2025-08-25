
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChefHat,
  GraduationCap,
  Car,
  Heart,
  ShoppingBag,
  Home,
  Zap
} from "lucide-react";

const businessSectors = [
  {
    id: 'cloud-kitchen',
    name: 'Cloud Kitchen',
    description: 'Food delivery and restaurant management',
    icon: ChefHat,
    gradient: 'from-orange-500 to-red-500',
    features: ['Menu Management', 'Order Processing', 'Delivery Tracking']
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Educational institutions and online learning',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-purple-500',
    features: ['Student Management', 'Course Creation', 'Assessment Tools']
  },
  {
    id: 'automobiles',
    name: 'Automobiles',
    description: 'Auto dealerships and service centers',
    icon: Car,
    gradient: 'from-gray-600 to-blue-600',
    features: ['Inventory Management', 'Service Booking', 'Customer CRM']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medical practices and healthcare providers',
    icon: Heart,
    gradient: 'from-green-500 to-teal-500',
    features: ['Patient Management', 'Appointments', 'Medical Records']
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'Online and offline retail businesses',
    icon: ShoppingBag,
    gradient: 'from-pink-500 to-rose-500',
    features: ['Product Catalog', 'Order Processing', 'Inventory']
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property management and real estate agencies',
    icon: Home,
    gradient: 'from-yellow-500 to-orange-500',
    features: ['Property Listings', 'Lead Generation', 'Virtual Tours']
  }
];

interface BusinessSectorsProps {
  selectedCategory: any;
  onSectorSelect: (sector: any) => void;
  selectedSector?: any;
  onBack: () => void;
}

export default function BusinessSectors({ selectedCategory, onSectorSelect, selectedSector, onBack }: BusinessSectorsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <div className={`w-12 h-12 bg-gradient-to-r ${selectedCategory.gradient} rounded-lg flex items-center justify-center`}>
          <selectedCategory.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{selectedCategory.name}</h3>
          <p className="text-muted-foreground text-sm">Select your business sector</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessSectors.map((sector) => {
          const IconComponent = sector.icon;
          const isSelected = selectedSector?.id === sector.id;
          
          return (
            <Card 
              key={sector.id}
              className={`cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group ${
                isSelected ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => onSectorSelect(sector)}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${sector.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
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
                    {sector.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack}>
          Back to Categories
        </Button>
      </div>
    </div>
  );
}
