/**
 * User roles
 */
const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin'
};

/**
 * Material types
 */
const MATERIAL_TYPES = {
  NOTES: 'notes',
  PPT: 'ppt',
  VIDEO: 'video'
};

/**
 * HTTP status codes
 */
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

/**
 * API response messages
 */
const MESSAGES = {
  USER_EXISTS: 'User with this email already exists',
  INVALID_CREDENTIALS: 'Invalid email or password',
  TOKEN_REQUIRED: 'Access token required',
  INVALID_TOKEN: 'Invalid or expired token',
  INSUFFICIENT_PERMISSIONS: 'You do not have permission to perform this action',
  NOT_FOUND: 'Resource not found',
  VALIDATION_FAILED: 'Input validation failed',
  SERVER_ERROR: 'Internal server error'
};

//rkd
module.exports = {
  USER_ROLES,
  MATERIAL_TYPES,
  HTTP_STATUS,
  MESSAGES
};