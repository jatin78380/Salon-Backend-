const mongoose = require("mongoose");
// Define the selection schema
const selectionSchema = new mongoose.Schema({
  options: [String], // Array of selected options
});

// Define the stylist schema
const stylistSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  businessName: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  address:{type: String},
  street: {type:Number},
  city:{type:String},
  state:{type:String},
  postalcode:{type:Number},
  country:{type:String},
  // Embed selection schema
  selection: selectionSchema,
});

// Create a virtual property for options to access directly from stylist
stylistSchema
  .virtual("options")
  .get(function () {
    return this.selection.options;
  })
  .set(function (options) {
    this.selection.options = options;
  });

const StylistModel = mongoose.model("Stylist", stylistSchema);

module.exports = StylistModel;
