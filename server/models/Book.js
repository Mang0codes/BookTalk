import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publishedOn: Date,
  description: String,
  coverImage: String, // ← This will be the Cloudinary image URL
  rating: Number, // store fetched rating
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Books', bookSchema);
