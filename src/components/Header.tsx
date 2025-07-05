import { Sprout, Menu, X, User, LogOut, Home, Camera, TrendingUp, FileText, Mic, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

type ActiveSection = 'home' | 'dashboard' | 'crop-diagnosis' | 'market-prices' | 'government-schemes' | 'voice-assistant';

interface HeaderProps {
  onNavigate: (section: ActiveSection) => void;
  activeSection: ActiveSection;
}

const Header = ({ onNavigate, activeSection }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigationItems = [
    { id: 'home' as ActiveSection, label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'dashboard' as ActiveSection, label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
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
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Project Kisan</h1>
              <p className="text-sm text-muted-foreground">Your AI Farming Assistant</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.slice(0, -1).map((item) => (
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
          
          {/* User Profile & Voice Assistant */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant={activeSection === 'voice-assistant' ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigate('voice-assistant')}
              className="flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              Voice
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {userProfile?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userProfile?.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {userProfile?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
          {/* Mobile Navigation */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button 
              variant={activeSection === 'voice-assistant' ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigate('voice-assistant')}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Bar */}
        <nav className={`md:hidden transition-all duration-200 ${
          isMobileMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="mt-4 flex flex-wrap gap-2 bg-muted/50 rounded-lg p-2">
            {navigationItems.slice(0, -1).map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2"
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;