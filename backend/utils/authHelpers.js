const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("./appError");
const { AUTH_ERRORS } = require("../../shared/errors");
const User = require("../models/userModel");

const throwAuthError = (errorType, status = 401) => {
  throw new AppError(errorType.message, status, errorType.code);
};

const getTokenFromRequest = (req) => {
  if (req.cookies?.jwt) return req.cookies.jwt;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};

const verifyToken = async (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set!");
  }
  
  try {
    return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch {
    throwAuthError(AUTH_ERRORS.TOKEN_INVALID);
  }
};

const findValidUser = async (decoded) => {
  const user = await User.findById(decoded.id);
  if (!user) throwAuthError(AUTH_ERRORS.USER_NOT_FOUND);

  return user;
};

const validateLoginInput = (email, password) => {
  if (!email || !password) throwAuthError(AUTH_ERRORS.MISSING_CREDENTIALS);
};

const findAndVerifyUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password)))
    throwAuthError(AUTH_ERRORS.INVALID_CREDENTIALS);
  return user; 
};

module.exports = {
  getTokenFromRequest,
  verifyToken,
  findValidUser,
  validateLoginInput,
  findAndVerifyUser,
  throwAuthError,
};
