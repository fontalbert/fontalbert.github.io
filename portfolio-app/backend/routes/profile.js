// routes/profile.js
const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const multer = require('multer');
const path = require('path');

// Configurar multer para subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Solo se permiten imágenes');
    }
  }
});


// Obtener perfil
router.get('/', async (req, res) => {
    try {
      const profile = await Profile.findOne();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Crear o actualizar perfil
  router.post('/', upload.single('avatar'), async (req, res) => {
    try {
      const profileData = req.body;
      if (req.file) {
        profileData.avatar = `/uploads/avatars/${req.file.filename}`;
      }
      
      const profile = await Profile.findOneAndUpdate(
        {},
        profileData,
        { new: true, upsert: true }
      );
      
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = router;
  