import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Bot, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  language: string;
}

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("kannada");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ನೀವು ಯಾವುದೇ ಕೃಷಿ ಸಂಬಂಧಿತ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಬಹುದು.',
      timestamp: new Date(),
      language: 'kannada'
    }
  ]);

  const languages = [
    { code: 'kannada', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'hindi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'telugu', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  const sampleQuestions = [
    {
      kannada: "ಟೊಮೇಟೊ ಬೆಲೆ ಎಷ್ಟು ಇದೆ?",
      english: "What is the tomato price today?",
      category: "Market Prices"
    },
    {
      kannada: "ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ ಚುಕ್ಕೆಗಳು ಏಕೆ?",
      english: "Why are there yellow spots on leaves?",
      category: "Crop Diagnosis"
    },
    {
      kannada: "ಸಬ್ಸಿಡಿ ಸ್ಕೀಮ್ ಗಳು ಯಾವುವು?",
      english: "What subsidy schemes are available?",
      category: "Government Schemes"
    }
  ];

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      addUserMessage("ಟೊಮೇಟೊ ಬೆಲೆ ಎಷ್ಟು ಇದೆ ಇಂದು?");
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      language: selectedLanguage
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: selectedLanguage === 'kannada' 
          ? 'ಇಂದು ಟೊಮೇಟೊ ಬೆಲೆ ಪ್ರತಿ ಕ್ವಿಂಟಲ್ ₹2,800. ಬೆಲೆ 12% ಹೆಚ್ಚಾಗಿದೆ. ಮಾರಾಟ ಮಾಡಲು ಒಳ್ಳೆಯ ಸಮಯ!'
          : 'Today tomato price is ₹2,800 per quintal. Price has increased by 12%. Good time to sell!',
        timestamp: new Date(),
        language: selectedLanguage
      };
      setMessages(prev => [...prev, botResponse]);
      
      // Simulate text-to-speech
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 4000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Voice Assistant</h1>
          <p className="text-lg text-muted-foreground">
            Ask questions in your local language and get expert agricultural advice
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary" />
                    <CardTitle>AI Assistant</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="text-sm border border-border rounded px-2 py-1 bg-background"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-6">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start gap-3 ${
                          message.type === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-success text-success-foreground'
                        }`}>
                          {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-muted text-foreground'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isListening && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="bg-primary/10 text-primary p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm">Listening...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {isSpeaking && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-success/10 text-success p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Volume2 className="w-4 h-4 animate-pulse" />
                            <span className="text-sm">Speaking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                {/* Voice Controls */}
                <div className="p-6 border-t border-border">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      size="lg"
                      onClick={isListening ? stopListening : startListening}
                      className={`w-16 h-16 rounded-full ${
                        isListening 
                          ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                    >
                      {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </Button>
                    <div className="text-center">
                      <p className="text-sm font-medium">
                        {isListening ? 'Tap to stop' : 'Tap to speak'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Voice recognition active
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Tips */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
                <CardDescription>Try asking these common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sampleQuestions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <Badge variant="outline" className="text-xs">{question.category}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => addUserMessage(
                        selectedLanguage === 'kannada' ? question.kannada : question.english
                      )}
                    >
                      <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        {selectedLanguage === 'kannada' ? question.kannada : question.english}
                      </span>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Voice Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <span>Speak clearly and slowly for better recognition</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <span>Use simple sentences for complex questions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <span>Available in 10+ Indian languages</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <span>Works offline for basic queries</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-earth text-primary-foreground">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Mic className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Voice First Experience</h3>
                  <p className="text-sm opacity-90">
                    Designed for farmers who prefer speaking over typing
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;