const mongoose = require("mongoose");
// Define the selection schema
const selectionSchema = new mongoose.Schema({
  options: [String], // Array of selected options
});

// Define the stylist schema
const SalonSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  businessName: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  address:{type: String},
  street: {type:String},
  city:{type:String},
  state:{type:String},
  postalcode:{type:Number},

  // Embed selection schema
  selection: selectionSchema,
});

// Create a virtual property for options to access directly from stylist
SalonSchema
  .virtual("options")
  .get(function () {
    return this.selection.options;
  })
  .set(function (options) {
    this.selection.options = options;
  });

const SalonModel = mongoose.model("Salon", SalonSchema);

module.exports = SalonModel;
