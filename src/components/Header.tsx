import { Mic, Globe, Menu, Home, Camera, TrendingUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActiveSection = 'home' | 'crop-diagnosis' | 'market-prices' | 'government-schemes' | 'voice-assistant';

interface HeaderProps {
  onNavigate: (section: ActiveSection) => void;
  activeSection: ActiveSection;
}

const Header = ({ onNavigate, activeSection }: HeaderProps) => {
  const navigationItems = [
    { id: 'home' as ActiveSection, label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'crop-diagnosis' as ActiveSection, label: 'Diagnosis', icon: <Camera className="w-4 h-4" /> },
    { id: 'market-prices' as ActiveSection, label: 'Prices', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'government-schemes' as ActiveSection, label: 'Schemes', icon: <FileText className="w-4 h-4" /> },
    { id: 'voice-assistant' as ActiveSection, label: 'Voice', icon: <Mic className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-earth rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">🌱</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Project Kisan</h1>
              <p className="text-sm text-muted-foreground">Your AI Farming Assistant</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className="flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>
          
          {/* Mobile Navigation */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('voice-assistant')}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Language Selector - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              English
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Bar */}
        <nav className="md:hidden mt-4 flex items-center justify-around bg-muted/50 rounded-lg p-2">
          {navigationItems.slice(0, 4).map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigate(item.id)}
              className="flex-1 flex flex-col items-center gap-1 h-auto py-2 px-1"
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;