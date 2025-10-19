const mongoose = require('mongoose');

const padSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  encrypted_blob: {
    type: String,
    required: true,
  },
  encrypted: {
    type: Boolean,
    default: false,
  },
  // Store encryption metadata (IV, salt) for proper decryption
  encryptionMeta: {
    iv: String,
    salt: String,
  },
  // File attachments (images, PDFs, videos, audio, docs)
  attachments: [{
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    // Store file as base64 encoded string for simplicity
    // For production, use GridFS or cloud storage
    data: {
      type: String,
      required: true,
    },
    encrypted: {
      type: Boolean,
      default: false,
    },
    uploaded_at: {
      type: Date,
      default: Date.now,
    },
  }],
  metadata: {
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
});

// Update the updated_at timestamp before saving
padSchema.pre('save', function(next) {
  this.metadata.updated_at = new Date();
  next();
});

// Create slug from title before saving
padSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
  next();
});

const Pad = mongoose.model('Pad', padSchema);

module.exports = Pad;
