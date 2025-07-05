import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCropDiagnoses, useConversations } from "@/hooks/useFirestore";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, MessageCircle, TrendingUp, Leaf } from "lucide-react";

const Dashboard = () => {
  const { userProfile } = useAuth();
  const { diagnoses, loading: diagnosesLoading } = useCropDiagnoses();
  const { conversations, loading: conversationsLoading } = useConversations();

  const recentDiagnoses = diagnoses.slice(0, 3);
  const recentConversations = conversations.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userProfile?.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's your farming activity overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Diagnoses</CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{diagnoses.length}</div>
              <p className="text-xs text-muted-foreground">
                Crop health analyses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversations</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversations.length}</div>
              <p className="text-xs text-muted-foreground">
                AI assistant chats
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Farm Size</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{userProfile?.farmSize || 'N/A'}</div>
              <p className="text-xs text-muted-foreground">
                Farm classification
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Location</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{userProfile?.location || 'Not set'}</div>
              <p className="text-xs text-muted-foreground">
                Farming location
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Diagnoses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Crop Diagnoses</CardTitle>
            </CardHeader>
            <CardContent>
              {diagnosesLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                </div>
              ) : recentDiagnoses.length > 0 ? (
                <div className="space-y-4">
                  {recentDiagnoses.map((diagnosis) => (
                    <div key={diagnosis.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-destructive">{diagnosis.disease}</h4>
                        <p className="text-xs text-muted-foreground">
                          Confidence: {diagnosis.confidence}% • {diagnosis.severity}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {diagnosis.timestamp.toDate().toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {diagnosis.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No diagnoses yet. Upload a crop photo to get started!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent AI Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              {conversationsLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                </div>
              ) : recentConversations.length > 0 ? (
                <div className="space-y-4">
                  {recentConversations.map((conversation) => (
                    <div key={conversation.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {conversation.messages.length} messages
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {conversation.createdAt.toDate().toLocaleDateString()}
                        </span>
                      </div>
                      {conversation.messages.length > 0 && (
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.messages[0].content}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No conversations yet. Try the voice assistant!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;