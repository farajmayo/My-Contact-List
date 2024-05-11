const mongoose = require("mongoose");

// Define the schema for the contact
const contactSchema = mongoose.Schema({
   
    name: {
        type: String,
        required: [true, "Contact Name Required"] // Name is required
    },
    email: {
        type: String,
        required: [true, "Contact Email Required"], // Email is required
        unique: true ,// Ensure email is unique
        sparse : true
    },
    phone: {
        type: String,
        required: [true, "Contact Phone Required"], // Phone is required
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true,
    },
}, { timestamps: true }); // Add timestamps to track createdAt and updatedAt

// Export the Contact model with the defined schema
module.exports = mongoose.model("Contact", contactSchema);
