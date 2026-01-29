const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Note = require("../models/noteModel");
const { createAndSendToken } = require("../utils/jwt");
const { AUTH_ERRORS } = require("../../shared/errors");
const {
  getTokenFromRequest,
  verifyToken,
  findValidUser,
  validateLoginInput,
  findAndVerifyUser,
  throwAuthError,
} = require("../utils/authHelpers");

const DAY = 24 * 60 * 60 * 1000;

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  validateLoginInput(email, password);

  const user = await findAndVerifyUser(email, password);
  createAndSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(0), // удалить немедленно
    httpOnly: true,
    path: "/",
  });

  res.status(200).json({ status: "success" });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = getTokenFromRequest(req);
  if (!token || token === "loggedout") {
    return next(throwAuthError(AUTH_ERRORS.NOT_LOGGED_IN));
  }

  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (err) {
    res.cookie("jwt", "loggedout", {
      expires: new Date(0),
      httpOnly: true,
      path: "/",
    });

    if (err.name === "TokenExpiredError") {
      return next(throwAuthError(AUTH_ERRORS.SESSION_EXPIRED));
    }
    return next(throwAuthError(AUTH_ERRORS.NOT_LOGGED_IN));
  }

  const currentUser = await findValidUser(decoded);
  if (!currentUser) {
    res.cookie("jwt", "loggedout", {
      expires: new Date(0),
      httpOnly: true,
      path: "/",
    });
    return next(throwAuthError(AUTH_ERRORS.USER_NOT_FOUND));
  }

  req.user = currentUser;
  next();
});

exports.checkAuth = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

exports.createAndLoginDemoUser = catchAsync(async (req, res, next) => {
  const random = crypto.randomBytes(6).toString("hex");
  const demoUser = await User.create({
    name: `demo-user-${random}`,
    email: `demo-user-${random}@notes-app.com`,
    role: "demo-user",
    password: "demo-user-pass",
    confirmPassword: "demo-user-pass",
  });

  await Note.insertMany([
    {
      title: "👋 Welcome!",
      content: "This is a demo note. You can edit or delete it.",
      author: demoUser._id,
      tags: ["add-your-own-tag", "important", "demo-tag"],
      isDemo: true,
      expiresAt: new Date(Date.now() + DAY),
    },
    {
      title: "📌 What can you do?",
      content:
        "Add notes, edit them, and explore the features — it’s safe to experiment.",
      author: demoUser._id,
      tags: ["important", "to-do"],
      isDemo: true,
      expiresAt: new Date(Date.now() + DAY),
    },
  ]);

  await createAndSendToken(demoUser, 200, res);
});
