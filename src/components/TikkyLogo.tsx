interface CirclesLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CirclesLogo({ className = "", size = "md" }: CirclesLogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8", 
    lg: "h-12"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Circles Logo */}
      <div className="relative">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <div className="w-4 h-4 bg-accent rounded-full"></div>
          <div className="w-3 h-3 bg-secondary rounded-full"></div>
        </div>
      </div>
      {/* Circles text */}
      <span className={`font-bold text-black dark:text-white ${sizeClasses[size]} text-2xl`} style={{ fontFamily: 'Arial, sans-serif' }}>
        Circles
      </span>
    </div>
  );
}

// Keep the old export for backward compatibility
export const TikkyLogo = CirclesLogo;