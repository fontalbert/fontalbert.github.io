
// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  location: String,
  summary: { type: String, required: true },
  avatar: String,
  social: {
    linkedin: String,
    github: String,
    twitter: String,
    portfolio: String
  },
  languages: [{
    name: String,
    level: String // Nativo, Fluido, Intermedio, Básico
  }]
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);