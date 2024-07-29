const express = require("express");
const app = express();
const PORT = 3001;




const { twilio } = require('./twiconfig');
const client = require('twilio')(twilio.accountSid, twilio.authToken);

const cors = require("cors");
const morgan = require("morgan"); // request logging
const mongoose = require("mongoose"); // database connection

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// config
const configureCloudinary = require("./config/configureCloudinary");

// routers
const customerrouter = require("./routes/Customer");
const stylistrouter = require("./routes/Stylist");
const service = require("./routes/service");
const salonrouter = require("./routes/Salon");

require("dotenv").config();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure cloudinary
try {
  configureCloudinary();
} catch (e) {
  console.log("Error occured while configuring cloudinary.");
}

app.use("/service", service);
app.use("/customer", customerrouter);
app.use("/stylist", stylistrouter);
app.use("/salonapi", salonrouter);
// connect to db , then start the server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log("server is running");
    });
  })
  .catch((e) => {
    console.log("Error while connecting to DB.");
    console.log(e);
  });
