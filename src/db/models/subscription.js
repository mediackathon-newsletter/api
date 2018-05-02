const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  city: { type: Schema.Types.ObjectId, ref: 'City', required: true }
});

subscriptionSchema.post('save', (doc, next) => {
  doc
    .populate('city')
    .execPopulate()
    .then(() => {
      next();
    });
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
