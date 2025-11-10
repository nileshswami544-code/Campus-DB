/**
 * Format success response
 */
const successResponse = (data, message = 'Operation successful', statusCode = 200) => {
  return {
    success: true,
    message,
    data,
    statusCode
  };
};

/**
 * Format error response
 */
const errorResponse = (message, statusCode = 500, error = null) => {
  return {
    success: false,
    message,
    error,
    statusCode
  };
};

/**
 * Async error handler wrapper
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
};

/**
 * Send email (placeholder for future implementation)
 */
const sendEmail = async (to, subject, text) => {
  // Implement email sending logic here
  console.log(`Email sent to ${to}: ${subject}`);
  return true;
};

module.exports = {
  successResponse,
  errorResponse,
  asyncHandler,
  sendEmail
};