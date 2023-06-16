import mongoose from 'mongoose';

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  rating: Number,
  price: {
    type: Number,
    required: [true, 'The price is required'],
  },
});

export default mongoose.model('Tour', TourSchema);
