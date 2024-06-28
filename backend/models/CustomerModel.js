const mongoose = require('mongoose');
const zod = require('zod');
mongoose.connect("mongodb+srv://jatin8612:Jatin%40rkblbrrk!12@cluster0.nkvwqm9.mongodb.net/saloninternship");  

const CustomerSchema = new mongoose.Schema({ 
    firstname: {
        type: String,
        required: true
    }, 
    lastname: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})
const CustomerModel = mongoose.model('customer', CustomerSchema);
console.log("njb")
console.log(typeof(phone));

const CustomerZodSchema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.string().email({message: "Invalid email address"}).endsWith("@gmail.com"),
    phone: zod.number(),
    password:zod.string()
    
})

const createCustomer = async (customerData) => {
    const validation = CustomerZodSchema.safeParse(customerData);
    if (!validation.success) {
      // Handle validation errors
       res.status(400).json({
        message: "Invalid input entered",
       })
    }
    // If valid, save to the database
    const customer = new CustomerModel(customerData);
    await customer.save();
    return customer;
  };
  module.exports = {CustomerModel, createCustomer};
  