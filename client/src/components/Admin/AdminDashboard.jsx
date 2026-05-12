import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button, Table, Modal, Form, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AdminDashboard = ({ setIsAdmin }) => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProject, setCurrentProject] = useState({
        title: '',
        location: '',
        date: '',
        description: '',
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/api/projects');
            setProjects(res.data);
        } catch (err) {
            console.error("Error fetching projects", err);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminToken');
        setIsAdmin(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentProject({ ...currentProject, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('title', currentProject.title);
        formData.append('location', currentProject.location);
        formData.append('date', currentProject.date);
        formData.append('description', currentProject.description);
        if (currentProject.image) {
            formData.append('image', currentProject.image);
        }

        try {
            if (editMode) {
                await axios.put(`/api/projects/${currentProject.id}`, formData);
            } else {
                await axios.post('/api/projects', formData);
            }
            fetchProjects();
            handleClose();
        } catch (err) {
            alert("Error saving project: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await axios.delete(`/api/projects/${id}`);
                fetchProjects();
            } catch (err) {
                alert("Error deleting project");
            }
        }
    };

    const handleEdit = (project) => {
        setEditMode(true);
        setCurrentProject({
            ...project,
            image: null // Reset image for upload, keep old one if not changed
        });
        setPreview(project.image_url);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditMode(false);
        setCurrentProject({ title: '', location: '', date: '', description: '', image: null });
        setPreview(null);
    };

    return (
        <div className="admin-overlay">
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand>Admin Dashboard — Survey Master SK</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="pb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Manage Projects</h2>
                    <Button variant="primary" onClick={() => setShowModal(true)}>Add New Project</Button>
                </div>

                <div className="table-responsive bg-white rounded shadow-sm">
                    <Table hover className="align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Photo</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <img src={p.image_url} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </td>
                                    <td><strong>{p.title}</strong></td>
                                    <td>{p.location}</td>
                                    <td>{new Date(p.date).toLocaleDateString()}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(p)}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Project' : 'Add New Project'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Project Title</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={currentProject.title}
                                        onChange={e => setCurrentProject({...currentProject, title: e.target.value})}
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={currentProject.location}
                                        onChange={e => setCurrentProject({...currentProject, location: e.target.value})}
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                value={currentProject.date}
                                onChange={e => setCurrentProject({...currentProject, date: e.target.value})}
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={currentProject.description}
                                onChange={e => setCurrentProject({...currentProject, description: e.target.value})}
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Photo</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} accept="image/*" required={!editMode} />
                            {preview && (
                                <div className="mt-3">
                                    <p className="small mb-1">Preview:</p>
                                    <img src={preview} alt="Preview" style={{ maxWidth: '200px', borderRadius: '8px' }} />
                                </div>
                            )}
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Project'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminDashboard;
