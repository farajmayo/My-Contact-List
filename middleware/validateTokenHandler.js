const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    // Fix the typo in header name: it should be "Authorization" instead of "Authorization"
    let authHeader = req.header("Authorization") || req.header("authorization");

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        // Use try-catch to handle errors from jwt.verify
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            // If the token is valid, attach the decoded user information to the request object
            req.user = decoded.user;
            next(); // Call next middleware
        } catch (err) {
            // Send a 401 Unauthorized response if the token is invalid
            res.status(401);
            throw new Error("User Is Unauthorized");
        }
    } else {
        // Send a 401 Unauthorized response if no token is provided
        res.status(401);
        throw new Error("No token provided");
    }
});

module.exports = validateToken;
