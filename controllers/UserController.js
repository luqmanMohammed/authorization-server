const User = require("../models/UserSchema");
const { hash } = require("bcrypt");
const { BCRYPT_ROUNDS } = process.env;

class UserController {
  async register(req, res, next) {
    const { email, password } = req.body;

    try {
      const isDuplicate = User.find({ email });
      if(isDuplicate) {
          return res.status(400).json()
      }
      const User = new User({
        email,
        password: await hash(password, BCRYPT_ROUNDS)
      });
      const savedUser = await User.save();

    } catch (e) {
        res.status(500).send(e.message)
    }
  }
}
