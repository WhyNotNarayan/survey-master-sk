const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
    getProjects, 
    createProject, 
    updateProject, 
    deleteProject 
} = require('../controllers/projectController');

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', getProjects);
router.post('/', upload.single('image'), createProject);
router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
