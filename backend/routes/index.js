const express = require("express");
const router = express.Router();
const user = require("./user")
const accountrouter = require("./acount")

router.post("/user",user)
router.post("/account",accountrouter)



module.exports=router;