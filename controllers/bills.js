const cloudinary = require("../middleware/cloudinary");
//const { create } = require("../models/Bills");
//const Bills = require("../models/Bills");

module.exports = {

    getProfile: async (req,res) => {

    try{
        res.render("profile.ejs", {user: req.user})
    } catch (err){
        console.log(err)
    }
        
    },




};