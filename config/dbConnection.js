const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        // Connect to MongoDB using the connection string from environment variables
        const connect = await mongoose.connect(process.env.connectionString);
        console.log("Connected To MongoDB", connect.connection.name);
    } catch (err) {
        // If an error occurs during connection, log the error and exit the process
        console.log(err);
        process.exit(1); // Use exit code 1 to indicate a failure
    }
};

module.exports = connectDb;
