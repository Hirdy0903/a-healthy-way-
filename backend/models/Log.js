import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  type: {
    type: String,
    required: true,
    enum: ['mood', 'journal', 'assessment', 'intervention_session', 'followup'],
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Flexible schema for different log types
    required: true,
  },
}, {
  timestamps: true,
});

const Log = mongoose.model('Log', logSchema);

export default Log;
