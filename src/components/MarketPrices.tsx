import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, MapPin, Calendar, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface MarketPrice {
  crop: string;
  market: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  recommendation: string;
}

const MarketPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>("tomato");
  const [selectedLocation, setSelectedLocation] = useState<string>("bangalore");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const [marketData] = useState<MarketPrice[]>([
    {
      crop: "Tomato",
      market: "APMC Yeshwanthpur",
      price: 2800,
      unit: "per quintal",
      change: 12.5,
      trend: 'up',
      lastUpdated: "2 hours ago",
      recommendation: "Good time to sell - prices trending upward"
    },
    {
      crop: "Tomato",
      market: "KR Market",
      price: 2650,
      unit: "per quintal",
      change: 8.3,
      trend: 'up',
      lastUpdated: "1 hour ago",
      recommendation: "Moderate prices - consider waiting"
    },
    {
      crop: "Onion",
      market: "APMC Yeshwanthpur",
      price: 1800,
      unit: "per quintal",
      change: -5.2,
      trend: 'down',
      lastUpdated: "3 hours ago",
      recommendation: "Prices declining - sell soon if possible"
    },
    {
      crop: "Potato",
      market: "Mysore APMC",
      price: 1200,
      unit: "per quintal",
      change: 2.1,
      trend: 'stable',
      lastUpdated: "4 hours ago",
      recommendation: "Stable prices - steady market"
    }
  ]);

  const crops = ["Tomato", "Onion", "Potato", "Brinjal", "Cabbage", "Carrot"];
  const locations = ["Bangalore", "Mysore", "Hubli", "Mandya", "Hassan"];

  const filteredData = marketData.filter(item => 
    item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.market.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <div className="w-4 h-4 bg-warning rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-warning';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Market Prices</h1>
          <p className="text-lg text-muted-foreground">
            Real-time market prices and selling recommendations for your crops
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>Find the best prices for your crops in nearby markets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crops or markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop.toLowerCase()}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location.toLowerCase()}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredData.map((item, index) => (
            <Card key={index} className="hover:shadow-elevated transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.crop}</CardTitle>
                  <Badge variant={item.trend === 'up' ? 'default' : item.trend === 'down' ? 'destructive' : 'secondary'}>
                    {item.trend}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.market}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      ₹{item.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">{item.unit}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(item.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground font-medium mb-1">Recommendation:</p>
                  <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Updated {item.lastUpdated}
                  </div>
                  <Button variant="ghost" size="sm">
                    View Trends
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Market Insights</CardTitle>
            <CardDescription>AI-powered recommendations based on market trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-success flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Best Time to Sell
                </h4>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Tomatoes</span>
                    <Badge variant="default">Now - Next 3 days</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Potatoes</span>
                    <Badge variant="secondary">Stable - Anytime</Badge>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-warning flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Price Alerts
                </h4>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Onion prices dropping</span>
                    <Badge variant="destructive">Urgent</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Cabbage demand rising</span>
                    <Badge variant="default">Opportunity</Badge>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;