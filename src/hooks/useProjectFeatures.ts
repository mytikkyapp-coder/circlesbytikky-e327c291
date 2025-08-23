import { useMemo } from 'react';

type PlanType = 'Standard' | 'Pro' | 'Enterprise';

interface FeatureModule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  plan: PlanType;
  comingSoon?: boolean;
}

export const useProjectFeatures = (projectPlan: PlanType) => {
  const allFeatures: FeatureModule[] = [
    // Standard Features
    {
      id: 'whatsapp-business',
      name: 'WhatsApp Business API',
      description: 'Connect and manage WhatsApp Business account',
      enabled: true,
      plan: 'Standard'
    },
    {
      id: 'business-profile',
      name: 'Business Profile Configuration',
      description: 'Set up and customize business profile',
      enabled: true,
      plan: 'Standard'
    },
    {
      id: 'contact-management',
      name: 'Contact Management',
      description: 'Organize and manage your contacts',
      enabled: true,
      plan: 'Standard'
    },
    {
      id: 'basic-templates',
      name: 'Basic Templates Library',
      description: 'Pre-built message templates',
      enabled: true,
      plan: 'Standard'
    },
    {
      id: 'manual-broadcasting',
      name: 'Manual Message Broadcasting',
      description: 'Send messages to multiple contacts',
      enabled: true,
      plan: 'Standard'
    },
    {
      id: 'basic-campaigns',
      name: 'Basic Campaign Management',
      description: 'Create and manage simple campaigns',
      enabled: true,
      plan: 'Standard'
    },
    {
      id: 'member-directory',
      name: 'Member Directory',
      description: 'View and organize member lists',
      enabled: true,
      plan: 'Standard'
    },
    {
      id: 'standard-analytics',
      name: 'Standard Analytics Dashboard',
      description: 'Basic reporting and insights',
      enabled: true,
      plan: 'Standard'
    },

    // Pro Features
    {
      id: 'chatbot-builder',
      name: 'ChatBot Builder',
      description: 'Drag & drop conversation flow designer',
      enabled: projectPlan === 'Pro' || projectPlan === 'Enterprise',
      plan: 'Pro'
    },
    {
      id: 'ai-responses',
      name: 'AI-Powered Response Generation',
      description: 'Generate intelligent automated responses',
      enabled: projectPlan === 'Pro' || projectPlan === 'Enterprise',
      plan: 'Pro'
    },
    {
      id: 'conversation-flows',
      name: 'Multi-Step Conversation Flows',
      description: 'Complex conversation management',
      enabled: projectPlan === 'Pro' || projectPlan === 'Enterprise',
      plan: 'Pro'
    },
    {
      id: 'conditional-logic',
      name: 'Conditional Logic & Branching',
      description: 'Smart conversation routing',
      enabled: projectPlan === 'Pro' || projectPlan === 'Enterprise',
      plan: 'Pro'
    },
    {
      id: 'meta-ads-ai',
      name: 'Meta Ads AI',
      description: 'AI-powered advertising automation',
      enabled: projectPlan === 'Pro' || projectPlan === 'Enterprise',
      plan: 'Pro'
    },
    {
      id: 'ad-optimization',
      name: 'Performance Optimization',
      description: 'Automated ad performance optimization',
      enabled: projectPlan === 'Pro' || projectPlan === 'Enterprise',
      plan: 'Pro'
    },
    {
      id: 'facebook-integration',
      name: 'Facebook Business Integration',
      description: 'Connect with Facebook Business tools',
      enabled: projectPlan === 'Pro' || projectPlan === 'Enterprise',
      plan: 'Pro'
    },
    {
      id: 'instagram-messaging',
      name: 'Instagram Messaging',
      description: 'Manage Instagram direct messages',
      enabled: projectPlan === 'Pro' || projectPlan === 'Enterprise',
      plan: 'Pro'
    },

    // Enterprise Features
    {
      id: 'zoho-crm',
      name: 'ZOHO CRM Integration',
      description: 'Full CRM synchronization',
      enabled: projectPlan === 'Enterprise',
      plan: 'Enterprise'
    },
    {
      id: 'mailchimp-integration',
      name: 'Mailchimp Email Automation',
      description: 'Email marketing automation',
      enabled: projectPlan === 'Enterprise',
      plan: 'Enterprise'
    },
    {
      id: 'zapier-integration',
      name: 'Zapier Workflow Automation',
      description: 'Connect with 1000+ apps',
      enabled: projectPlan === 'Enterprise',
      plan: 'Enterprise'
    },
    {
      id: 'custom-api',
      name: 'Custom REST API Endpoints',
      description: 'Build custom integrations',
      enabled: projectPlan === 'Enterprise',
      plan: 'Enterprise'
    },
    {
      id: 'webhook-management',
      name: 'Webhook Management System',
      description: 'Advanced webhook configuration',
      enabled: projectPlan === 'Enterprise',
      plan: 'Enterprise'
    },
    {
      id: 'enterprise-permissions',
      name: 'Advanced User Permissions',
      description: 'Granular access control',
      enabled: projectPlan === 'Enterprise',
      plan: 'Enterprise'
    },
    {
      id: 'white-label',
      name: 'White-Label Configuration',
      description: 'Customize branding and appearance',
      enabled: projectPlan === 'Enterprise',
      plan: 'Enterprise'
    },
    {
      id: 'custom-domain',
      name: 'Custom Domain Setup',
      description: 'Use your own domain',
      enabled: projectPlan === 'Enterprise',
      plan: 'Enterprise'
    },

    // Coming Soon Features
    {
      id: 'voice-call-api',
      name: 'Voice Call API by Meta',
      description: 'Make and receive voice calls',
      enabled: false,
      plan: 'Enterprise',
      comingSoon: true
    },
    {
      id: 'ai-voice-assistants',
      name: 'AI Voice Assistants',
      description: 'Intelligent voice-based interactions',
      enabled: false,
      plan: 'Enterprise',
      comingSoon: true
    },
    {
      id: 'call-analytics',
      name: 'Advanced Call Analytics',
      description: 'Detailed voice call insights',
      enabled: false,
      plan: 'Enterprise',
      comingSoon: true
    }
  ];

  const enabledFeatures = useMemo(() => 
    allFeatures.filter(feature => feature.enabled || feature.comingSoon), 
    [projectPlan]
  );

  const getFeaturesByCategory = useMemo(() => {
    const categories = {
      standard: allFeatures.filter(f => f.plan === 'Standard'),
      pro: allFeatures.filter(f => f.plan === 'Pro'),
      enterprise: allFeatures.filter(f => f.plan === 'Enterprise')
    };
    return categories;
  }, []);

  const isFeatureEnabled = (featureId: string): boolean => {
    const feature = allFeatures.find(f => f.id === featureId);
    return feature?.enabled || false;
  };

  const getFeatureStatus = (featureId: string): 'enabled' | 'disabled' | 'coming-soon' => {
    const feature = allFeatures.find(f => f.id === featureId);
    if (!feature) return 'disabled';
    if (feature.comingSoon) return 'coming-soon';
    return feature.enabled ? 'enabled' : 'disabled';
  };

  return {
    allFeatures,
    enabledFeatures,
    getFeaturesByCategory,
    isFeatureEnabled,
    getFeatureStatus
  };
};