import heroImage from "@/assets/hero-agriculture.jpg";
import { Camera, TrendingUp, FileText, Mic } from "lucide-react";
import FeatureCard from "./FeatureCard";

type ActiveSection = 'home' | 'crop-diagnosis' | 'market-prices' | 'government-schemes' | 'voice-assistant';

interface HeroProps {
  onNavigate: (section: ActiveSection) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  const features = [
    {
      icon: <Camera className="w-6 h-6 text-primary-foreground" />,
      title: "Crop Diagnosis",
      description: "Take a photo to instantly identify crop diseases and get treatment recommendations",
      buttonText: "Analyze Crop",
      onClick: () => onNavigate('crop-diagnosis'),
      gradient: "bg-gradient-crop"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary-foreground" />,
      title: "Market Prices",
      description: "Get real-time market prices and selling recommendations for your crops",
      buttonText: "Check Prices",
      onClick: () => onNavigate('market-prices'),
      gradient: "bg-gradient-earth"
    },
    {
      icon: <FileText className="w-6 h-6 text-primary-foreground" />,
      title: "Government Schemes",
      description: "Find and apply for agricultural subsidies and government support programs",
      buttonText: "View Schemes",
      onClick: () => onNavigate('government-schemes'),
      gradient: "bg-accent"
    },
    {
      icon: <Mic className="w-6 h-6 text-primary-foreground" />,
      title: "Voice Assistant",
      description: "Ask questions in your local language and get expert advice through voice",
      buttonText: "Start Voice Chat",
      onClick: () => onNavigate('voice-assistant'),
      gradient: "bg-warning"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40 z-10" />
        <img 
          src={heroImage} 
          alt="Agricultural fields with technology" 
          className="w-full h-[60vh] object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Your AI-Powered 
                <span className="bg-gradient-earth bg-clip-text text-transparent"> Farming Assistant</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Get expert agricultural advice, real-time market prices, and government scheme guidance - all in your local language.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From crop diagnosis to market insights, Project Kisan provides comprehensive support for modern farmers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              buttonText={feature.buttonText}
              onClick={feature.onClick}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-card/50 backdrop-blur-sm border-y border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Crop Diseases Identified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Market Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Government Schemes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10</div>
              <div className="text-muted-foreground">Local Languages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;