const supabase = require('../supabaseClient');

const submitContactForm = async (req, res) => {
    try {
        const { name, phone, message } = req.body;

        if (!name || !phone || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const { data, error } = await supabase
            .from('contacts')
            .insert([{ name, phone, message }])
            .select();

        if (error) throw error;
        res.status(201).json({ message: 'Message sent successfully', data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    submitContactForm
};
