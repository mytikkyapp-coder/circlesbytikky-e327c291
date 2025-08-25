
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  HeadphonesIcon,
  TrendingUp,
  Users,
  Building,
  UserCheck,
  Truck
} from "lucide-react";

const workspaceCategories = [
  {
    id: 'tech-support',
    name: 'Tech Support Hub',
    description: 'Customer service and technical support management',
    icon: HeadphonesIcon,
    gradient: 'from-blue-500 to-cyan-500',
    projects: 3,
    lastUsed: '2 hours ago',
    sectors: ['Technology', 'SaaS', 'E-commerce', 'Healthcare']
  },
  {
    id: 'marketing',
    name: 'Marketing Hub',
    description: 'Campaign management and lead generation tools',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-500',
    projects: 5,
    lastUsed: '1 hour ago',
    sectors: ['Retail', 'Real Estate', 'Education', 'Finance']
  },
  {
    id: 'sales',
    name: 'Sales Operations',
    description: 'Lead management and sales tracking',
    icon: Users,
    gradient: 'from-blue-500 to-cyan-500',
    projects: 2,
    lastUsed: '3 hours ago',
    sectors: ['B2B Services', 'Manufacturing', 'Consulting', 'Insurance']
  },
  {
    id: 'hr-management',
    name: 'HR Management',
    description: 'Human resources and employee management system',
    icon: UserCheck,
    gradient: 'from-green-500 to-emerald-500',
    projects: 1,
    lastUsed: '1 day ago',
    sectors: ['Corporate', 'Startups', 'Non-profit', 'Government']
  },
  {
    id: 'business',
    name: 'Business Intelligence',
    description: 'Analytics, reporting, and business insights',
    icon: Building,
    gradient: 'from-green-500 to-emerald-500',
    projects: 4,
    lastUsed: '2 days ago',
    sectors: ['Enterprise', 'Analytics', 'Data Science', 'Consulting']
  },
  {
    id: 'dealers',
    name: 'Dealer Network',
    description: 'Dealer network management and coordination',
    icon: Truck,
    gradient: 'from-orange-500 to-amber-500',
    projects: 2,
    lastUsed: '4 hours ago',
    sectors: ['Automotive', 'Electronics', 'Appliances', 'Machinery']
  }
];

interface WorkspaceCategoriesProps {
  onCategorySelect: (category: any) => void;
  selectedCategory?: any;
}

export default function WorkspaceCategories({ onCategorySelect, selectedCategory }: WorkspaceCategoriesProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Choose Workspace Category</h2>
        <p className="text-muted-foreground">
          Select the type of workspace that best fits your business needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaceCategories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory?.id === category.id;
          
          return (
            <Card 
              key={category.id}
              className={`cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group ${
                isSelected ? 'ring-2 ring-primary shadow-xl' : ''
              }`}
              onClick={() => onCategorySelect(category)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{category.name}</CardTitle>
                <CardDescription className="text-center">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Supported Sectors:</span>
                    <Badge variant="secondary">{category.sectors.length}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {category.sectors.slice(0, 3).map((sector, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {sector}
                      </Badge>
                    ))}
                    {category.sectors.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.sectors.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
