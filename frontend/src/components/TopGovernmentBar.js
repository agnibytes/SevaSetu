import React from 'react';
import LanguageSelector from './LanguageSelector';
import { User } from 'lucide-react';

const TopGovernmentBar = ({ onLanguageChange, lang, brandingSubtitle }) => {
    return (
        <header className="gov-header">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

                {/* LEFT: Emblem & Branding */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Emblem Icon Placeholder */}
                    <div style={{ width: '50px', height: '50px', background: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'white' }}>
                        🏛️
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ fontSize: '1.8rem', color: '#1A1A1A', margin: 0, lineHeight: 1 }}>SevaSetu</h1>
                        <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>
                            {brandingSubtitle || "Government Services Portal"}
                        </span>
                    </div>
                </div>

                {/* RIGHT: Tools */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

                    {/* Font Controls */}
                    <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                        <button style={{ padding: '6px 12px', background: '#f9f9f9', borderRight: '1px solid #ccc', fontSize: '14px', fontWeight: 'bold' }}>A+</button>
                        <button style={{ padding: '6px 12px', background: '#f9f9f9', fontSize: '14px', fontWeight: 'bold' }}>A-</button>
                    </div>

                    {/* Language */}
                    <LanguageSelector onLanguageChange={onLanguageChange} />

                    {/* Login CTA */}
                    <button
                        className="btn-primary"
                        onClick={() => window.location.href = '/login.html'}
                        style={{ padding: '10px 20px', fontSize: '0.9rem', borderRadius: '4px', background: '#3A0CA3', boxShadow: 'none' }}
                    >
                        <User size={16} />
                        Login
                    </button>
                </div>

            </div>
        </header>
    );
};

export default TopGovernmentBar;
