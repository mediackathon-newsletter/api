const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  newsletter: {
    type: Schema.Types.ObjectId,
    ref: 'Newsletter',
    required: true
  },
  district: { type: Schema.Types.ObjectId, ref: 'District' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  title: { type: String, required: true },
  subtitle: { type: String },
  text: { type: String },
  date: { type: Date }
});

module.exports = mongoose.model('Event', articleSchema);
