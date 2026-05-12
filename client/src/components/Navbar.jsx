import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MyNavbar = ({ setAdminSession }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const clickCount = useRef(0);
    const timerRef = useRef(null);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        clickCount.current += 1;
        
        if (timerRef.current) clearTimeout(timerRef.current);
        
        timerRef.current = setTimeout(() => {
            clickCount.current = 0;
        }, 3000);

        if (clickCount.current === 5) {
            setShowLogin(true);
            clickCount.current = 0;
            clearTimeout(timerRef.current);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // These will be compared with values from .env via proxy or passed from parent
        // For simplicity in this demo, we'll assume they are passed or hardcoded if env is not reachable
        if (credentials.username === 'sksurveymaster20@gmail.com' && credentials.password === 'SKsurvey@2026') {
            sessionStorage.setItem('adminToken', 'true');
            setAdminSession(true);
            setShowLogin(false);
            setCredentials({ username: '', password: '' });
            setError('');
        } else {
            setError('Invalid credentials. Try again.');
        }
    };

    return (
        <>
            <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm">
                <Container>
                    <Navbar.Brand onClick={handleLogoClick} className="d-flex align-items-center cursor-pointer py-0">
                        <div className="logo-wrapper position-relative">
                            <img 
                                src="/logo.png" 
                                alt="Survey Master SK" 
                                className="main-logo"
                                style={{ height: '70px', transition: 'transform 0.3s ease' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span style={{ display: 'none' }} className="fs-3 fw-bold text-primary-custom">
                                Survey Master SK
                            </span>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#services">Services</Nav.Link>
                            <Nav.Link href="#projects">Work</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                            <Button 
                                variant="warning" 
                                href="tel:+919422554759" 
                                className="ms-lg-3 btn-accent-custom"
                            >
                                <i className="bi bi-telephone-fill me-2"></i>
                                Call Now
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Admin Login</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pb-4">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                value={credentials.username}
                                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password" 
                                value={credentials.password}
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 btn-primary-custom">
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MyNavbar;
