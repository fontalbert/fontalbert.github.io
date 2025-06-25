// models/Experience.js
const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  type: { type: String, enum: ['work', 'education'], required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  current: { type: Boolean, default: false },
  description: String,
  achievements: [String],
  technologies: [String],
  logo: String
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);