import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  gradient?: string;
}

const FeatureCard = ({ icon, title, description, buttonText, onClick, gradient = "bg-gradient-earth" }: FeatureCardProps) => {
  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50">
      <CardHeader className="pb-3">
        <div className={`w-12 h-12 ${gradient} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={onClick}
          className="w-full group/btn"
          variant="default"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;