import { useLocation, useNavigate } from "react-router-dom";
import { Home, MessageCircle, FileText, Users, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { 
    id: "home", 
    label: "Home", 
    icon: Home, 
    path: "/" 
  },
  { 
    id: "chat", 
    label: "Morphi", 
    icon: MessageCircle, 
    path: "/chat" 
  },
  { 
    id: "logging", 
    label: "Log", 
    icon: FileText, 
    path: "/logging" 
  },
  { 
    id: "community", 
    label: "Q&A", 
    icon: Users, 
    path: "/community" 
  },
  { 
    id: "resources", 
    label: "Saved", 
    icon: BookOpen, 
    path: "/resources" 
  }
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200",
                "hover:bg-accent/50 active:scale-95",
                isActive 
                  ? "text-primary bg-gradient-primary shadow-warm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                size={20} 
                className={cn(
                  "mb-1 transition-colors",
                  isActive && "text-primary-foreground"
                )} 
              />
              <span 
                className={cn(
                  "text-xs font-medium",
                  isActive && "text-primary-foreground"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};