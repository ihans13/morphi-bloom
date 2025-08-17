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
      className={`flex flex-col justify-center w-16 cursor-pointer transition-all duration-200 ${
        isActive 
          ? 'font-bold text-green-600 scale-110' 
          : 'text-neutral-400 hover:text-neutral-500'
      }`}
      onClick={onClick}
    >
      <img
        src={icon}
        alt={`${label} icon`}
        className={`object-contain self-center w-6 aspect-square transition-all duration-200 ${
          isActive ? 'filter brightness-0 saturate-100 hue-rotate-90' : ''
        }`}
      />
      <div className="mt-1 text-xs text-center transition-all duration-200">
        {label}
      </div>
    </div>
  );
}