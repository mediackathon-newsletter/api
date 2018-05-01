const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsletterSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['EVENTS', 'ARTICLES'], required: true }
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
