const express = require("express");
const app = express();
const PORT = 3001;
//twilio



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
const service = require("./service");
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
app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body; // Phone number in E.164 format

  try {
    const verification = await client.verify.services(twilio.serviceSid)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });

    res.status(200).json({ message: 'OTP sent successfully', verificationSid: verification.sid });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
});
app.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otp } = req.body; // Phone number and OTP
  
  try {
    const verificationCheck = await client.verify.services(twilio.serviceSid)
      .verificationChecks
      .create({ to: phoneNumber, code: otp });

    if (verificationCheck.status === 'approved') {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
});
app.use("/service", service);
app.use("/customer", customerrouter);
app.use("/stylist", stylistrouter);
app.use("/salon", salonrouter);
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
