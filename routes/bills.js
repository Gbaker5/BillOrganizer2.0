const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const billsController = require("../controllers/bills");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//Post Routes - simplified for now

module.exports = router;