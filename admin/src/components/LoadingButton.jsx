const LoadingButton = ({ 
  children, 
  isLoading = false, 
  disabled = false, 
  className = "", 
  type = "button",
  onClick,
  ...props 
}) => {
  const defaultClassName = "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200";
  
  const buttonClassName = className 
    ? `${defaultClassName} ${className}`
    : `${defaultClassName} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500`;

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={isLoading || disabled}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default LoadingButton;
