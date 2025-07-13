import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";

const LoadingSpinner = ({ 
  size = "default", 
  text = "Loading...", 
  className = "",
  showText = true 
}) => {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-6 w-6",
    large: "h-8 w-8"
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
      {showText && <span>{text}</span>}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "default", "large"]),
  text: PropTypes.string,
  className: PropTypes.string,
  showText: PropTypes.bool,
};

export default LoadingSpinner;
