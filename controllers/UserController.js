const User = require("../models/UserSchema");
const jwtHelper = require("../utils/JWTHelper");
const { hash, compare } = require("bcrypt");
const { BCRYPT_ROUNDS, JWT_SECRET } = process.env;
const allowedRoles = ["admin","moderator","student"]
class UserController {
  async register(req, res, next) {
    const { email, password } = req.body;

    try {
      const isDuplicate = await User.find({ email });
      if (isDuplicate.length !== 0) {
        return res.status(400).send("Duplicate Email");
      }
      const newUser = new User({
        email,
        password: await hash(password, parseInt(BCRYPT_ROUNDS))
      });
      const savedUser = await newUser.save();
      const token = await jwtHelper.createToken(savedUser, JWT_SECRET);
      return res.status(201).json({
        access_token: token
      });
    } catch (e) {
      return res.status(500).send("System Error. Contact Support");
    }
  }
  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const loginUser = await User.findOne({ email });
      if (loginUser) {
        try {
          const isMatch = await compare(password, loginUser.password);
          if (isMatch) {
            const token = await jwtHelper.createToken(loginUser, JWT_SECRET);
            console.log(token);
            return res.status(200).json({
              access_token: token
            });
          } else return res.status(401).send("Invalid Credintials");
        } catch (e) {
          return res.status(401).send("Invalid Credintials");
        }
      } else return res.status(401).send("Invalid Credintials");
    } catch (e) {
      console.log(e);
      return res.status(500).send("System Error. Contact Support");
    }
  }
  async changeRole(req,res,next) {
      const {email,newRole} = req.body;
      if (!allowedRoles.includes(newRole))
        res.status(400).send("Invalid Role")
      try {
        const user = await User.findOneAndUpdate({email},{role:newRole});
        if(!user)
            return res.status(404).send("User Not Found");
        return res.status(204).send();
      } catch (e) {
        return res.status(404).send("System Error. Contact Support");
      }
  }
}

module.exports = new UserController();
