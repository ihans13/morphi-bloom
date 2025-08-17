import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Pill, 
  MessageCircle, 
  CheckCircle, 
  User, 
  Settings, 
  Bell, 
  Shield, 
  LogOut,
  Camera
} from "lucide-react";

const Resources = () => {
  const navigate = useNavigate();
  
  const myResourcesCategories = [
    {
      id: "articles",
      title: "Saved Articles & Podcasts",
      icon: BookOpen,
      count: 12,
      color: "bg-gradient-primary",
      path: "/resources/articles"
    },
    {
      id: "supplements",
      title: "Supplements & Products",
      icon: Pill,
      count: 8,
      color: "bg-gradient-secondary",
      path: "/resources/supplements"
    },
    {
      id: "qna",
      title: "Q&A Posts",
      icon: MessageCircle,
      count: 5,
      color: "bg-accent/80",
      path: "/resources/qna"
    },
    {
      id: "tried",
      title: "Tried and Tested",
      icon: CheckCircle,
      count: 6,
      color: "bg-secondary/80",
      path: "/resources/tried"
    }
  ];

  const accountSettings = [
    {
      id: "notifications",
      title: "Notifications",
      description: "Manage your alerts and reminders",
      icon: Bell
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      description: "Control your data and account security",
      icon: Shield
    },
    {
      id: "preferences",
      title: "App Preferences",
      description: "Customize your experience",
      icon: Settings
    },
    {
      id: "logout",
      title: "Sign Out",
      description: "Log out of your account",
      icon: LogOut
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 bg-background min-h-screen">
      {/* Profile Section */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full border-2 border-border flex items-center justify-center">
            <User size={32} className="text-muted-foreground" />
          </div>
          <Button variant="icon" size="icon" className="absolute -bottom-1 -right-1 w-8 h-8">
            <Camera size={14} />
          </Button>
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">My Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your resources and settings</p>
        </div>
      </div>

      {/* My Resources Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">My Resources</h2>
        <div className="grid grid-cols-2 gap-3">
          {myResourcesCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id} 
                className="p-4 hover:shadow-warm transition-shadow cursor-pointer"
                onClick={() => navigate(category.path)}
              >
                <div className="text-center space-y-3">
                  <div className={`mx-auto w-12 h-12 rounded-full ${category.color} flex items-center justify-center shadow-lg`}>
                    <Icon 
                      size={20} 
                      className="text-foreground"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-xs text-foreground leading-tight">
                      {category.title}
                    </h3>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Account Settings</h2>
        <div className="space-y-2">
          {accountSettings.map((setting) => {
            const Icon = setting.icon;
            return (
              <Card 
                key={setting.id} 
                className={`p-4 hover:shadow-warm transition-shadow cursor-pointer ${
                  setting.id === 'logout' ? 'hover:bg-destructive/5' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    setting.id === 'logout' 
                      ? 'bg-destructive/10' 
                      : 'bg-accent/50'
                  }`}>
                    <Icon 
                      size={16} 
                      className={setting.id === 'logout' ? 'text-destructive' : 'text-foreground'}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium text-sm ${
                      setting.id === 'logout' ? 'text-destructive' : 'text-foreground'
                    }`}>
                      {setting.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Resources;