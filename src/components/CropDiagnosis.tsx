import { useState } from "react";
import { Upload, Camera, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCropDiagnoses } from "@/hooks/useFirestore";
import { useToast } from "@/hooks/use-toast";

const CropDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const { diagnoses, addDiagnosis } = useCropDiagnoses();
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCrop = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis
      setTimeout(async () => {
        const diagnosisResult = {
          disease: "Early Blight (Alternaria solani)",
          confidence: 92,
          severity: "Moderate",
          treatment: [
            "Remove affected leaves immediately",
            "Apply copper-based fungicide spray",
            "Improve air circulation around plants",
            "Avoid overhead watering"
          ],
          prevention: [
            "Use disease-resistant tomato varieties",
            "Practice crop rotation",
            "Maintain proper plant spacing",
            "Apply mulch to prevent soil splash"
          ],
          localTreatments: [
            "Neem oil spray (available at local stores)",
            "Copper sulfate solution",
            "Baking soda spray (1 tsp per liter water)"
          ]
        };
        
        setDiagnosis(diagnosisResult);
        
        // Save to Firebase
        try {
          await addDiagnosis({
            imageUrl: selectedImage,
            ...diagnosisResult
          });
          
          toast({
            title: "Diagnosis Saved",
            description: "Your crop diagnosis has been saved to your history."
          });
        } catch (error) {
          console.error('Failed to save diagnosis:', error);
          toast({
            title: "Save Failed",
            description: "Could not save diagnosis to history.",
            variant: "destructive"
          });
        }
        
        setIsAnalyzing(false);
      }, 3000);
    } catch (error) {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the image. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Crop Disease Diagnosis</h1>
          <p className="text-lg text-muted-foreground">
            Upload a photo of your crop to get instant AI-powered disease identification and treatment recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Upload Crop Photo
              </CardTitle>
              <CardDescription>
                Take a clear photo of the affected plant parts for accurate diagnosis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded crop" 
                      className="max-h-64 mx-auto rounded-lg shadow-soft"
                    />
                    <Button 
                      onClick={() => setSelectedImage(null)}
                      variant="outline"
                      size="sm"
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
              
              <Button 
                onClick={analyzeCrop}
                disabled={!selectedImage || isAnalyzing}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Analyze Crop
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {diagnosis && (
              <>
                <Alert className="border-success/50 bg-success/5">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <AlertTitle className="text-success">Diagnosis Complete</AlertTitle>
                  <AlertDescription>
                    Analysis completed with {diagnosis.confidence}% confidence
                  </AlertDescription>
                </Alert>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-destructive">{diagnosis.disease}</CardTitle>
                    <CardDescription>Severity: {diagnosis.severity}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Immediate Treatment</h4>
                      <ul className="space-y-1">
                        {diagnosis.treatment.map((step: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Local Treatment Options</h4>
                      <ul className="space-y-1">
                        {diagnosis.localTreatments.map((treatment: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-success">
                            <span className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                            {treatment}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Prevention Tips</h4>
                      <ul className="space-y-1">
                        {diagnosis.prevention.map((tip: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {!diagnosis && !isAnalyzing && (
              <Card className="border-muted">
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Upload an image to get started with AI diagnosis</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDiagnosis;