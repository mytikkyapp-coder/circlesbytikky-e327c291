interface CirclesLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CirclesLogo({ className = "", size = "md" }: CirclesLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl", 
    lg: "text-3xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Circles Logo */}
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary via-accent to-secondary rounded-full flex items-center justify-center shadow-lg`}>
          <div className="flex items-center justify-center gap-0.5">
            <div className="w-1.5 h-1.5 bg-white rounded-full opacity-90"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full opacity-90"></div>
          </div>
        </div>
      </div>
      {/* Circles text */}
      <span className={`font-bold text-black dark:text-white ${textSizeClasses[size]}`} style={{ fontFamily: 'Inter, Arial, sans-serif', letterSpacing: '-0.02em' }}>
        Circles
      </span>
    </div>
  );
}

// Keep the old export for backward compatibility
export const TikkyLogo = CirclesLogo;