const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
class JWTHelper {
    createToken({email,role},secret) {
        return jwt.sign({
            email,
            role
        },secret,{
            expiresIn: "3h",
            jwtid: randomstring.generate()
        });
    }
}

module.exports = new JWTHelper();