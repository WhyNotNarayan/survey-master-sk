import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import axios from 'axios';
import AOS from 'aos';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [contactData, setContactData] = useState({ name: '', phone: '', message: '' });
    const [status, setStatus] = useState('');
    const [testimonials, setTestimonials] = useState([]);
    const [testimonialForm, setTestimonialForm] = useState({ name: '', company: '', rating: 5, message: '' });
    const [testimonialStatus, setTestimonialStatus] = useState('');

    useEffect(() => {
        fetchProjects();
        fetchTestimonials();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/api/projects');
            const sortedProjects = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setProjects(sortedProjects);
        } catch (err) {
            console.error("Error fetching projects", err);
        }
    };

    const fetchTestimonials = async () => {
        try {
            const res = await axios.get('/api/testimonials');
            setTestimonials(res.data);
        } catch (err) {
            console.error("Error fetching testimonials", err);
        }
    };

    const handleTestimonialSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/testimonials', testimonialForm);
            setTestimonialStatus('success');
            setTestimonialForm({ name: '', company: '', rating: 5, message: '' });
            fetchTestimonials();
            setTimeout(() => setTestimonialStatus(''), 5000);
        } catch (err) {
            setTestimonialStatus('error');
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            // Save to database first
            await axios.post('/api/contact', contactData);
            
            // Construct WhatsApp message
            const whatsappMsg = encodeURIComponent(`Hello, I'm ${contactData.name}.\nInquiry: ${contactData.message}\nPhone: ${contactData.phone}`);
            const whatsappUrl = `https://wa.me/919422554759?text=${whatsappMsg}`;
            
            setStatus('success');
            setContactData({ name: '', phone: '', message: '' });
            
            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
            
            setTimeout(() => setStatus(''), 5000);
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <main>
            {/* HERO SECTION */}
            <section id="home" className="hero-section bg-primary-custom text-white py-5 position-relative overflow-hidden" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '160px', paddingBottom: '100px' }}>
                <div className="hero-badge-top d-none d-md-block">
                    <div className="small fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>Call Now</div>
                    <div className="fs-5 fw-bold">9422554759</div>
                </div>
                
                <Container className="hero-content position-relative" style={{ zIndex: 10 }}>
                    <Row className="align-items-center">
                        
                        {/* TEXT ON THE LEFT */}
                        <Col lg={7} data-aos="fade-right">
                            <h1 className="display-3 fw-bold text-white mb-3" style={{ lineHeight: '1.2' }}>
                                Professional Land & <br />
                                <span className="text-accent-custom">Drone Survey</span> <br />
                                Services
                            </h1>
                            <p className="lead mb-5 fs-4" style={{ color: '#d1d5db' }}>
                                Serving Sindhudurg, Kudal & Goa.
                            </p>
                            
                            <div className="d-flex flex-wrap gap-3 mb-5">
                                <Button href="tel:+919422554759" className="btn-lg px-5 py-3 fw-bold shadow border-0" style={{ backgroundColor: '#1b64ff', borderRadius: '8px' }}>
                                    <div className="fs-5">Call Now</div>
                                    <div className="small fw-normal" style={{ fontSize: '0.75rem', opacity: 0.9 }}>Available 24/7</div>
                                </Button>
                                <Button href="https://wa.me/919422554759" className="btn-lg px-5 py-3 fw-bold shadow border-0" style={{ backgroundColor: '#1b64ff', borderRadius: '8px' }}>
                                    <div className="fs-5">WhatsApp Us</div>
                                    <div className="small fw-normal" style={{ fontSize: '0.75rem', opacity: 0.9 }}>Fast Response</div>
                                </Button>
                            </div>
                        </Col>
                        
                        {/* IMAGE ON THE RIGHT */}
                        <Col lg={5} className="d-none d-lg-block text-center hero-image-container" data-aos="fade-left">
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                {/* Decorative Outline Circle */}
                                <div className="hero-image-container position-relative" style={{ 
                                    width: '550px',
                                    height: '550px',
                                    margin: '0 auto',
                                    padding: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {/* Inner Glowing Circle */}
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        background: 'radial-gradient(circle, rgba(221, 161, 94, 0.15) 0%, transparent 70%)',
                                        borderRadius: '50%',
                                        zIndex: 0
                                    }}></div>

                                    {/* Main Decorative Circle */}
                                    <div style={{
                                        position: 'absolute',
                                        width: '95%',
                                        height: '95%',
                                        border: '1px solid rgba(221, 161, 94, 0.3)',
                                        borderRadius: '50%',
                                        zIndex: 0
                                    }}></div>
                                    
                                    <img 
                                        src="/drone.png" 
                                        alt="Professional Survey Drone" 
                                        className="img-fluid position-relative shadow-lg"
                                        style={{ 
                                            width: '500px', 
                                            height: '500px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '6px solid rgba(221, 161, 94, 0.4)',
                                            zIndex: 2,
                                            filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.7))'
                                        }}
                                    />

                                    {/* Floating Ground Shadow */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '20px',
                                        width: '60%',
                                        height: '20px',
                                        background: 'rgba(0,0,0,0.4)',
                                        filter: 'blur(20px)',
                                        borderRadius: '50%',
                                        zIndex: 1
                                    }}></div>
                                    
                                    {/* Glassy Accent */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        left: '10%',
                                        width: '80%',
                                        height: '40%',
                                        background: 'linear-gradient(180deg, transparent, rgba(221, 161, 94, 0.1))',
                                        filter: 'blur(40px)',
                                        zIndex: 0
                                    }}></div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </Container>
                
                {/* Background Pattern - Solid White Wave */}
                <div className="position-absolute bottom-0 start-0 w-100" style={{ zIndex: 1, pointerEvents: 'none' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ display: 'block' }}>
                        <path fill="#ffffff" fillOpacity="1" d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,112C672,107,768,149,864,170.7C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                    
                    {/* Phone Numbers visibly placed over the white section */}
                    <div className="position-absolute w-100 text-center" style={{ bottom: '25px', zIndex: 20 }}>
                        <div className="d-inline-flex align-items-center justify-content-center px-4 py-2 rounded-pill" style={{ color: '#333333', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <i className="bi bi-telephone-outbound me-2 text-muted"></i>
                            9422554759 / 8446554759
                        </div>
                    </div>
                </div>
            </section>
            
            {/* PROJECTS SECTION */}
            <section id="projects" className="py-5 bg-light">
                <Container className="py-5">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <div data-aos="fade-right">
                            <h2 className="display-5 fw-bold mb-0 text-primary-custom">Our Recent Work</h2>
                            <div className="bg-accent-custom mt-2" style={{ height: '4px', width: '60px' }}></div>
                            <p className="text-muted mt-3">Visual evidence of our precision and expertise in land surveying.</p>
                        </div>
                    </div>
                    <div className="gallery-grid">
                        {(showAllProjects ? projects : projects.slice(0, 6)).length > 0 ? (showAllProjects ? projects : projects.slice(0, 6)).map((p, idx) => (
                            <Card className="project-card shadow-sm border-0" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                                <div className="project-img-container" style={{ position: 'relative' }}>
                                    <Card.Img variant="top" src={p.image_url} />
                                    <div className="project-overlay p-3 d-flex align-items-end">
                                        <Badge bg="warning" text="dark">{p.location}</Badge>
                                    </div>
                                </div>
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-2">{p.title}</h5>
                                    <p className="text-muted small mb-3">
                                        <i className="bi bi-calendar-event me-1"></i> {new Date(p.date).toLocaleDateString()}
                                    </p>
                                    <Card.Text className="text-muted small">{p.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        )) : (
                            // Placeholders
                            [1, 2, 3, 4, 5, 6].map(i => (
                                <Card className="project-card border-0 shadow-sm" key={i}>
                                    <div style={{ height: '250px', backgroundColor: '#eee' }} className="d-flex align-items-center justify-content-center">
                                        <i className="bi bi-image fs-1 text-muted"></i>
                                    </div>
                                    <Card.Body className="p-4">
                                        <h5 className="placeholder-glow"><span className="placeholder col-6"></span></h5>
                                        <p className="placeholder-glow"><span className="placeholder col-4"></span></p>
                                        <p className="placeholder-glow"><span className="placeholder col-12"></span></p>
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </div>
                    {!showAllProjects && projects.length > 6 && (
                        <div className="text-center mt-5" data-aos="fade-up">
                            <Button 
                                onClick={() => setShowAllProjects(true)}
                                className="btn-accent-custom btn-lg px-5 shadow"
                            >
                                View More Projects
                            </Button>
                        </div>
                    )}
                    {showAllProjects && (
                        <div className="text-center mt-5" data-aos="fade-up">
                            <Button 
                                onClick={() => setShowAllProjects(false)}
                                variant="outline-primary"
                                className="btn-lg px-5"
                            >
                                Show Less
                            </Button>
                        </div>
                    )}
                </Container>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section id="testimonials" className="py-5 bg-white">
                <Container className="py-5">
                    <Row className="mb-5 align-items-end">
                        <Col md={8} data-aos="fade-right">
                            <h2 className="display-5 fw-bold mb-0 text-primary-custom">Client Testimonials</h2>
                            <div className="bg-accent-custom mt-2" style={{ height: '4px', width: '60px' }}></div>
                            <p className="text-muted mt-3">Real feedback from our satisfied clients across Maharashtra and Goa.</p>
                        </Col>
                        <Col md={4} className="text-md-end" data-aos="fade-left">
                            <Button 
                                variant="outline-primary" 
                                className="rounded-pill px-4"
                                onClick={() => document.getElementById('testimonial-form-section').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Share Your Review
                            </Button>
                        </Col>
                    </Row>

                    <Row className="g-4 mb-5">
                        {testimonials.length > 0 ? testimonials.map((t, idx) => (
                            <Col md={6} lg={4} key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                                <Card className="h-100 border-0 shadow-sm p-4" style={{ borderRadius: '20px', backgroundColor: '#f8f9fa' }}>
                                    <div className="mb-3" style={{ color: '#FFD700' }}>
                                        {[...Array(t.rating)].map((_, i) => <i key={i} className="bi bi-star-fill me-1"></i>)}
                                    </div>
                                    <p className="fst-italic mb-4" style={{ fontSize: '1.1rem' }}>"{t.message}"</p>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary-custom text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '45px', height: '45px', fontWeight: 'bold' }}>
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h6 className="mb-0 fw-bold text-primary-custom">{t.name}</h6>
                                            {t.company && <small className="text-muted">{t.company}</small>}
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        )) : (
                            <Col className="text-center py-5">
                                <p className="text-muted">No reviews yet. Be the first to share your experience!</p>
                            </Col>
                        )}
                    </Row>

                    {/* TESTIMONIAL FORM */}
                    <div id="testimonial-form-section" className="p-4 p-md-5 rounded-4 bg-primary-custom text-white shadow-lg" data-aos="zoom-in">
                        <Row className="align-items-center">
                            <Col lg={5} className="mb-4 mb-lg-0">
                                <h3 className="fw-bold mb-3">Rate Our Service</h3>
                                <p style={{ opacity: 0.8 }}>Your trust is our greatest asset. Share your experience with our survey team.</p>
                                <div className="mt-4">
                                    <i className="bi bi-quote display-1 text-accent-custom opacity-50"></i>
                                </div>
                            </Col>
                            <Col lg={7}>
                                <Form onSubmit={handleTestimonialSubmit}>
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Enter your name" 
                                                    className="bg-transparent text-white border-secondary"
                                                    value={testimonialForm.name}
                                                    onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Company / Location</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="e.g. Kudal" 
                                                    className="bg-transparent text-white border-secondary"
                                                    value={testimonialForm.company}
                                                    onChange={(e) => setTestimonialForm({...testimonialForm, company: e.target.value})}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Rating</Form.Label>
                                                <div className="d-flex gap-2">
                                                    {[1, 2, 3, 4, 5].map(num => (
                                                        <i 
                                                            key={num}
                                                            className={`bi bi-star${testimonialForm.rating >= num ? '-fill' : ''} fs-3 pointer`}
                                                            style={{ color: '#FFD700', cursor: 'pointer' }}
                                                            onClick={() => setTestimonialForm({...testimonialForm, rating: num})}
                                                        ></i>
                                                    ))}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Your Review</Form.Label>
                                                <Form.Control 
                                                    as="textarea" 
                                                    rows={3} 
                                                    placeholder="How was our precision and speed?" 
                                                    className="bg-transparent text-white border-secondary"
                                                    value={testimonialForm.message}
                                                    onChange={(e) => setTestimonialForm({...testimonialForm, message: e.target.value})}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Button type="submit" className="btn-accent-custom w-100 py-3 fw-bold shadow">
                                                Submit Review
                                            </Button>
                                            {testimonialStatus === 'success' && <p className="text-success small mt-2">Thank you! Your review has been added.</p>}
                                            {testimonialStatus === 'error' && <p className="text-danger small mt-2">Submission failed. Please check your connection.</p>}
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            {/* SERVICE AREA */}
            <section className="py-5 bg-light">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={5} className="mb-4 mb-lg-0">
                            <h2 className="fw-bold mb-4">Serving Sindhudurg & Goa</h2>
                            <div className="d-flex flex-wrap gap-2 mb-4">
                                {['Kudal', 'Sawantwadi', 'Malvan', 'Vengurla', 'Goa', 'Ratnagiri'].map(area => (
                                    <Badge bg="secondary" className="px-3 py-2" key={area}>{area}</Badge>
                                ))}
                            </div>
                            <Card className="border-0 shadow-sm p-4">
                                <h5 className="fw-bold text-primary-custom"><i className="bi bi-geo-alt-fill me-2 text-danger"></i>Head Office</h5>
                                <p className="mb-0 text-muted">A/p Gudipur Pinguli, Tal. Kudal, Sindhudurg 416528</p>
                            </Card>
                        </Col>
                        <Col lg={7}>
                            <div className="rounded-4 overflow-hidden shadow-lg" style={{ height: '400px' }}>
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15316.483984635832!2d73.6826075!3d16.007624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc01b444747761f%3A0x9f5a7d9b9a6b8b0a!2sKudal%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-5">
                <Container className="py-5">
                    <Row className="g-5">
                        <Col lg={5}>
                            <h2 className="display-6 fw-bold mb-4 text-primary-custom">Contact Us</h2>
                            <p className="text-muted mb-5">Ready to start your project? Get a free consultation from Sindhudurg's leading survey expert.</p>
                            
                            <div className="d-flex mb-4">
                                <div className="bg-primary-custom text-white rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                    <i className="bi bi-telephone"></i>
                                </div>
                                <div>
                                    <h5 className="mb-1">Phone</h5>
                                    <p className="text-muted mb-0">9422554759 / 8446554759</p>
                                </div>
                            </div>

                            <div className="d-flex mb-4">
                                <div className="bg-primary-custom text-white rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                    <i className="bi bi-envelope"></i>
                                </div>
                                <div>
                                    <h5 className="mb-1">Email</h5>
                                    <p className="text-muted mb-0">sksurveymaster20@gmail.com</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <Card className="p-4 border-0 shadow-lg rounded-4">
                                {status === 'success' && <Alert variant="success">Message sent successfully!</Alert>}
                                {status === 'error' && <Alert variant="danger">Failed to send message. Please try again.</Alert>}
                                <Form onSubmit={handleContactSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Your Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter your name" 
                                            value={contactData.name}
                                            onChange={(e) => setContactData({...contactData, name: e.target.value})}
                                            required 
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Phone Number</Form.Label>
                                        <Form.Control 
                                            type="tel" 
                                            placeholder="Your mobile number" 
                                            value={contactData.phone}
                                            onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                                            required 
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-bold">Message</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={4} 
                                            placeholder="Tell us about your land survey requirement" 
                                            value={contactData.message}
                                            onChange={(e) => setContactData({...contactData, message: e.target.value})}
                                            required 
                                        />
                                    </Form.Group>
                                    <Button type="submit" className="w-100 btn-primary-custom btn-lg py-3 fw-bold shadow">Send Inquiry</Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* FOOTER */}
            <footer className="bg-primary-custom text-white py-5">
                <Container>
                    <Row className="g-4">
                        <Col md={6}>
                            <h3 className="text-white mb-3">Survey Master <span className="text-warning">SK</span></h3>
                            <p className="opacity-75">Professional Land & Drone Surveying Services in Maharashtra and Goa. 10+ years of trust and accuracy.</p>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <div className="mb-3">
                                <a href="#" className="text-white me-3 fs-4"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="text-white me-3 fs-4"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="text-white fs-4"><i className="bi bi-linkedin"></i></a>
                            </div>
                            <p className="mb-0 opacity-75">&copy; 2024 Survey Master SK. All rights reserved.</p>
                            <p className="small opacity-50">Owned by Bramha Kolekar</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </main>
    );
};

export default Home;
