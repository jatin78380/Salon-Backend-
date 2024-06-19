const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const customerrouter= require('./routes/Customer');
const customermodel = require('./models/CustomerModel');
app.use(bodyparser.json());
app.use(express.json());
app.use("/customer",customerrouter);

app.listen(3000,()=>{
    console.log("server is running");
})