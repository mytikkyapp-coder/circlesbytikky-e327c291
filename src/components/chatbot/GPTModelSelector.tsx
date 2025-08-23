import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Clock, Star } from 'lucide-react';

interface GPTModelSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const models = [
  {
    id: 'gpt-5-2025-08-07',
    name: 'GPT-5',
    description: 'Most powerful flagship model',
    icon: Star,
    badge: 'Latest',
    badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-500'
  },
  {
    id: 'gpt-5-mini-2025-08-07',
    name: 'GPT-5 Mini',
    description: 'Fast and cost-efficient',
    icon: Zap,
    badge: 'Recommended',
    badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500'
  },
  {
    id: 'gpt-5-nano-2025-08-07',
    name: 'GPT-5 Nano',
    description: 'Fastest and cheapest',
    icon: Clock,
    badge: 'Speed',
    badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  {
    id: 'gpt-4.1-2025-04-14',
    name: 'GPT-4.1',
    description: 'Reliable and stable',
    icon: Brain,
    badge: 'Stable',
    badgeColor: 'bg-gradient-to-r from-purple-500 to-indigo-500'
  },
  {
    id: 'o3-2025-04-16',
    name: 'O3',
    description: 'Advanced reasoning model',
    icon: Brain,
    badge: 'Reasoning',
    badgeColor: 'bg-gradient-to-r from-pink-500 to-rose-500'
  },
  {
    id: 'o4-mini-2025-04-16',
    name: 'O4 Mini',
    description: 'Fast reasoning model',
    icon: Zap,
    badge: 'Fast',
    badgeColor: 'bg-gradient-to-r from-violet-500 to-purple-500'
  }
];

export const GPTModelSelector: React.FC<GPTModelSelectorProps> = ({ value, onValueChange }) => {
  const selectedModel = models.find(m => m.id === value) || models[0];

  return (
    <div className="space-y-3">
      <Label htmlFor="gpt-model" className="text-sm font-medium">AI Model</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full bg-gradient-to-r from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-colors">
          <SelectValue>
            <div className="flex items-center gap-2">
              {selectedModel && (
                <>
                  <selectedModel.icon className="w-4 h-4 text-primary" />
                  <span className="font-medium">{selectedModel.name}</span>
                  <Badge className={`text-xs text-white ${selectedModel.badgeColor} border-0`}>
                    {selectedModel.badge}
                  </Badge>
                </>
              )}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-card/95 backdrop-blur-sm border-primary/20">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <SelectItem 
                key={model.id} 
                value={model.id}
                className="hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-200"
              >
                <div className="flex items-center gap-3 w-full">
                  <Icon className="w-4 h-4 text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{model.name}</span>
                      <Badge className={`text-xs text-white ${model.badgeColor} border-0`}>
                        {model.badge}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{model.description}</div>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      
      {selectedModel && (
        <div className="p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <selectedModel.icon className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">{selectedModel.name}</span>
            <Badge className={`text-xs text-white ${selectedModel.badgeColor} border-0`}>
              {selectedModel.badge}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{selectedModel.description}</p>
        </div>
      )}
    </div>
  );
};