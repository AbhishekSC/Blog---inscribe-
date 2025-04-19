import { validateAccessToken } from "../services/authentication.service.js";

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateAccessToken(tokenCookieValue);
      req.user = userPayload;
      console.log(user);
    } catch (error) {}

    next();
  };
}

export { checkForAuthenticationCookie };
