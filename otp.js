const { Router } = require("express");
const router = Router();
const { twilio } = require('../twiconfig');
const client = require('twilio')(twilio.accountSid, twilio.authToken);

// Route to send OTP
router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body; // Phone number in E.164 format
  
  try {
    const verification = await client.verify.v2.services(twilio.serviceSid)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });

    res.status(200).json({ message: 'OTP sent successfully', verificationSid: verification.sid });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

// Route to verify OTP
router.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otp } = req.body; // Phone number and OTP
  
  try {
    const verificationCheck = await client.verify.v2.services(twilio.serviceSid)
      .verificationChecks
      .create({ to: phoneNumber, code: otp });

    if (verificationCheck.status === 'approved') {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid OTP ' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
});
