const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const testimonialRoutes = require('./routes/testimonials');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/artifacts', express.static('C:/Users/ANIKET/.gemini/antigravity/brain/51476813-87cd-4749-9d16-c1bd1c0867c1'));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('Survey Master SK API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
