import mongoose from 'mongoose';

const referenceSchema = new mongoose.Schema({
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
  url: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String, // Fetched content from the URL
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
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
referenceSchema.index({ projectId: 1, createdAt: -1 });
referenceSchema.index({ projectId: 1, userId: 1, createdAt: -1 });

// Update the updatedAt field before saving
referenceSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

export default mongoose.model('Reference', referenceSchema);
