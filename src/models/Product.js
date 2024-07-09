const mongoose = require("mongoose");
require("./comments");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  suitableFor: {
    type: String,
    required: true,
  },
  smell: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default:5
  },
  Tags:{
    type: [String],
    required: true
  },
  comments:{
    type:[
        {
        type:mongoose.Types.ObjectId,
        ref:"Comment"
        }
    ]
  }
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
