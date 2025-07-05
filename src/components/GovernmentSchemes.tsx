import { useState } from "react";
import { FileText, ExternalLink, Filter, Search, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Scheme {
  name: string;
  category: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  deadline: string;
  status: 'active' | 'closing-soon' | 'upcoming';
  applicationLink: string;
  state: string;
}

const GovernmentSchemes = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("karnataka");

  const [schemes] = useState<Scheme[]>([
    {
      name: "PM-KISAN Samman Nidhi",
      category: "Financial Support",
      description: "Direct income support of ₹6,000 per year to small and marginal farmer families",
      benefits: [
        "₹6,000 per year in three installments",
        "Direct bank transfer",
        "No application fee"
      ],
      eligibility: [
        "Small and marginal farmers",
        "Landholding up to 2 hectares",
        "Valid Aadhaar card required"
      ],
      documents: [
        "Aadhaar card",
        "Bank account details",
        "Land ownership documents"
      ],
      deadline: "Ongoing registration",
      status: 'active',
      applicationLink: "https://pmkisan.gov.in",
      state: "All India"
    },
    {
      name: "Karnataka Raitha Bandhu",
      category: "Input Subsidy",
      description: "Financial assistance for agricultural inputs to farmers in Karnataka",
      benefits: [
        "₹4,000 per acre per season",
        "Maximum ₹10,000 per farmer",
        "For Kharif and Rabi seasons"
      ],
      eligibility: [
        "Farmers in Karnataka",
        "Must have land records",
        "Active bank account required"
      ],
      documents: [
        "Pahani/Survey Settlement",
        "Aadhaar card",
        "Bank passbook"
      ],
      deadline: "March 31, 2024",
      status: 'closing-soon',
      applicationLink: "https://raithabandhu.karnataka.gov.in",
      state: "Karnataka"
    },
    {
      name: "Krishi Yantra Dhare Scheme",
      category: "Equipment Subsidy",
      description: "Subsidy for purchasing agricultural machinery and equipment",
      benefits: [
        "50% subsidy on equipment",
        "Maximum ₹50,000 subsidy",
        "Includes tractors, tillers, pumps"
      ],
      eligibility: [
        "Small and marginal farmers",
        "First-time buyers priority",
        "Valid farmer registration"
      ],
      documents: [
        "Farmer registration certificate",
        "Income certificate",
        "Equipment quotations"
      ],
      deadline: "June 30, 2024",
      status: 'active',
      applicationLink: "https://agriculturalequipment.karnataka.gov.in",
      state: "Karnataka"
    },
    {
      name: "Soil Health Card Scheme",
      category: "Soil Testing",
      description: "Free soil testing and health cards with fertilizer recommendations",
      benefits: [
        "Free soil testing",
        "Customized fertilizer recommendations",
        "Increase crop productivity"
      ],
      eligibility: [
        "All farmers",
        "Land ownership proof required",
        "Valid contact details"
      ],
      documents: [
        "Land documents",
        "Aadhaar card",
        "Mobile number"
      ],
      deadline: "Ongoing",
      status: 'active',
      applicationLink: "https://soilhealth.dac.gov.in",
      state: "All India"
    },
    {
      name: "Crop Insurance Scheme",
      category: "Insurance",
      description: "Comprehensive crop insurance against natural calamities",
      benefits: [
        "Coverage against natural disasters",
        "Premium subsidy up to 50%",
        "Quick claim settlement"
      ],
      eligibility: [
        "All farmers (owner/tenant)",
        "Must have crop cultivation proof",
        "Bank account mandatory"
      ],
      documents: [
        "Crop cultivation certificate",
        "Land documents",
        "Bank account details"
      ],
      deadline: "Before crop sowing",
      status: 'upcoming',
      applicationLink: "https://pmfby.gov.in",
      state: "All India"
    }
  ]);

  const categories = ["All", "Financial Support", "Input Subsidy", "Equipment Subsidy", "Soil Testing", "Insurance"];
  const states = ["Karnataka", "All India"];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           scheme.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesState = selectedState === "all" || 
                        scheme.state.toLowerCase().includes(selectedState.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesState;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'closing-soon':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'upcoming':
        return <Clock className="w-4 h-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'closing-soon':
        return 'destructive';
      case 'upcoming':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Government Schemes</h1>
          <p className="text-lg text-muted-foreground">
            Discover and apply for agricultural subsidies and government support programs
          </p>
        </div>

        {/* Important Alert */}
        <Alert className="mb-8 border-warning/50 bg-warning/5">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-warning">Important Notice</AlertTitle>
          <AlertDescription>
            Several schemes have upcoming deadlines. Apply early to avoid missing out on benefits.
          </AlertDescription>
        </Alert>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search & Filter Schemes
            </CardTitle>
            <CardDescription>
              Find the most relevant government schemes for your farming needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search schemes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state.toLowerCase()}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme, index) => (
            <Card key={index} className="hover:shadow-elevated transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{scheme.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{scheme.category}</Badge>
                      <Badge variant={getStatusColor(scheme.status) as any} className="flex items-center gap-1">
                        {getStatusIcon(scheme.status)}
                        {scheme.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <CardDescription>{scheme.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Benefits
                  </h4>
                  <ul className="space-y-1">
                    {scheme.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Eligibility</h4>
                  <ul className="space-y-1">
                    {scheme.eligibility.slice(0, 2).map((criteria, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Deadline: </span>
                    <span className="font-medium text-foreground">{scheme.deadline}</span>
                  </div>
                  <Button size="sm" className="flex items-center gap-2">
                    Apply Now
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No schemes found matching your criteria. Try adjusting your filters.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Application Help */}
        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle>Need Help with Applications?</CardTitle>
            <CardDescription>Get assistance with scheme applications and documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Common Documents Required</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Aadhaar card</li>
                  <li>• Bank account details</li>
                  <li>• Land ownership documents</li>
                  <li>• Income certificate</li>
                  <li>• Farmer registration certificate</li>
                </ul>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Application Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Contact Local Agriculture Office
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentSchemes;