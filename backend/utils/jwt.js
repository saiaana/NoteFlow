const jwt = require("jsonwebtoken");

const signToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set!");
  }
  
  const isDemo = user.role === "demo-user";
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: isDemo ? "1h" : process.env.JWT_EXPIRES_IN || "90d",
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user);

  const { exp } = jwt.decode(token);
  const cookieExpiresAt = new Date(exp * 1000);

  const cookieOptions = {
    expires: cookieExpiresAt,
    httpOnly: true,
    path: "/",
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
    cookieOptions.sameSite = "none";
  } else {
    cookieOptions.secure = false;
    cookieOptions.sameSite = "lax";
  }

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

module.exports = { createAndSendToken };
