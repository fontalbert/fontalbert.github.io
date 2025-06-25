// models/Skill.js
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Frontend, Backend, DevOps, etc
  name: { type: String, required: true },
  level: { type: Number, min: 1, max: 5, required: true },
  yearsOfExperience: Number,
  icon: String,
  color: String
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
