const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};

const USER_ROLES = {
    ADMIN: 'Admin',
    USER: 'User'
};

const PRODUCT_STATUS = {
    IN_STOCK: 'INSTOCK',
    OUT_OF_STOCK: 'OUTOFSTOCK',
    LOW_STOCK: 'LOWSTOCK'
};

const ERROR_MESSAGES = {
    REQUIRED_FIELDS: 'All fields are required',
    INVALID_EMAIL: 'Invalid email format',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long',
    DUPLICATE_USERNAME: 'Username already exists',
    DUPLICATE_EMAIL: 'Email already exists',
    UNAUTHORIZED: 'Unauthorized',
    USER_NOT_FOUND: 'User not found',
    PRODUCT_NOT_FOUND: 'Product not found',
    BASKET_NOT_FOUND: 'Basket not found',
    SERVER_ERROR: 'Server error',
    PERMISSION_DENIED: 'You can only update your own profile',
    INVALID_TOKEN: 'Invalid or expired reset token',
    OUT_OF_STOCK: 'Product is out of stock'
};

const SUCCESS_MESSAGES = {
    USER_CREATED: (userName) => `New user ${userName} created`,
    USER_UPDATED: (userName) => `User ${userName} updated`,
    USER_DELETED: (userName) => `User ${userName} deleted`,
    LOGOUT_SUCCESS: 'Logout successful',
    PASSWORD_RESET_SENT: 'Password reset link has been sent to your email',
    PASSWORD_RESET_SUCCESS: 'Password has been reset successfully'
};

const JWT_CONFIG = {
    EXPIRES_IN: '24h'
};

const PASSWORD_RESET_CONFIG = {
    TOKEN_EXPIRY: 3600,
    TOKEN_LENGTH: 32
};

module.exports = {
    HTTP_STATUS,
    USER_ROLES,
    PRODUCT_STATUS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    JWT_CONFIG,
    PASSWORD_RESET_CONFIG
};
