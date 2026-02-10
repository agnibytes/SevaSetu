import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import SpeechInput from '../components/SpeechInput';

const LoginPage = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { mobile, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert('Login Successful!');
                // Redirect or update UI state
            } else {
                alert('Login failed: No token received');
            }
        } catch (error) {
            console.error("Login error", error);
            alert('Login Failed. Please check your credentials.');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input
                            type="text"
                            id="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
                </form>
            </div>
            <SpeechInput onResult={(text) => console.log(text)} />
        </div>
    );
};

export default LoginPage;
