const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('DEBUG: Current Directory:', process.cwd());
    console.error('DEBUG: Supabase URL:', supabaseUrl);
    console.error('Supabase URL or Key is missing from .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
