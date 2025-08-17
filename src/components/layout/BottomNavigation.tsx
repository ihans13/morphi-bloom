import { useLocation, useNavigate } from "react-router-dom";
import { NavTab } from "@/components/ui/nav-tab";

const navigationItems = [
  { 
    id: "home", 
    label: "Home", 
    icon: "https://api.builder.io/api/v1/image/assets/556be626e37a450e8038ec05ad2116c3/429731f7ac7e5d03a28edbe559f744dcaa776b42?placeholderIfAbsent=true",
    path: "/" 
  },
  { 
    id: "chat", 
    label: "Morphi", 
    icon: "https://api.builder.io/api/v1/image/assets/556be626e37a450e8038ec05ad2116c3/a6e5b61d9826a329640a5f2f1e3252d1a9e3a5dd?placeholderIfAbsent=true",
    path: "/chat" 
  },
  { 
    id: "logging", 
    label: "Track", 
    icon: "https://api.builder.io/api/v1/image/assets/556be626e37a450e8038ec05ad2116c3/751c3d1aceb200d2402c061c2d03cddfdbe4384b?placeholderIfAbsent=true",
    path: "/logging" 
  },
  { 
    id: "community", 
    label: "Community", 
    icon: "https://api.builder.io/api/v1/image/assets/556be626e37a450e8038ec05ad2116c3/2a49763ea0948ddcd19c4326cc2b56d6fab82825?placeholderIfAbsent=true",
    path: "/community" 
  },
  { 
    id: "resources", 
    label: "Me", 
    icon: "https://api.builder.io/api/v1/image/assets/556be626e37a450e8038ec05ad2116c3/71b957805b1946c83d59bf3e9587cf730b851645?placeholderIfAbsent=true",
    path: "/resources" 
  }
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex gap-5 justify-center items-center text-xs text-center whitespace-nowrap bg-white shadow-sm text-neutral-500 fixed bottom-0 left-0 right-0">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto w-full">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavTab
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={isActive}
              onClick={() => navigate(item.path)}
            />
          );
        })}
      </div>
    </nav>
  );
};