import React, { useState } from 'react';
import api from '../api/api';

const LoginPage = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/login', { mobile, password });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                // Strict redirection as requested
                window.location.href = "/dashboard";
            } else {
                setError('Invalid mobile number or password');
            }
        } catch (error) {
            console.error("Login error", error);
            setError('Invalid mobile number or password');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f5f7ff' // Keeping general background light
        }}>

            <div style={{
                width: '100%',
                maxWidth: '400px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                overflow: 'hidden'
            }}>

                {/* 1. Orange Header Panel */}
                <div style={{
                    background: '#FF9933', // Saffron/Orange
                    padding: '20px',
                    textAlign: 'center',
                    color: 'white'
                }}>
                    <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>SevaSetu – Citizen Login</h2>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>नागरिक लॉगिन</p>
                </div>

                {/* Login Form */}
                <div style={{ padding: '30px' }}>
                    <form onSubmit={handleLogin}>

                        {/* Mobile Field */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter your registered mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        {/* Password Field */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div style={{ color: 'red', fontSize: '0.9rem', marginBottom: '15px', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        {/* 2. Green Login Button */}
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#138808', // Indian Green
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.background = '#0f6b06'}
                            onMouseOut={(e) => e.target.style.background = '#138808'}
                        >
                            SIGN IN <br /> <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>साइन इन करें</span>
                        </button>

                    </form>

                    {/* Register Link */}
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Don't have an account?</p>
                        <button
                            onClick={() => window.location.href = "/register"}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#FF9933',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            REGISTER NOW
                        </button>
                    </div>

                    {/* Security Text */}
                    <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.8rem', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        🔒 Your data is securely encrypted
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
