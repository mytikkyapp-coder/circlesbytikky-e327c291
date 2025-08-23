import { ComingSoon } from "@/components/ComingSoon";
import { Rocket, Star, Zap, Sparkles } from "lucide-react";

export default function FutureFeatures() {
  return (
    <ComingSoon
      title="Advanced Features Hub"
      description="Cutting-edge features powered by AI and automation are in development to revolutionize your WhatsApp marketing experience."
      features={[
        "AI-powered sentiment analysis and customer insights",
        "Advanced workflow automation with complex triggers",
        "Multi-language support with auto-translation",
        "Voice message transcription and analysis",
        "Advanced team collaboration tools",
        "White-label solutions for agencies",
        "Advanced security and compliance features",
        "Custom API endpoints and webhooks"
      ]}
      estimatedDate="Q3 2024"
      icon={Rocket}
    />
  );
}