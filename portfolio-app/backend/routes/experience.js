
// routes/experience.js
const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Obtener todas las experiencias
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener experiencias por tipo
router.get('/type/:type', async (req, res) => {
  try {
    const experiences = await Experience.find({ type: req.params.type }).sort({ startDate: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear nueva experiencia
router.post('/', async (req, res) => {
  const experience = new Experience(req.body);
  try {
    const newExperience = await experience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar experiencia
router.put('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar experiencia
router.delete('/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experiencia eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
