const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    Name: {
        type:String,
    },
    Month: {
        type:String,
    },
    Year: {
        type:String,
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


module.exports = mongoose.model("List", ListSchema);
