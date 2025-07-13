import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: false, // Make it optional if you don't have user auth yet
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['general', 'important', 'ideas', 'todos', 'questions'],
    default: 'general'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This will automatically handle createdAt and updatedAt
});

// Index for efficient queries
noteSchema.index({ projectId: 1, createdAt: -1 });
noteSchema.index({ projectId: 1, userId: 1, createdAt: -1 });

// Update the updatedAt field before saving
noteSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

export default mongoose.model('Note', noteSchema);
