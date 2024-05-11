const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    // Determine the status code from the response or default to 500 (Internal Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Handle different types of errors based on their status code
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            // Respond with a validation error message
            res.json({ title: "Validation Error", message: err.message, stackTrace: err.stack });
            break;

        case constants.NOT_FOUND:
            // Respond with a not found error message
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;

        case constants.UNAUTHORIZED:
            // Respond with an unauthorized error message
            res.json({ title: "UnAuthorized", message: err.message, stackTrace: err.stack });
            break;

        case constants.FORBIDDEN:
            // Respond with a forbidden error message
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;

        case constants.SERVER_ERROR:
            // Respond with a server error message
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
            break;

        default:
            // If no specific error status code is matched, log that everything is okay
            console.log("No Error, All Good!");
            break;
    }
};

module.exports = errorHandler;
