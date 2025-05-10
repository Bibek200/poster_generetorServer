import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  logoUrl: String,
  website: String,
  whatsapp: { type: String, required: true },
});

export default mongoose.model('Customer', customerSchema);
