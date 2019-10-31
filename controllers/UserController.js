const User = require("../models/UserSchema");
const jwtHelper = require("../utils/JWTHelper");
const { hash } = require("bcrypt");
const { BCRYPT_ROUNDS, JWT_SECRET } = process.env;

class UserController {
  async register(req, res, next) {
    const { email, password } = req.body;

    try {
      const isDuplicate = await User.find({ email });
      console.log(isDuplicate)
      if (isDuplicate.length !== 0) {
        return res.status(400).send("Duplicate Email");
      }
      const newUser = new User({
        email,
        password: await hash(password, parseInt(BCRYPT_ROUNDS))
      });
      const savedUser = await newUser.save();
      const token = jwtHelper.createToken(savedUser, JWT_SECRET);
      return res.status(201).json({
        access_token: token
      });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
  async login(req,res,next) {

  }
}

module.exports = new UserController();
