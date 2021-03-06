const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
class JWTHelper {
  createToken({ email, role }, secret) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          email,
          role
        },
        secret,
        {
          expiresIn: "3h",
          jwtid: randomstring.generate()
        },
        (err, token) => {
          if (err) return reject(err);
          else return resolve(token);
        }
      );
    });
  }
  verifyToken(token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
  }

  splitToken(bearerToken) {
      return bearerToken.split(" ")[1]
  }
}

module.exports = new JWTHelper();
