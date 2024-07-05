const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const customerrouter= require('./routes/Customer');
const customermodel = require('./models/CustomerModel');
const stylistrouter= require('./routes/Stylist');
const stylistmodel = require('./models/StylistModel');
// const salonmodel = require('./models/SalonModel');
// const salonrouter= require('./routes/Salon');
app.use(bodyparser.json());
app.use(express.json());
app.use("/customer",customerrouter);
app.use("/stylist",stylistrouter);

app.listen(3000,()=>{
    console.log("server is running");
})