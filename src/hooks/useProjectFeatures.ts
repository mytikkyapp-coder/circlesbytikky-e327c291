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
    // Standard Features - Business Setup & Broadcast Only
    {
      id: 'whatsapp-business',
      name: 'WhatsApp Business Setup',
      description: 'Connect and configure WhatsApp Business account',
      enabled: true,
      plan: 'Standard'
    },
    {
      id: 'business-profile',
      name: 'Business Profile Configuration',
      description: 'Set up and customize your business profile',
      enabled: true,
      plan: 'Standard'
    },
    {
      id: 'basic-templates',
      name: 'Message Templates',
      description: 'Create and manage message templates',
      enabled: true,
      plan: 'Standard'
    },
    {
      id: 'manual-broadcasting',
      name: 'Message Broadcasting',
      description: 'Send broadcast messages to your contacts',
      enabled: true,
      plan: 'Standard'
    },
    {
      id: 'contact-management',
      name: 'Basic Contact Management',
      description: 'Import and organize your contact lists',
      enabled: true,
      plan: 'Standard'
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