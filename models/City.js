const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  autoIncrement = require("mongoose-auto-increment");

//Init auto increament
autoIncrement.initialize(mongoose.connection);

const CitySchema = new Schema({
  name: String,
  createTime: {
    type: Date,
    default: Date.now(),
  },
});

CitySchema.plugin(autoIncrement.plugin, {
  model: "City",
  startAt: 1,
});

module.exports = mongoose.model("City", CitySchema, "city");
