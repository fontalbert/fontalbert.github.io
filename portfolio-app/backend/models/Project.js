// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  type: { type: String, enum: ['personal', 'professional'], required: true },
  status: { type: String, enum: ['completed', 'in-progress', 'planned'], default: 'completed' },
  startDate: Date,
  endDate: Date,
  technologies: [String],
  features: [String],
  images: [String],
  thumbnail: String,
  demoUrl: String,
  githubUrl: String,
  liveUrl: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);