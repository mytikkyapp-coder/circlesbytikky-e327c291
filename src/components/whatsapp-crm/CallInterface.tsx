
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mic, MicOff, Pause, Play, PhoneOff, UserPlus } from 'lucide-react';

interface CallInterfaceProps {
  isCallActive: boolean;
  setIsCallActive: (active: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isOnHold: boolean;
  setIsOnHold: (onHold: boolean) => void;
  callDuration: string;
}

export const CallInterface: React.FC<CallInterfaceProps> = ({
  isCallActive,
  setIsCallActive,
  isMuted,
  setIsMuted,
  isOnHold,
  setIsOnHold,
  callDuration
}) => {
  if (!isCallActive) return null;

  return (
    <Card className="m-4 p-6 bg-gradient-to-r from-primary/5 to-green-50 dark:from-primary/10 dark:to-green-900/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-lg font-semibold bg-primary/20">JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Connected
              </Badge>
              <span className="text-sm text-muted-foreground">{callDuration}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={isMuted ? 'destructive' : 'outline'}
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="rounded-full"
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button
            variant={isOnHold ? 'secondary' : 'outline'}
            size="icon"
            onClick={() => setIsOnHold(!isOnHold)}
            className="rounded-full"
          >
            {isOnHold ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <UserPlus className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setIsCallActive(false)}
            className="rounded-full"
          >
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          WhatsApp Calling API - Live Recording & Analysis
        </div>
      </div>
    </Card>
  );
};
