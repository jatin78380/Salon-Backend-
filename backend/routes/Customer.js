const {Router} = require("express");
const router = Router();
const {CustomerModel} = require("../models/CustomerModel");

router.post("/signup",(req,res)=>{
    const {firstname,lastname,email,phone,password} = req.body;
    CustomerModel.create({firstname,
        lastname,
        email,
        phone,
        password})
        res.json({message:"Customer created"})
})
module.exports = router;