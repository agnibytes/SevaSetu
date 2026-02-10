import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import SpeechInput from '../components/SpeechInput';

const RegisterBasic = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/register/basic', { name, mobile });
            localStorage.setItem('registration_mobile', mobile);
            localStorage.setItem('registration_name', name);
            navigate('/register/identity');
        } catch (error) {
            console.error("Registration Step 1 error", error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Register - Step 1</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Next</button>
                </form>
            </div>
            <SpeechInput onResult={(text) => console.log(text)} />
        </div>
    );
};

export default RegisterBasic;
