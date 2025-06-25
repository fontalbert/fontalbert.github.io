
// routes/skills.js
const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Obtener todas las habilidades
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, level: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener habilidades por categoría
router.get('/category/:category', async (req, res) => {
  try {
    const skills = await Skill.find({ category: req.params.category }).sort({ level: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear nueva habilidad
router.post('/', async (req, res) => {
  const skill = new Skill(req.body);
  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar habilidad
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar habilidad
router.delete('/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habilidad eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;