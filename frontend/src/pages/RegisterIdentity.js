import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import SpeechInput from '../components/SpeechInput';

const RegisterIdentity = () => {
    const [aadhaar, setAadhaar] = useState('');
    const [pan, setPan] = useState('');
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
            // Assuming the backend expects name as well for this endpoint based on requirements
            // "POST /register/identity { aadhaar, pan, name }" 
            // But we only collected name in step 1. Does the backend store step 1 state?
            // User requirement: "POST /register/basic { name, mobile } -> Store mobile in localStorage -> Redirect"
            // "POST /register/identity { aadhaar, pan, name }"
            // This implies we need to pass name again or retrieve it. 
            // Assuming for now we need to ask for name again or maybe I should have stored it in localStorage in step 1.
            // Let's safe-guard by checking if we have it, or fetch/store it.
            // Re-reading: "Step 1 ... Store mobile in localStorage". It didn't say store name.
            // However, "Step 2 ... POST /register/identity { aadhaar, pan, name }".
            // I must send name. I should update Step 1 to store name too.

            // Let's Assume I'll fix Step 1 to store name.
            const name = localStorage.getItem('registration_name');

            await api.post('/register/identity', { aadhaar, pan, name });

            // Then POST /otp/send using stored mobile
            await api.post('/otp/send', { mobile });

            navigate('/register/otp');
        } catch (error) {
            console.error("Registration Step 2 error", error);
            alert('Verification failed. Please check your details.');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Register - Step 2</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="aadhaar">Aadhaar Number</label>
                        <input
                            type="text"
                            id="aadhaar"
                            value={aadhaar}
                            onChange={(e) => setAadhaar(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="pan">PAN Number</label>
                        <input
                            type="text"
                            id="pan"
                            value={pan}
                            onChange={(e) => setPan(e.target.value)}
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

export default RegisterIdentity;
