const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get All Contacts
// Route: GET /api/contacts
// Access: private
const getAllContact = asyncHandler(async (req, res) => {
    try {
        const contacts = await Contact.find({ createdBy : req.user._id }); // Access only contacts created by the current user
        return res.status(200).json(contacts);
    } catch (error) { // Catch and handle errors
        res.status(500); // Set status code
        throw new Error(error.message); // Throw an error with message
    }
});

// Create New Contact
// Route: POST /api/contacts
// Access: private
const createContact = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Check if any of the required fields are missing
        if (!name || !email || !phone) {
            return res.status(400).json({ error: "All Fields Are Required" }); // Send error response
        }
        const userid = req.user._id
        console.log(userid)
        // Create a new contact using the Contact model
        const newContact = await Contact.create({
            name,
            email,
            phone,
            createdBy : req.user._id, // Assign the createdBy field to the current user's ID
        });

        // Return the created contact in the response
        return res.status(201).json(newContact);
    } catch (error) { // Catch and handle errors
        res.status(500).json({ error: error.message }); // Send error response
    }
});



// Get Contact by ID
// Route: GET /api/contacts/:id
// Access: private
const getContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404); // Set status code
            throw new Error("Contact Not Found"); // Throw an error
        }
        return res.status(200).json(contact);
    } catch (error) { // Catch and handle errors
        res.status(500); // Set status code
        throw new Error(error.message); // Throw an error with message
    }
});

// Update Contact by ID
// Route: PATCH /api/contacts/:id
// Access: private
const updateContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404); // Set status code
            throw new Error("Contact Not Found"); // Throw an error
        }

        if(contact.user._id.toString() !== req.user.id){
            res.status(403)
            throw new Error({message : "User Has No Premission to Update Data !"})
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.status(200).json(updatedContact);
    } catch (error) { // Catch and handle errors
        res.status(500); // Set status code
        throw new Error(error.message); // Throw an error with message
    }
});

// Delete Contact by ID
// Route: DELETE /api/contacts/:id
// Access: private
const deleteContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404); // Set status code
            throw new Error("Contact Not Found"); // Throw an error
        }

        if(contact.user._id.toString() !== req.user.id){
            res.status(403)
            throw new Error({message : "User Has No Premission to Delete Data !"})
        }

        await Contact.deleteOne({ _id: req.params.id });

        return res.status(204).json(contact);
    } catch (error) { // Catch and handle errors
        res.status(500); // Set status code
        throw new Error(error.message); // Throw an error with message
    }
});

module.exports = { getContact, getAllContact, createContact, updateContact, deleteContact };