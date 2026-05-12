const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.use('/artifacts', express.static('C:/Users/ANIKET/.gemini/antigravity/brain/51476813-87cd-4749-9d16-c1bd1c0867c1'));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/', (req