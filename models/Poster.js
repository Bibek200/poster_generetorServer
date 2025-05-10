import mongoose from 'mongoose';

const placeholderSchema = new mongoose.Schema({
  key: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  style: {
    fontSize: { type: Number, default: 20 },
    color: { type: String, default: '#000' },
    fontFamily: { type: String, default: 'Arial' }
  }
});

const posterSchema = new mongoose.Schema({
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  placeholders: [placeholderSchema],
  createdAt: { type: Date, default: Date.now }
});

const Poster = mongoose.model('Poster', posterSchema);
export default Poster;
