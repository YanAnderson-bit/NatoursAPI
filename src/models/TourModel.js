import mongoose from 'mongoose';

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a max group size'],
  },
  difficulty: {
    type: String,
    required: [true, ' A tour must have a difficulty'],
    trim: true,
  },
  ratingsAverage: { type: Number, default: 0 },
  ratingsQuantity: { type: Number, default: 0 },

  price: {
    type: Number,
    required: [true, 'The price is required'],
  },
  discount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, ' A tour must have a cover image'],
    trim: true,
  },
  images: [String],
  createdAt: { type: Date, default: Date.now() },
  startDates: [Date],
});

export default mongoose.model('Tour', TourSchema);
