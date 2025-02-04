import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    reciverId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timeseries: true }
);

export const Message = mongoose.model('Message', messageSchema);
