const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")



//Register User
//Route Post /api/users/register
//access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Fields Are Required!" }); // Send response with status code and error message
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(409).json({ message: "User Already Exists!" }); // Send response with status code and error message
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);

    try {
        // Create the user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Log the created user
        console.log(`User Created ${user}`);

        // Return the newly created user in the response
        return res.status(201).json({ _id: user.id, email: user.email });
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error({ message: "User Data Not Valid" }); // Send response with status code and error message
    }
});


//Login User
//Route Post /api/users/login
//access private
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("Fields Are Required!"); // Send response with status code and error message
        }

        const userExists = await User.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid && !userExists) {
            res.status(401);
            throw new Error("Invalid Email or Password"); // Unauthorized if password is incorrect
        }

        const accessToken = jwt.sign({
            user: {
                username: userExists.username,
                email: userExists.email,
                password: userExists.password
            },
        }, process.env.SECRET, { expiresIn: "15m" });

        res.status(200).json({ accessToken }); // Send access token if login is successful
    } catch (error) {
        res.status(500);
        throw new Error(error.message); // Internal server error if an unexpected error occurs
    }
});



//Current User
//Route Post /api/users/current
//access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})



module.exports = { registerUser, loginUser, currentUser }