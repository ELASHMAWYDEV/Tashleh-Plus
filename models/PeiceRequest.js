const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  autoIncrement = require("mongoose-auto-increment");

//Init auto increament
autoIncrement.initialize(mongoose.connection);

const PeiceSchema = new Schema({
  name: String,
  quantity: Number,
});

const PeiceRequestSchema = new Schema({
  title: String,
  description: String,
  peices: [PeiceSchema],
  status: Number,
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
  model: "PeiceRequest",
  startAt: 1,
});

PeiceRequestSchema.plugin(autoIncrement.plugin, {
  model: "PeiceRequest",
  startAt: 1,
});

module.exports = mongoose.model(
  "PeiceRequest",
  PeiceRequestSchema,
  "peicesRequests"
);
