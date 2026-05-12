const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Using service key for admin operations

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Key is missing from .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
