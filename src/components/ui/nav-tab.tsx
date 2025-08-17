import * as React from "react";

interface NavTabProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function NavTab({ icon, label, isActive = false, onClick }: NavTabProps) {
  return (
    <div 
      className={`flex flex-col justify-center items-center w-16 h-full cursor-pointer transition-all duration-200 ${
        isActive 
          ? 'font-bold' 
          : 'hover:opacity-80'
      }`}
      style={{
        color: isActive ? '#6CAC82' : '#666C68'
      }}
      onClick={onClick}
    >
      <img
        src={icon}
        alt={`${label} icon`}
        className="object-contain w-6 h-6 transition-all duration-200"
        style={{
          filter: isActive 
            ? 'brightness(0) saturate(100%) invert(60%) sepia(15%) saturate(1347%) hue-rotate(85deg) brightness(95%) contrast(89%)'
            : 'brightness(0) saturate(100%) invert(38%) sepia(7%) saturate(1134%) hue-rotate(81deg) brightness(95%) contrast(89%)'
        }}
      />
      <div className="mt-1 text-xs text-center transition-all duration-200">
        {label}
      </div>
    </div>
  );
}