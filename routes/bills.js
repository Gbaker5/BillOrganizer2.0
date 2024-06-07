const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const billsController = require("../controllers/bills");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//Post Routes - simplified for now

router.get("/allBillsList", ensureAuth, billsController.getAllLists)
router.get("/newList", ensureAuth, billsController.getCreateList )
router.post("/newList", ensureAuth, billsController.postCreateList )
router.get("/newBill/:id", ensureAuth, billsController.getAddBills )
router.post("/newBill/:id", ensureAuth, billsController.postAddBills )


module.exports = router;