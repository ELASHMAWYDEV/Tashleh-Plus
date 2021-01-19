const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  autoIncrement = require("mongoose-auto-increment");

//Init auto increament
autoIncrement.initialize(mongoose.connection);

const ModelSchema = new Schema({
  name: String,
});

const CarTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  models: [ModelSchema],
  createTime: {
    type: Date,
    default: Date.now(),
  },
});

CarTypeSchema.plugin(autoIncrement.plugin, {
  model: "CarType",
  startAt: 1,
});

module.exports = mongoose.model("CarType", CarTypeSchema, "carTypes");
