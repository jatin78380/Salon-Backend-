const {Router} = require("express");
const router = Router();
const {CustomerModel,createCustomer} = require("../models/CustomerModel");

router.post("/signup",(req,res)=>{
    
    const {firstname,lastname,email,phone,password} = req.body;
    
   try{
    CustomerModel.create({firstname,
        lastname,
        email,
        phone,
        password})
        res.json({message:"Customer created"})
    
   } 

   catch(e){
    console.log(e)
   }
})
module.exports = router;