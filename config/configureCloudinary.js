const cloudinary = require("cloudinary");

async function configureCloudinary() {
  // Configuration
  cloudinary.config({
    cloud_name: "dufhru67m",
    api_key: "176842422384381",
    api_secret: process.env.CLOUDINARY_SECRET,
  });
}

module.exports = configureCloudinary;
