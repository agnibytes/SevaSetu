import React, { useState } from 'react';
// Components
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import SpeechInput from '../components/SpeechInput';
// Icons
import { Search, Filter, BookOpen, Sprout, HandCoins, ArrowUpRight, Clock, FileCheck, XCircle, Mic } from 'lucide-react';

const Dashboard = () => {
    const [lang, setLang] = useState('en');

    const handleLanguageChange = (newLang) => {
        setLang(newLang);
        // In a real app, this would trigger a context update or prop passing similar to LandingPage
    };

    const handleSpeechResult = (text) => {
        alert(`Voice Command: ${text}`);
    };

    return (
        <div style={{ background: '#F3F4F6', minHeight: '100vh' }}>

            {/* 1. Header */}
            <DashboardHeader onLanguageChange={handleLanguageChange} lang={lang} />

            <div className="container" style={{ paddingTop: '20px' }}>

                {/* 2. Welcome Strip */}
                <div className="gov-card" style={{ padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, #3A0CA3 0%, #4F46E5 100%)', color: 'white' }}>
                    <div>
                        <h2 style={{ color: 'white', marginBottom: '5px' }}>Welcome, Rajesh Kumar 👋</h2>
                        <p style={{ opacity: 0.9 }}>You have 2 pending applications.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ width: '10px', height: '10px', background: '#FBBF24', borderRadius: '50%' }}></span> Pending: 2
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ width: '10px', height: '10px', background: '#34D399', borderRadius: '50%' }}></span> Approved: 1
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ width: '10px', height: '10px', background: '#F87171', borderRadius: '50%' }}></span> Rejected: 0
                        </div>
                    </div>
                </div>

                {/* 3. Main 3-Column Layout */}
                <div className="gov-grid">

                    {/* LEFT: Navigation */}
                    <div className="left-col">
                        <DashboardSidebar />
                    </div>

                    {/* CENTER: Schemes & Applications */}
                    <div className="center-col">

                        {/* Search & Filters */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9CA3AF' }} />
                                <input
                                    type="text"
                                    placeholder="Search schemes..."
                                    style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                                />
                            </div>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 15px', background: 'white', border: '1px solid #D1D5DB', borderRadius: '6px', color: '#4B5563' }}>
                                <Filter size={18} /> Filters
                            </button>
                            <button style={{ padding: '10px 15px', background: 'white', border: '1px solid #D1D5DB', borderRadius: '6px', color: '#4B5563' }}>
                                State ▼
                            </button>
                        </div>

                        {/* Scheme Cards Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>

                            {/* Card 1 */}
                            <div className="gov-card" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <div style={{ padding: '10px', background: '#EFF6FF', borderRadius: '8px', color: '#3B82F6' }}><BookOpen size={24} /></div>
                                    <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 'bold' }}>Deadline: 31 Mar</span>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#1F2937' }}>Post Matric Scholarship</h3>
                                <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '15px' }}>Education Dept • Class 11-12 & College</p>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={{ flex: 1, padding: '8px', border: '1px solid #3A0CA3', color: '#3A0CA3', borderRadius: '4px', background: 'white', fontSize: '0.85rem' }}>Check Eligibility</button>
                                    <button style={{ flex: 1, padding: '8px', background: '#3A0CA3', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }}>Apply Now</button>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="gov-card" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <div style={{ padding: '10px', background: '#ECFDF5', borderRadius: '8px', color: '#10B981' }}><Sprout size={24} /></div>
                                    <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 'bold' }}>Rolling Basis</span>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#1F2937' }}>Farmer Support Scheme</h3>
                                <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '15px' }}>Agriculture Dept • Registered Farmers</p>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={{ flex: 1, padding: '8px', border: '1px solid #3A0CA3', color: '#3A0CA3', borderRadius: '4px', background: 'white', fontSize: '0.85rem' }}>View Details</button>
                                    <button style={{ flex: 1, padding: '8px', background: '#3A0CA3', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }}>Apply Now</button>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="gov-card" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <div style={{ padding: '10px', background: '#FEF3C7', borderRadius: '8px', color: '#D97706' }}><HandCoins size={24} /></div>
                                    <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 'bold' }}>Open</span>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#1F2937' }}>Senior Citizen Pension</h3>
                                <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '15px' }}>Social Welfare • 60+ Years</p>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={{ flex: 1, padding: '8px', border: '1px solid #3A0CA3', color: '#3A0CA3', borderRadius: '4px', background: 'white', fontSize: '0.85rem' }}>View Details</button>
                                    <button style={{ flex: 1, padding: '8px', background: '#3A0CA3', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }}>Apply Now</button>
                                </div>
                            </div>

                        </div>

                        {/* My Applications Table */}
                        <div className="gov-card">
                            <div className="card-header">My Applications</div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                                        <th style={{ padding: '12px 15px', color: '#4B5563', fontWeight: '600' }}>Scheme Name</th>
                                        <th style={{ padding: '12px 15px', color: '#4B5563', fontWeight: '600' }}>Status</th>
                                        <th style={{ padding: '12px 15px', color: '#4B5563', fontWeight: '600' }}>Applied On</th>
                                        <th style={{ padding: '12px 15px', color: '#4B5563', fontWeight: '600' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                                        <td style={{ padding: '12px 15px' }}>Post Matric Scholarship</td>
                                        <td style={{ padding: '12px 15px' }}>
                                            <span style={{ background: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>Pending</span>
                                        </td>
                                        <td style={{ padding: '12px 15px' }}>12 Feb 2026</td>
                                        <td style={{ padding: '12px 15px' }}><button style={{ color: '#3A0CA3', background: 'none', fontWeight: '600' }}>View</button></td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '12px 15px' }}>Farmer Support Scheme</td>
                                        <td style={{ padding: '12px 15px' }}>
                                            <span style={{ background: '#D1FAE5', color: '#059669', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>Approved</span>
                                        </td>
                                        <td style={{ padding: '12px 15px' }}>05 Jan 2026</td>
                                        <td style={{ padding: '12px 15px' }}><button style={{ color: '#3A0CA3', background: 'none', fontWeight: '600' }}>Download</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    {/* RIGHT: Live Updates */}
                    <div className="right-col">

                        {/* Notifications */}
                        <div className="gov-card" style={{ marginBottom: '20px' }}>
                            <div className="card-header">🔔 Live Notifications</div>
                            <ul className="notice-list">
                                <li className="notice-item" style={{ borderLeft: '3px solid #FFBF24', paddingLeft: '10px' }}>Your scholarship is under review.</li>
                                <li className="notice-item" style={{ borderLeft: '3px solid #34D399', paddingLeft: '10px' }}>Document verification completed.</li>
                                <li className="notice-item" style={{ borderLeft: '3px solid #60A5FA', paddingLeft: '10px' }}>OTP verified successfully.</li>
                            </ul>
                        </div>

                        {/* Quick Actions */}
                        <div className="gov-card" style={{ padding: '15px' }}>
                            <div style={{ marginBottom: '15px', fontWeight: 'bold', color: '#3A0CA3' }}>📄 Quick Actions</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button style={{ width: '100%', padding: '10px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', display: 'flex', alignItems: 'center', gap: '10px', color: '#4B5563' }}>
                                    <ArrowUpRight size={18} color="#3A0CA3" /> Upload Documents
                                </button>
                                <button style={{ width: '100%', padding: '10px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', display: 'flex', alignItems: 'center', gap: '10px', color: '#4B5563' }}>
                                    <Clock size={18} color="#3A0CA3" /> Track Application
                                </button>
                                <button style={{ width: '100%', padding: '10px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', display: 'flex', alignItems: 'center', gap: '10px', color: '#4B5563' }}>
                                    <FileCheck size={18} color="#3A0CA3" /> Download Receipt
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #E5E7EB', marginTop: '30px', color: '#6B7280', fontSize: '0.85rem' }}>
                Multilingual • Secure • Voice Enabled
            </div>

            {/* Voice FAB */}
            <div className="voice-fab">
                <div style={{ marginBottom: '10px', background: 'white', padding: '5px 10px', borderRadius: '4px', border: '1px solid #eee', fontSize: '0.8rem', fontWeight: 'bold', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    Ask SevaSetu
                </div>
                <SpeechInput onResult={handleSpeechResult} lang="en" />
            </div>

        </div>
    );
};

export default Dashboard;
