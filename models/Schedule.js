import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  posterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poster',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Schedule', scheduleSchema);
