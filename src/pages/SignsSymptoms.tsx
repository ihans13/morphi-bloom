import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignsSymptoms = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#CDD8D1' }} className="h-screen">
      <ScrollArea className="h-full">
        <div className="container mx-auto p-4 max-w-md">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Signs & Symptoms</h1>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Track Your Signs & Symptoms
              </h2>
              <p className="text-muted-foreground mb-6">
                Monitor your health by logging symptoms and patterns to better understand your wellbeing.
              </p>
            </div>

            {/* Placeholder content - you can expand this based on requirements */}
            <div className="bg-background/80 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-medium mb-4 text-foreground">Common Symptoms to Track</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Energy levels</li>
                <li>• Sleep quality</li>
                <li>• Mood changes</li>
                <li>• Physical symptoms</li>
                <li>• Pain levels</li>
                <li>• Digestive issues</li>
              </ul>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SignsSymptoms;