import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import SpeechInput from '../components/SpeechInput';

const OTPVerify = () => {
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mobile = localStorage.getItem('registration_mobile');
        if (!mobile) {
            alert("Mobile number not found. Please start over.");
            navigate('/register');
            return;
        }

        try {
            await api.post('/otp/verify', { mobile, otp, password });
            alert('Registration Successful! Please Login.');
            // clear registration data
            localStorage.removeItem('registration_mobile');
            localStorage.removeItem('registration_name');
            navigate('/login');
        } catch (error) {
            console.error("OTP Verification error", error);
            alert('Verification failed. Invalid OTP or error.');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Verify OTP</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="otp">Enter OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Set Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Verify & Register</button>
                </form>
            </div>
            <SpeechInput onResult={(text) => console.log(text)} />
        </div>
    );
};

export default OTPVerify;
