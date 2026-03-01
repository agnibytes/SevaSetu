import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { User, LogOut, Settings, FileText, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ onLanguageChange, lang, dashboardTitle = "Citizen Dashboard" }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="gov-header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

                {/* LEFT: Branding */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '45px', height: '45px', background: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: 'white' }}>
                        🏛️
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ fontSize: '1.5rem', color: '#1A1A1A', margin: 0, lineHeight: 1 }}>SevaSetu</h1>
                        <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>
                            {dashboardTitle}
                        </span>
                    </div>
                </div>

                {/* RIGHT: Tools */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                    {/* Quick Language Toggle */}
                    <div style={{ display: 'flex', gap: '5px' }}>
                        {[
                            { code: 'en', label: 'EN' },
                            { code: 'hi', label: 'HI' },
                            { code: 'mr', label: 'MR' }
                        ].map((l) => (
                            <button
                                key={l.code}
                                onClick={() => onLanguageChange(l.code)}
                                style={{
                                    padding: '5px 10px',
                                    fontSize: '12px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    background: lang === l.code ? '#3A0CA3' : 'white',
                                    color: lang === l.code ? 'white' : '#333',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                {l.label}
                            </button>
                        ))}
                    </div>

                    <LanguageSelector onLanguageChange={onLanguageChange} />

                    {/* Profile Dropdown */}
                    <div style={{ position: 'relative' }}>
                        <div
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px 10px', borderRadius: '4px', background: '#F3F4F6' }}
                        >
                            <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#3A0CA3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={20} />
                            </div>
                            <ChevronDown size={16} color="#666" />
                        </div>

                        {isProfileOpen && (
                            <div style={{
                                position: 'absolute', top: '100%', right: 0, marginTop: '10px',
                                background: 'white', border: '1px solid #eee', borderRadius: '8px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '200px', overflow: 'hidden', zIndex: 100
                            }}>
                                <div style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                    My Profile
                                </div>
                                <div style={{ padding: '10px 15px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }}>
                                    <FileText size={16} /> My Applications
                                </div>
                                <div style={{ padding: '10px 15px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }}>
                                    <Settings size={16} /> Settings
                                </div>
                                <Link to="/" style={{ padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', color: '#E53E3E', textDecoration: 'none' }}>
                                    <LogOut size={16} /> Logout
                                </Link>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </header>
    );
};

export default DashboardHeader;
