const mongoose = require("mongoose");
const roles = ["admin","moderator","student"];
const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String,
        default: "student",
        validate: {
            validator: role => roles.includes(role),
            message: "Invalid Role"
        }
    }
});

const User = mongoose.model("User",UserSchema);
module.exports = User;