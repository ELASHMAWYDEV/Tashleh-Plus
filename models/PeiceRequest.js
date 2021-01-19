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
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  peices: [PeiceSchema],
  status: {
    type: Number,
    default: 1,
    required: true,
  },
  city: {
    type: Number,
    ref: "City",
    required: true,
  },
  userId: {
    type: Number,
    ref: "User",
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now(),
  },
  carTypeId: {
    type: Number,
    ref: "carTypes",
  }
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
