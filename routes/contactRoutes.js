const express = require("express");
const router = express.Router();
const { getContact, getAllContact, createContact, updateContact, deleteContact } = require("../controllers/myContactController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken)
// Define routes for handling contact operations
router.route("/").get(getAllContact).post(createContact); // Route for getting all contacts and creating a new contact
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact); // Route for getting, updating, and deleting a specific contact by ID

module.exports = router;
