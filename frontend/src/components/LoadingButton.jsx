import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";

const LoadingButton = ({
  children,
  isLoading = false,
  disabled = false,
  loadingText = "Loading...",
  className = "",
  type = "button",
  onClick,
  variant = "primary",
  size = "default",
  ...props
}) => {
  const baseClasses = "flex items-center justify-center gap-2 font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-300",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500 disabled:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 disabled:bg-red-300",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 disabled:bg-green-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 disabled:bg-gray-100 disabled:text-gray-400"
  };
  
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    default: "px-4 py-2",
    large: "px-6 py-3 text-lg"
  };
  
  const isDisabled = disabled || isLoading;
  
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
      <span>{isLoading ? loadingText : children}</span>
    </button>
  );
};

LoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  loadingText: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success", "outline"]),
  size: PropTypes.oneOf(["small", "default", "large"]),
};

export default LoadingButton;
