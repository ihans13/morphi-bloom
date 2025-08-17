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
      className={`flex flex-col justify-center w-16 cursor-pointer transition-colors ${
        isActive ? 'font-bold text-slate-500' : 'text-neutral-500'
      }`}
      onClick={onClick}
    >
      <img
        src={icon}
        alt={`${label} icon`}
        className="object-contain self-center w-6 aspect-square"
      />
      <div className="mt-1 text-xs text-center">
        {label}
      </div>
    </div>
  );
}