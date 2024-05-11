const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username Required"]
    },
    email: {
        type: String,
        required: [true, "Email Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password Required"],
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
