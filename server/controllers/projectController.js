const supabase = require('../supabaseClient');

// Get all projects
const getProjects = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new project
const createProject = async (req, res) => {
    try {
        const { title, location, date, description } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        // Upload image to Supabase Storage
        const fileName = `${Date.now()}_${file.originalname}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
            });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('project-images')
            .getPublicUrl(fileName);

        // Save project to database
        const { data, error } = await supabase
            .from('projects')
            .insert([
                { title, location, date, description, image_url: publicUrl }
            ])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update project
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, location, date, description } = req.body;
        const file = req.file;

        let updateData = { title, location, date, description };

        if (file) {
            // Upload new image
            const fileName = `${Date.now()}_${file.originalname}`;
            const { error: uploadError } = await supabase.storage
                .from('project-images')
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('project-images')
                .getPublicUrl(fileName);

            updateData.image_url = publicUrl;
        }

        const { data, error } = await supabase
            .from('projects')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete project
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        // Get project to find image URL
        const { data: project, error: fetchError } = await supabase
            .from('projects')
            .select('image_url')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        // Extract filename from URL
        const imageUrl = project.image_url;
        const fileName = imageUrl.split('/').pop();

        // Delete image from storage
        const { error: storageError } = await supabase.storage
            .from('project-images')
            .remove([fileName]);

        // Note: Even if storage deletion fails, we continue to delete database record
        // as the file might have been manually removed or URL changed.

        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};
