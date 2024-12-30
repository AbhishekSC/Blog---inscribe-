import JWT from "jsonwebtoken";

const secret = "$fh7%8hHSG434M4N";

//creating token
function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);

  return token;
}

//validating token
function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

export { createTokenForUser, validateToken };
