// backend/routes/account.js
const express = require('express');
const { authmiddleware } = require('../middleware');
const { PayAccount} = require('../db');

const router = express.Router();

router.get("/balance", authmiddleware, async (req, res) => {
    const userId = req.userId
    const account = await PayAccount.findOne({
        userId: userId
    });

    res.json({
        balance: (account.balance/100)});
});

router.post("/transfer", authmiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await PayAccount.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await PayAccount.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await PayAccount.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await PayAccount.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;