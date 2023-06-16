import mongoose from 'mongoose';

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

export default mongoose.model('Tour', TourSchema);
