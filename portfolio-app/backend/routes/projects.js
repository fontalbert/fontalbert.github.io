
// routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const multer = require('multer');
const path = require('path');

// Configurar multer para imágenes de proyectos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/projects/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Solo se permiten imágenes');
    }
  }
});

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const { type, featured } = req.query;
    const filter = {};
    
    if (type) filter.type = type;
    if (featured !== undefined) filter.featured = featured === 'true';
    
    const projects = await Project.find(filter).sort({ featured: -1, startDate: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener proyecto por ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear nuevo proyecto
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const projectData = req.body;
    
    if (req.files && req.files.length > 0) {
      projectData.images = req.files.map(file => `/uploads/projects/${file.filename}`);
      projectData.thumbnail = projectData.images[0]; // Primera imagen como thumbnail
    }
    
    const project = new Project(projectData);
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar proyecto
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const projectData = req.body;
    
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/projects/${file.filename}`);
      projectData.images = [...(projectData.images || []), ...newImages];
    }
    
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar proyecto
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;