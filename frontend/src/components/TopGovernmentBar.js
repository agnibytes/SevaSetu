import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

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

                {/* Tools */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

                    {/* Font Controls */}
                    <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                        <button
                            onClick={() => {
                                const current = parseFloat(getComputedStyle(document.documentElement).fontSize);
                                document.documentElement.style.fontSize = `${Math.min(current + 1, 24)}px`;
                            }}
                            style={{ padding: '6px 12px', background: '#f9f9f9', borderRight: '1px solid #ccc', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
                            A+
                        </button>
                        <button
                            onClick={() => {
                                const current = parseFloat(getComputedStyle(document.documentElement).fontSize);
                                document.documentElement.style.fontSize = `${Math.max(current - 1, 12)}px`;
                            }}
                            style={{ padding: '6px 12px', background: '#f9f9f9', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
                            A-
                        </button>
                    </div>

                    {/* Quick Language Toggle */}
                    <div style={{ display: 'flex', gap: '5px', marginRight: '5px' }}>
                        {[
                            { code: 'en', label: 'English' },
                            { code: 'hi', label: 'हिंदी' },
                            { code: 'mr', label: 'मराठी' }
                        ].map((l) => (
                            <button
                                key={l.code}
                                onClick={() => onLanguageChange(l.code)}
                                style={{
                                    padding: '4px 8px',
                                    fontSize: '12px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    background: lang === l.code ? '#3A0CA3' : 'white',
                                    color: lang === l.code ? 'white' : '#333',
                                    cursor: 'pointer',
                                    fontWeight: lang === l.code ? 'bold' : 'normal'
                                }}
                            >
                                {l.label}
                            </button>
                        ))}
                    </div>

                    {/* Language Dropdown */}
                    <LanguageSelector onLanguageChange={onLanguageChange} />

                    {/* Login CTA */}
                    <Link
                        to="/login"
                        className="btn-primary"
                        style={{ padding: '10px 20px', fontSize: '0.9rem', borderRadius: '4px', background: '#3A0CA3', boxShadow: 'none', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <User size={16} />
                        Login
                    </Link>
                </div>

            </div>
        </header>
    );
};

export default TopGovernmentBar;
