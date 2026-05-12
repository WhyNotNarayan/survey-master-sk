import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    
    const token = sessionStorage.getItem('adminToken');
    if (token === 'true') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <MyNavbar setAdminSession={setIsAdmin} />
        <Home />
        <FloatingWhatsApp />
        {isAdmin && <AdminDashboard setIsAdmin={setIsAdmin} />}
      </div>
    </Router>
  );
}

export default App;
