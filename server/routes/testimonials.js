const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Get all approved testimonials
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('is_approved', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ error: error.message });
    }
});

// Submit a new testimonial
router.get('/submit', async (req, res) => {
    // This is just for easier testing or if user prefers GET for simple stuff, 
    // but we should use POST for real submission.
    res.status(405).json({ error: 'Please use POST to submit testimonials' });
});

router.post('/', async (req, res) => {
    try {
        const { name, company, rating, message } = req.body;
        
        if (!name || !rating || !message) {
            return res.status(400).json({ error: 'Name, rating, and message are required' });
        }

        const { data, error } = await supabase
            .from('testimonials')
            .insert([{ 
                name, 
                company: company || '', 
                rating, 
                message,
                is_approved: true // Auto-approving for now as per user request "show real ones"
            }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        console.error('Error submitting testimonial:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
