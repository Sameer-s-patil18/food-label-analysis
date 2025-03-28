import mongoose from 'mongoose';

const scanHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  extractedText: {
    type: String,
    required: true
  },
  analysis: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('ScanHistory', scanHistorySchema);