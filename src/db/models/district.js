const mongoose = require('mongoose');
const { Schema } = mongoose;

const districtSchema = new Schema({
  name: { type: String, required: true, unique: true },
  city: { type: Schema.Types.ObjectId, ref: 'City', required: true }
});

module.exports = mongoose.model('District', districtSchema);
