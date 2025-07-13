import PropTypes from "prop-types";

const ErrorMessage = ({ error, className = "" }) => {
  if (!error) return null;

  return (
    <div className={`text-red-400 text-sm mt-1 ${className}`}>
      {error}
    </div>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
};

const SuccessMessage = ({ message, className = "" }) => {
  if (!message) return null;

  return (
    <div className={`text-green-400 text-sm mt-1 ${className}`}>
      {message}
    </div>
  );
};

SuccessMessage.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

const AvailabilityIndicator = ({ status, className = "" }) => {
  if (status === null) return null;

  return (
    <div className={`absolute right-3 top-2 ${className}`}>
      {status === true ? (
        <span className="text-green-500 text-lg">✓</span>
      ) : (
        <span className="text-red-500 text-lg">✗</span>
      )}
    </div>
  );
};

AvailabilityIndicator.propTypes = {
  status: PropTypes.bool,
  className: PropTypes.string,
};

export { ErrorMessage, SuccessMessage, AvailabilityIndicator };
