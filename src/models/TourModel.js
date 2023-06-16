const { default: mongoose } = require('mongoose');

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: Number,
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Tour', TourSchema);
