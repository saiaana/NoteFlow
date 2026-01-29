// =======================
//  AUTHENTICATION ERRORS
// =======================
export const AUTH_ERRORS = {
  MISSING_CREDENTIALS: {
    code: "MISSING_CREDENTIALS",
    message: "Please provide email and password.",
  },
  INVALID_CREDENTIALS: {
    code: "INVALID_CREDENTIALS",
    message: "Incorrect email or password.",
  },
  INVALID_EMAIL: {
    code: "INVALID_EMAIL",
    message: "Please enter a valid email address.",
  },
  NOT_LOGGED_IN: {
    code: "NOT_LOGGED_IN",
    message: "You are not logged in. Please log in to get access.",
  },
  TOKEN_INVALID: {
    code: "TOKEN_INVALID",
    message: "Invalid or expired token.",
  },
  PASSWORD_CHANGED: {
    code: "PASSWORD_CHANGED",
    message: "User recently changed password! Please log in again.",
  },
  USER_NOT_FOUND: {
    code: "USER_NOT_FOUND",
    message: "The user belonging to this token no longer exists.",
  },
  NO_PERMISSION: {
    code: "NO_PERMISSION",
    message: "You do not have permission to perform this action.",
  },
  INCORRECT_PASSWORD: {
    code: "INCORRECT_PASSWORD",
    message: "Incorrect password.",
  },
};

export const SIGN_UP_FORM_ERRORS = {
  NAME_REQUIRED: "Name is required.",
  EMAIL_REQUIRED: "Email is required.",
  INVALID_EMAIL: "Invalid email format.",
  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters.",
  CONFIRM_PASSWORD_REQUIRED: "Please confirm password.",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match.",
};

// =======================
//  USER & ACCOUNT ERRORS
// =======================
export const USER_ERRORS = {
  EMAIL_ALREADY_EXISTS: {
    code: "EMAIL_EXISTS",
    message: "This email is already registered.",
  },
};

export const DEMO_ERRORS = {
  DEMO_USER_NOT_FOUND: {
    code: "DEMO_USER_NOT_FOUND",
    message: "Demo user is not found.",
  },
};

// =======================
//  SYSTEM ERRORS
// =======================
export const SYSTEM_ERRORS = {
  UNKNOWN: {
    code: "UNKNOWN_ERROR",
    message: "Something went wrong. Please try again later.",
  },
};
