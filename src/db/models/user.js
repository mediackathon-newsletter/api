const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  journalist: { type: Boolean, default: false },
  biography: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  facebook: { type: String },
  street: { type: String },
  city: { type: String },
  postalCode: { type: String },
  birthday: { type: Date }
});

module.export = mongoose.model('User', userSchema);
