const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  autoIncrement = require("mongoose-auto-increment");

//Init auto increament
autoIncrement.initialize(mongoose.connection);

const PeiceSchema = new Schema({
  title: String,
  description: String,
  peicesAvailable: Number,
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

PeiceSchema.plugin(autoIncrement.plugin, {
  model: "Peice",
  startAt: 1,
});

module.exports = mongoose.model("Peice", PeiceSchema, "peices");
