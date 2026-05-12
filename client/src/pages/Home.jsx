import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import axios from 'axios';
import AOS from 'aos';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [contactData, setContactData] = useState({ name: '', phone: '', message: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/api/projects');
            // Sort projects by date descending (newest first)
            const sortedProjects = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setProjects(sortedProjects);
        } catch (err) {
            console.error("Error fetching projects", err);
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/contact', contactData);
            setStatus('success');
            setContactData({ name: '', phone: '', message: '' });
            setTimeout(() => setStatus(''), 5000);
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <main>
            {/* HERO SECTION */}
            <section id="home" className="hero-section bg-primary-custom text-white py-5 position-relative overflow-hidden" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '160px' }}>
                <div className="hero-badge-top d-none d-md-block">
                    <div className="small fw-bold text-uppercase">Call Now</div>
                    <div className="fs-5 fw-bold">9422554759</div>
                </div>
                
                <Container className="hero-content">
                    <Row className="align-items-center">
                        
                        {/* TEXT ON THE LEFT */}
                        <Col lg={7} data-aos="fade-right">
                            <h1 className="display-2 fw-bold text-white mb-3">
                                Professional Land & <br />
                                <span className="text-accent-custom">Drone Survey</span> Services
                            </h1>
                            <p className="lead mb-4 fs-3 opacity-90">
                                Serving Sindhudurg, Kudal & Goa.
                            </p>
                            
                            <div className="d-flex flex-wrap gap-3 mb-5">
                                <Button href="tel:+919422554759" className="btn-accent-custom btn-lg px-5 py-3 fs-4 fw-bold shadow-lg">
                                    Call Now
                                    <div className="small fw-normal mt-n1" style={{ fontSize: '0.75rem', opacity: 0.8 }}>Available 24/7</div>
                                </Button>
                                <Button href="https://wa.me/919422554759" className="btn-accent-custom btn-lg px-5 py-3 fs-4 fw-bold shadow-lg">
                                    WhatsApp Us
                                    <div className="small fw-normal mt-n1" style={{ fontSize: '0.75rem', opacity: 0.8 }}>Fast Response</div>
                                </Button>
                            </div>
                            
                            <div className="fs-4 opacity-75 fw-medium">
                                <i className="bi bi-telephone-outbound me-2"></i>
                                9422554759 / 8446554759
                            </div>
                        </Col>
                        
                        {/* IMAGE ON THE RIGHT */}
                        <Col lg={5} className="d-none d-lg-block text-center hero-image-container mb-4 mb-lg-0" data-aos="fade-left">
                            <img 
                                src="https://images.unsplash.com/photo-1503387762-11a0fbd83075?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="Land Surveying Equipment" 
                                className="hero-engineer rounded-3 shadow-2xl"
                                style={{ 
                                    maxHeight: '550px', 
                                    objectFit: 'cover', 
                                    width: '100%',
                                    backgroundColor: '#e8a020',
                                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4))',
                                    maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
                                }}
                            />
                        </Col>

                    </Row>
                </Container>
                
                {/* Background Pattern */}
                <div className="position-absolute bottom-0 start-0 w-100 opacity-10" style={{ pointerEvents: 'none' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#ffffff" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,149.3C672,160,768,224,864,229.3C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section id="services" className="py-5 bg-light">
                <Container className="py-5">
                    <div className="text-center mb-5" data-aos="fade-up">
                        <h2 className="display-5 fw-bold mb-3">Our Services</h2>
                        <div className="mx-auto bg-accent-custom" style={{ height: '4px', width: '60px' }}></div>
                    </div>
                    <Row className="g-4">
                        {[
                            { title: 'Property Demarcation', icon: 'bi-bounding-box', desc: 'Precise boundary marking for your land property.' },
                            { title: 'Contour & Topography', icon: 'bi-map', desc: 'Detailed terrain mapping and elevation analysis.' },
                            { title: 'Quantity Estimation', icon: 'bi-calculator', desc: 'Accurate earthwork and material volume calculations.' },
                            { title: 'Building Layout', icon: 'bi-building', desc: 'Marking foundations and structural points correctly.' },
                            { title: 'Footing Marking', icon: 'bi-rulers', desc: 'Essential layout for construction precision.' },
                            { title: 'Drone Survey', icon: 'bi-camera-video', desc: 'High-resolution aerial surveys and mapping.' }
                        ].map((service, idx) => (
                            <Col md={6} lg={4} key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                                <Card className="service-card p-4 text-center">
                                    <div className="service-icon">
                                        <i className={`bi ${service.icon}`}></i>
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p className="text-muted">{service.desc}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* WHY CHOOSE US */}
            <section className="py-5">
                <Container className="py-5">
                    <Row className="g-4">
                        {[
                            { title: 'Modern GPS', icon: 'bi-geo-alt', desc: 'Using latest DGPS and GPS tech.' },
                            { title: 'Drone Survey', icon: 'bi-airplane', desc: 'Aerial mapping for large terrains.' },
                            { title: '10+ Years Exp', icon: 'bi-award', desc: 'Trusted by hundreds of clients.' },
                            { title: 'Wide Coverage', icon: 'bi-globe', desc: 'Serving Maharashtra & Goa.' }
                        ].map((item, idx) => (
                            <Col md={6} lg={3} key={idx} data-aos="zoom-in" data-aos-delay={idx * 100}>
                                <Card className="border-0 text-center">
                                    <div className="mb-3 text-primary-custom fs-1">
                                        <i className={`bi ${item.icon}`}></i>
                                    </div>
                                    <h4>{item.title}</h4>
                                    <p className="small text-muted">{item.desc}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* STATS SECTION */}
            <section className="py-5 bg-primary-custom text-white">
                <Container>
                    <Row className="text-center g-4">
                        <Col md={4}>
                            <h2 className="display-4 fw-bold">100+</h2>
                            <p>Projects Completed</p>
                        </Col>
                        <Col md={4}>
                            <h2 className="display-4 fw-bold">10+</h2>
                            <p>Years Experience</p>
                        </Col>
                        <Col md={4}>
                            <h2 className="display-4 fw-bold">2</h2>
                            <p>States Covered</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* PROJECTS GALLERY */}
            <section id="projects" className="py-5 bg-light">
                <Container className="py-5">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <div data-aos="fade-right">
                            <h2 className="display-5 fw-bold mb-0">Our Recent Work</h2>
                            <div className="bg-accent-custom mt-2" style={{ height: '4px', width: '60px' }}></div>
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
                                More Projects
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

            {/* TESTIMONIALS */}
            <section className="py-5">
                <Container className="py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Client Testimonials</h2>
                    </div>
                    <Row className="g-4">
                        {[
                            { name: 'Ramesh Patil', loc: 'Kudal', text: 'Highly professional and accurate survey. The drone survey was very helpful.' },
                            { name: 'Suresh Naik', loc: 'Sawantwadi', text: 'Prompt service and very detailed maps provided. Recommended for land demarcation.' },
                            { name: 'Mahesh Gawade', loc: 'Goa', text: 'Excellent equipment and expertise. Bramha Kolekar is very knowledgeable.' }
                        ].map((t, idx) => (
                            <Col md={4} key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                                <Card className="p-4 h-100 shadow-sm border-0">
                                    <div className="text-warning mb-3">
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill ms-1"></i>
                                        <i className="bi bi-star-fill ms-1"></i>
                                        <i className="bi bi-star-fill ms-1"></i>
                                        <i className="bi bi-star-fill ms-1"></i>
                                    </div>
                                    <p className="fst-italic">"{t.text}"</p>
                                    <div className="mt-auto">
                                        <h6 className="mb-0 fw-bold">{t.name}</h6>
                                        <small className="text-muted">{t.loc}</small>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* SERVICE AREA */}
            <section className="py-5 bg-light">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={5} className="mb-4 mb-lg-0">
                            <h2 className="fw-bold mb-4">We Serve Maharashtra & Goa</h2>
                            <div className="d-flex flex-wrap gap-2 mb-4">
                                {['Sindhudurg', 'Kudal', 'Sawantwadi', 'Malvan', 'Vengurla', 'Goa'].map(area => (
                                    <Badge bg="secondary" className="px-3 py-2" key={area}>{area}</Badge>
                                ))}
                            </div>
                            <Card className="border-0 shadow-sm p-4">
                                <h5 className="fw-bold"><i className="bi bi-geo-alt-fill me-2 text-danger"></i>Location</h5>
                                <p className="mb-0 text-muted">A/p Gudipur Pinguli, Tal. Kudal, Sindhudurg 416528</p>
                            </Card>
                        </Col>
                        <Col lg={7}>
                            <div className="rounded overflow-hidden shadow-sm" style={{ height: '350px' }}>
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
                            <h2 className="display-6 fw-bold mb-4">Get In Touch</h2>
                            <p className="text-muted mb-5">Have a project in mind? Contact us for a free consultation and quote.</p>
                            
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

                            <div className="d-flex">
                                <div className="bg-primary-custom text-white rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                    <i className="bi bi-geo-alt"></i>
                                </div>
                                <div>
                                    <h5 className="mb-1">Address</h5>
                                    <p className="text-muted mb-0">A/p Gudipur Pinguli, Tal. Kudal, Sindhudurg 416528</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <Card className="p-4 border-0 shadow">
                                {status === 'success' && <Alert variant="success">Message sent successfully!</Alert>}
                                {status === 'error' && <Alert variant="danger">Failed to send message. Please try again.</Alert>}
                                <Form onSubmit={handleContactSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Your Name" 
                                            value={contactData.name}
                                            onChange={(e) => setContactData({...contactData, name: e.target.value})}
                                            required 
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control 
                                            type="tel" 
                                            placeholder="Your Phone" 
                                            value={contactData.phone}
                                            onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                                            required 
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={4} 
                                            placeholder="Tell us about your requirement" 
                                            value={contactData.message}
                                            onChange={(e) => setContactData({...contactData, message: e.target.value})}
                                            required 
                                        />
                                    </Form.Group>
                                    <Button type="submit" className="w-100 btn-primary-custom btn-lg">Send Message</Button>
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
                            <p className="small opacity-50">Owned by 