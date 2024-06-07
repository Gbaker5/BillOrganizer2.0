const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    Name: {
        type:String,
    },
    TotalBalance: {
        type:Number,
    },
    Cost: {
        type:Number,
    },
    DueDate: {
        type:Date,
    },
    AmountPaid: {
        type:Number,
    },
    DatePaid: {
        type:Date,
    },
    RemainingBalance: {
        type:Number,
    },
    ListId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Bill", BillSchema);