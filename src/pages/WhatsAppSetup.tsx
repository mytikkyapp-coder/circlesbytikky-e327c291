
import { WhatsAppSetup } from '@/components/WhatsAppSetup';

export default function WhatsAppSetupPage() {
  const handleConnectionComplete = (data: any) => {
    console.log('WhatsApp connection completed:', data);
    // Here you could save the connection data to your backend or state management
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <WhatsAppSetup onConnectionComplete={handleConnectionComplete} />
    </div>
  );
}
