const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  autoIncrement = require("mongoose-auto-increment");

//Init auto increament
autoIncrement.initialize(mongoose.connection);

const CarSchema = new Schema({
  title: String,
  description: String,
  status: Number,
  price: Number,
  city: {
    type: Number,
    ref: "City",
  },
  userId: {
    type: Number,
    ref: "User",
  },
  createTime: {
    type: Date,
    default: Date.now(),
  },
});

CarSchema.plugin(autoIncrement.plugin, {
  model: "Car",
  startAt: 1,
});

module.exports = mongoose.model("Car", CarSchema, "cars");
