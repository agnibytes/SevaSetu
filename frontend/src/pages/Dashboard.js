import React, { useState } from 'react';
// Components
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import SpeechInput from '../components/SpeechInput';
// Icons
import { Search, Filter, BookOpen, Sprout, HandCoins, ArrowUpRight, Clock, FileCheck, XCircle, Mic } from 'lucide-react';

const Dashboard = () => {
    const [lang, setLang] = useState('en');

    const translations = {
        en: {
            welcome: "Welcome",
            pending_apps: "You have 2 pending applications.",
            pending: "Pending",
            approved: "Approved",
            rejected: "Rejected",
            search_placeholder: "Search schemes...",
            filters: "Filters",
            state: "State",
            available_schemes: "Available Schemes",
            check_eligibility: "Check Eligibility",
            apply_now: "Apply Now",
            view_details: "View Details",
            my_applications: "My Applications",
            scheme_name: "Scheme Name",
            status: "Status",
            applied_on: "Applied On",
            action: "Action",
            notifications: "Live Notifications",
            quick_actions: "Quick Actions",
            upload_docs: "Upload Documents",
            track_app: "Track Application",
            download_receipt: "Download Receipt",
            ask_sevasetu: "Ask SevaSetu"
        },
        hi: {
            welcome: "स्वागत है",
            pending_apps: "आपके पास 2 लंबित आवेदन हैं।",
            pending: "लंबित",
            approved: "स्वीकृत",
            rejected: "अस्वीकृत",
            search_placeholder: "योजनाएं खोजें...",
            filters: "फ़िल्टर",
            state: "राज्य",
            available_schemes: "उपलब्ध योजनाएं",
            check_eligibility: "पात्रता जाँचें",
            apply_now: "अभी आवेदन करें",
            view_details: "विवरण देखें",
            my_applications: "मेरे आवेदन",
            scheme_name: "योजना का नाम",
            status: "स्थिति",
            applied_on: "आवेदन की तिथि",
            action: "कार्रवाई",
            notifications: "लाइव सूचनाएं",
            quick_actions: "त्वरित कार्रवाई",
            upload_docs: "दस्तावेज़ अपलोड करें",
            track_app: "आवेदन ट्रैक करें",
            download_receipt: "रसीद डाउनलोड करें",
            ask_sevasetu: "सेवासेतु से पूछें"
        },
        mr: {
            welcome: "स्वागत आहे",
            pending_apps: "तुमचे 2 अर्ज प्रलंबित आहेत.",
            pending: "प्रलंबित",
            approved: "मंजूर",
            rejected: "नाकारले",
            search_placeholder: "योजना शोधा...",
            filters: "फिल्टर",
            state: "राज्य",
            available_schemes: "उपलब्ध योजना",
            check_eligibility: "पात्रता तपासा",
            apply_now: "आता अर्ज करा",
            view_details: "तपशील पहा",
            my_applications: "माझे अर्ज",
            scheme_name: "योजनेचे नाव",
            status: "स्थिती",
            applied_on: "अर्ज दिनांक",
            action: "कृती",
            notifications: "थेट सूचना",
            quick_actions: "त्वरित कृती",
            upload_docs: "कागदपत्रे अपलोड करा",
            track_app: "अर्ज ट्रॅक करा",
            download_receipt: "पावती डाउनलोड करा",
            ask_sevasetu: "सेतूसेवा ला विचारा"
        }
    };

    const [content, setContent] = useState(translations.en);

    const handleLanguageChange = (newLang) => {
        setLang(newLang);
        setContent(translations[newLang] || translations.en);
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
                        <h2 style={{ color: 'white', marginBottom: '5px' }}>{content.welcome}, Rajesh Kumar 👋</h2>
                        <p style={{ opacity: 0.9 }}>{content.pending_apps}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ width: '10px', height: '10px', background: '#FBBF24', borderRadius: '50%' }}></span> {content.pending}: 2
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ width: '10px', height: '10px', background: '#34D399', borderRadius: '50%' }}></span> {content.approved}: 1
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ width: '10px', height: '10px', background: '#F87171', borderRadius: '50%' }}></span> {content.rejected}: 0
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
                                    placeholder={content.search_placeholder}
                                    style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                                />
                            </div>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 15px', background: 'white', border: '1px solid #D1D5DB', borderRadius: '6px', color: '#4B5563' }}>
                                <Filter size={18} /> {content.filters}
                            </button>
                            <button style={{ padding: '10px 15px', background: 'white', border: '1px solid #D1D5DB', borderRadius: '6px', color: '#4B5563' }}>
                                {content.state} ▼
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
                                    <button style={{ flex: 1, padding: '8px', border: '1px solid #3A0CA3', color: '#3A0CA3', borderRadius: '4px', background: 'white', fontSize: '0.85rem' }}>{content.check_eligibility}</button>
                                    <button style={{ flex: 1, padding: '8px', background: '#3A0CA3', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }}>{content.apply_now}</button>
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
                                    <button style={{ flex: 1, padding: '8px', border: '1px solid #3A0CA3', color: '#3A0CA3', borderRadius: '4px', background: 'white', fontSize: '0.85rem' }}>{content.view_details}</button>
                                    <button style={{ flex: 1, padding: '8px', background: '#3A0CA3', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }}>{content.apply_now}</button>
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
                                    <button style={{ flex: 1, padding: '8px', border: '1px solid #3A0CA3', color: '#3A0CA3', borderRadius: '4px', background: 'white', fontSize: '0.85rem' }}>{content.view_details}</button>
                                    <button style={{ flex: 1, padding: '8px', background: '#3A0CA3', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }}>{content.apply_now}</button>
                                </div>
                            </div>

                        </div>

                        {/* My Applications Table */}
                        <div className="gov-card">
                            <div className="card-header">{content.my_applications}</div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                                        <th style={{ padding: '12px 15px', color: '#4B5563', fontWeight: '600' }}>{content.scheme_name}</th>
                                        <th style={{ padding: '12px 15px', color: '#4B5563', fontWeight: '600' }}>{content.status}</th>
                                        <th style={{ padding: '12px 15px', color: '#4B5563', fontWeight: '600' }}>{content.applied_on}</th>
                                        <th style={{ padding: '12px 15px', color: '#4B5563', fontWeight: '600' }}>{content.action}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                                        <td style={{ padding: '12px 15px' }}>Post Matric Scholarship</td>
                                        <td style={{ padding: '12px 15px' }}>
                                            <span style={{ background: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>{content.pending}</span>
                                        </td>
                                        <td style={{ padding: '12px 15px' }}>12 Feb 2026</td>
                                        <td style={{ padding: '12px 15px' }}><button style={{ color: '#3A0CA3', background: 'none', fontWeight: '600' }}>{content.view_details}</button></td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '12px 15px' }}>Farmer Support Scheme</td>
                                        <td style={{ padding: '12px 15px' }}>
                                            <span style={{ background: '#D1FAE5', color: '#059669', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>{content.approved}</span>
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
                            <div className="card-header">🔔 {content.notifications}</div>
                            <ul className="notice-list">
                                <li className="notice-item" style={{ borderLeft: '3px solid #FFBF24', paddingLeft: '10px' }}>Your scholarship is under review.</li>
                                <li className="notice-item" style={{ borderLeft: '3px solid #34D399', paddingLeft: '10px' }}>Document verification completed.</li>
                                <li className="notice-item" style={{ borderLeft: '3px solid #60A5FA', paddingLeft: '10px' }}>OTP verified successfully.</li>
                            </ul>
                        </div>

                        {/* Quick Actions */}
                        <div className="gov-card" style={{ padding: '15px' }}>
                            <div style={{ marginBottom: '15px', fontWeight: 'bold', color: '#3A0CA3' }}>📄 {content.quick_actions}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button style={{ width: '100%', padding: '10px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', display: 'flex', alignItems: 'center', gap: '10px', color: '#4B5563' }}>
                                    <ArrowUpRight size={18} color="#3A0CA3" /> {content.upload_docs}
                                </button>
                                <button style={{ width: '100%', padding: '10px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', display: 'flex', alignItems: 'center', gap: '10px', color: '#4B5563' }}>
                                    <Clock size={18} color="#3A0CA3" /> {content.track_app}
                                </button>
                                <button style={{ width: '100%', padding: '10px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', display: 'flex', alignItems: 'center', gap: '10px', color: '#4B5563' }}>
                                    <FileCheck size={18} color="#3A0CA3" /> {content.download_receipt}
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
                    {content.ask_sevasetu}
                </div>
                <SpeechInput onResult={handleSpeechResult} lang={lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN'} />
            </div>

        </div>
    );
};

export default Dashboard;
