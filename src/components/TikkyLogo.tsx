interface TikkyLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function TikkyLogo({ className = "", size = "md" }: TikkyLogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8", 
    lg: "h-12"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Green checkmark circle */}
      <div className="relative">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg 
            className="w-5 h-5 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      {/* Tikky text */}
      <span className={`font-bold text-black dark:text-white ${sizeClasses[size]} text-2xl`} style={{ fontFamily: 'Arial, sans-serif' }}>
        Tikky
      </span>
    </div>
  );
}