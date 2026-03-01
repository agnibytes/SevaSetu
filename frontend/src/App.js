import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterBasic from './pages/RegisterBasic';
import RegisterIdentity from './pages/RegisterIdentity';
import OTPVerify from './pages/OTPVerify';
import Dashboard from './pages/Dashboard';
import SchemesPage from './pages/SchemesPage';
import './index.css';

function App() {
    return (
        <Router>
            <div className="app-content">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterBasic />} />
                    <Route path="/register/identity" element={<RegisterIdentity />} />
                    <Route path="/register/otp" element={<OTPVerify />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/schemes" element={<SchemesPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

