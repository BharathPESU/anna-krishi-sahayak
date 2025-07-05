// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CropDiagnosis from "@/components/CropDiagnosis";
import MarketPrices from "@/components/MarketPrices";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import VoiceAssistant from "@/components/VoiceAssistant";

type ActiveSection = 'home' | 'crop-diagnosis' | 'market-prices' | 'government-schemes' | 'voice-assistant';

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'crop-diagnosis':
        return <CropDiagnosis />;
      case 'market-prices':
        return <MarketPrices />;
      case 'government-schemes':
        return <GovernmentSchemes />;
      case 'voice-assistant':
        return <VoiceAssistant />;
      default:
        return <Hero onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={setActiveSection} activeSection={activeSection} />
      {renderActiveSection()}
    </div>
  );
};

export default Index;
