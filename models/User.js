const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  autoIncrement = require("mongoose-auto-increment");

//Init auto increament
autoIncrement.initialize(mongoose.connection);

const UserSchema = new Schema({
  type: Number, //1 ==> admin, 2 ==> Vendor, 3 ==> Customer
  username: String,
  email: String,
  name: String,
  region: String,
  city: {
    type: Number,
    ref: "City",
  },
  phone: String,
  password: String,
  createTime: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.plugin(autoIncrement.plugin, { model: "User", startAt: 1 });

module.exports = mongoose.model("Article", UserSchema, "users");
