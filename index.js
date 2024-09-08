const express = require("express");
const app = express();
const PORT = 3001;

// const { twilio } = require('./twiconfig');
// const client = require('twilio')(twilio.accountSid, twilio.authToken);

// import modals
const stylistSignupModel = require("./models/stylistSignup");
const salonSignupModel = require("./models/salonSignup");

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
// const customerrouter = require("./routes/Customer");
// const stylistrouter = require("./routes/Stylist");
const servicerouter = require("./routes/service");
// const salonrouter = require("./routes/Salon");

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

// app.use("/service", serviceRoutes);
// app.use("/customer", customerrouter);
// app.use("/stylist", stylistrouter);
// app.use("/salonapi", salonrouter);
app.use("/service", servicerouter); // for uploading images

// stylist signup functionality

app.post("/stylist/signup", async (req, res) => {
  try {
    console.log("Received stylist signup data ");
    console.log(req.body);

    const { personalInfo, address } = req.body;

    // Check if phone number is valid (10 digits)
    if (!/^\d{10}$/.test(personalInfo.phone)) {
      return res.status(400).json({
        message: "Invalid phone number. It must be 10 digits.",
      });
    }

    // Check if email or phone number already exists
    const existingStylist = await stylistSignupModel.findOne({
      $or: [
        { "personalInfo.phone": personalInfo.phone },
        { "personalInfo.email": personalInfo.email },
      ],
    });

    if (existingStylist) {
      return res.status(400).json({
        message: "Email or phone number already exists.",
      });
    }

    // Check if all address fields are provided
    if (
      !address.address ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zip_postal ||
      !address.country
    ) {
      return res.status(400).json({
        message: "All address fields are required.",
      });
    }

    // Create a new stylist document using the received data
    const newStylist = new stylistSignupModel(req.body);

    // Save the stylist to the database
    await newStylist.save();

    // Respond with success and the stylist's information
    res.status(201).json({
      message: "Stylist signup successful!",
    });
  } catch (error) {
    console.error("Error during stylist signup:", error);
    res.status(500).json({
      message: "Error during stylist signup",
      error: error.message,
    });
  }
});

app.post("/salon/signup", async (req, res) => {
  try {
    console.log("Received salon signup data ");
    console.log(req.body);

    const { personalInfo, address } = req.body;

    // Check if phone number is valid (10 digits)
    if (!/^\d{10}$/.test(personalInfo.phone)) {
      return res.status(400).json({
        message: "Invalid phone number. It must be 10 digits.",
      });
    }

    // Check if email or phone number already exists
    const existingSalon = await salonSignupModel.findOne({
      $or: [
        { "personalInfo.phone": personalInfo.phone },
        { "personalInfo.email": personalInfo.email },
      ],
    });

    if (existingSalon) {
      return res.status(400).json({
        message: "Email or phone number already exists.",
      });
    }

    // Check if all address fields are provided
    if (
      !address.address ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zip_postal ||
      !address.country
    ) {
      return res.status(400).json({
        message: "All address fields are required.",
      });
    }

    // Create a new stylist document using the received data
    const newSalon = new salonSignupModel(req.body);

    try {
      // Save the stylist to the database
      await newSalon.save();
    } catch (e) {
      console.log(e);
    }

    // Respond with success and the stylist's information
    res.status(201).json({
      message: "Stylist signup successful!",
    });
  } catch (error) {
    console.error("Error during stylist signup:", error);
    res.status(500).json({
      message: "Error during stylist signup",
      error: error.message,
    });
  }
});

app.get("/salons", async (req, res) => {
  try {
    // Fetch all salons with relevant details, including the ID
    const salons = await salonSignupModel
      .find({}, "_id personalInfo businessImages address timings")
      .lean(); // Use .lean() to return plain JavaScript objects instead of Mongoose documents

    // Format response to include only relevant information
    const formattedSalons = salons.map((salon) => ({
      id: salon._id, // Include the ID
      name: salon.personalInfo.businessName, // Name of the salon
      images: {
        businessImages: salon.businessImages.businessImages,
        menuImages: salon.businessImages.menuImages,
        certImages: salon.businessImages.certImages,
      },
      address: salon.address,
      timings: salon.timings,
      gender:
        salon.businessImages.serviceFor.unisex == true
          ? "unisex"
          : salon.businessImages.serviceFor.male == true
          ? "male"
          : "female",
    }));

    // Respond with success and the list of salons
    res.status(200).json({
      message: "Salons retrieved successfully!",
      data: formattedSalons,
    });
  } catch (error) {
    console.error("Error fetching salons:", error);
    res.status(500).json({
      message: "Error fetching salons",
      error: error.message,
    });
  }
});

app.get("/salon/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the salon by ID, excluding the password field
    const salon = await salonSignupModel
      .findById(id, "-personalInfo.password")
      .lean(); // Use .lean() to return plain JavaScript objects instead of Mongoose documents

    if (!salon) {
      return res.status(404).json({
        message: "Salon not found",
      });
    }

    // Format response to include all relevant information
    const formattedSalon = {
      id: salon._id,
      phone: salon.personalInfo.phone,
      email: salon.personalInfo.email,
      name: salon.personalInfo.businessName,
      images: salon.businessImages,
      address: salon.address,
      timings: salon.timings,
      servicesOffered: salon.servicesOffered,
      staff: salon.staff,
      serviceFor: salon.businessImages.serviceFor, // Gender information
    };

    // Respond with the salon data
    res.status(200).json({
      message: "Salon retrieved successfully!",
      data: formattedSalon,
    });
  } catch (error) {
    console.error("Error fetching salon:", error);
    res.status(500).json({
      message: "Error fetching salon",
      error: error.message,
    });
  }
});

// POST route to insert dummy data
app.post("/insert-dummy-data", async (req, res) => {
  try {
    // Extract the data from the request body
    const dummyData = req.body;

    // Insert the dummy data into the MongoDB collection
    await salonSignupModel.insertMany(dummyData);

    // Respond with a success message
    res.status(201).json({
      message: "Dummy data inserted successfully!",
    });
  } catch (error) {
    console.error("Error inserting dummy data:", error);
    res.status(500).json({
      message: "Error inserting dummy data",
      error: error.message,
    });
  }
});

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
