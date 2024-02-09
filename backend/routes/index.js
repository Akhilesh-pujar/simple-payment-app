const express = require("express");
const router = express.Router();
const rootuser = require("./user")
const accountrouter = require("./account")
router.use("/user",rootuser)
router.use("/account",accountrouter)



module.exports=router;