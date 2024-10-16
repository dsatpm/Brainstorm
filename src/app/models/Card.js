import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({

  name: String,
  imageUrl: String,
  type: String,
  manaCost: String,
});

export default mongoose.models.Card || mongoose.model('Card', CardSchema);