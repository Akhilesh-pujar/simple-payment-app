const express = require("express");
const router = express.Router();
const rootuser = require("./user")
const accountrouter = require("./acount")

router.post("/user",rootuser)
router.post("/account",accountrouter)



module.exports=router;