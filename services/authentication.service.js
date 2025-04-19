import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

//Load environment variables
dotenv.config();

//Get JWT secret from environment variable with fallback
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");
const JWT_EXPIRY = process.env.JWT_EXPIRY || "24h";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || crypto.randomBytes(32).toString("hex");
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || "7d";

//Creating access token with expiry
function createAccessToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    type: "access",
  };

  const options = {
    expiresIn: JWT_EXPIRY,
    algorithm: "HS256",
  };

  const accessToken = JWT.sign(payload, JWT_SECRET, options);

  return accessToken;
}

//Creating refresh token with long expiry
function createRefreshToken(user) {
  const payload = {
    _id: user._id, //use sub
    type: "refresh",
  };

  const options = {
    expiresIn: JWT_REFRESH_EXPIRY,
    algorithm: "HS256",
  };

  const refreshToken = JWT.sign(payload, JWT_REFRESH_SECRET, options);

  return refreshToken;
}

//Generate both tokens for authentication
function createTokensForUser(user) {
  return {
    accessT: createAccessToken(user),
    refreshT: createRefreshToken(user),
  };
}

//Validating access token
function validateAccessToken(token) {
  try {
    const payload = JWT.verify(token, JWT_SECRET, { algorithms: ["HS256"] });

    if (payload.type !== "access") {
      throw new Error("Invalid token type");
    }

    return payload;
  } catch (error) {
    throw new Error(`Token validation failed: ${error.message}`);
  }
}

//Vallidating refresh token
function validatingRefreshToken(token) {
  try {
    const payload = JWT.verify(token, JWT_EXPIRY, { algorithms: ["HS256"] });

    if (payload.type !== "refresh") {
      throw new Error("Invalid token type");
    }

    return payload;
  } catch (error) {
    throw new Error(`Token validation failed: ${error.message}`);
  }
}

//Refresh the access token using refresh token
function refreshAccessToken(refreshToken) {
  try {
    const payload = validatingRefreshToken(refreshToken);

    //In production:
    // 1. Check if the refresh token is in a blacklist/database
    // 2. Fetch the latest user data from database

    const user = {
      _id: payload._id,
      role: payload.role,
    };

    return createAccessToken(user);
  } catch (error) {
    throw new Error(`Token refresh failed: ${error.message}`);
  }
}

export {
  createTokensForUser,
  validateAccessToken,
  validatingRefreshToken,
  refreshAccessToken,
  createAccessToken,
};
