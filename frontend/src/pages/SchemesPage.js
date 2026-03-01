import React, { useState, useEffect } from 'react';
import { Search, Filter, Mic, Download, Eye, RotateCcw, User, ChevronDown } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import api from '../api/api';

const SchemesPage = () => {
    const [language, setLanguage] = useState('en');
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: 'All',
        eligibility: 'All',
        state: 'Maharashtra',
    });

    const translations = {
        "en": {
            "dashboard_title": "Citizen Dashboard",
            "page_title": "Eligible Schemes for You",
            "page_subtitle": "Based on your profile, documents, and eligibility criteria.",
            "search_placeholder": "Search schemes...",
            "category_label": "Category",
            "category_all": "All Categories",
            "eligibility_label": "Eligibility",
            "eligibility_all": "All Status",
            "state_label": "State",
            "state_value": "Maharashtra",
            "available_schemes": "Available Schemes",
            "check_eligibility": "Check Eligibility",
            "apply_now": "Apply Now",
            "view_details": "View Details",
            "track_application": "Track Application",
            "my_applications": "My Applications",
            "table_scheme": "Scheme Name",
            "table_status": "Status",
            "table_applied_on": "Applied On",
            "table_action": "Action",
            "view": "View",
            "download": "Download",
            "reapply": "Reapply",
            "ask_sevasetu": "Ask SevaSetu",
            "no_schemes": "No schemes found matching your criteria.",
            "footer": "Multilingual • Secure • Voice Enabled"
        },
        "hi": {
            "dashboard_title": "नागरिक डैशबोर्ड",
            "page_title": "आपके लिए पात्र योजनाएँ",
            "page_subtitle": "आपकी प्रोफ़ाइल, दस्तावेज़ और पात्रता के आधार पर।",
            "search_placeholder": "योजनाएँ खोजें...",
            "category_label": "श्रेणी",
            "category_all": "सभी श्रेणियाँ",
            "eligibility_label": "पात्रता",
            "eligibility_all": "सभी स्थिति",
            "state_label": "राज्य",
            "state_value": "महाराष्ट्र",
            "available_schemes": "उपलब्ध योजनाएँ",
            "check_eligibility": "पात्रता जाँचें",
            "apply_now": "अभी आवेदन करें",
            "view_details": "विवरण देखें",
            "track_application": "आवेदन ट्रैक करें",
            "my_applications": "मेरे आवेदन",
            "table_scheme": "योजना का नाम",
            "table_status": "स्थिति",
            "table_applied_on": "आवेदन की तिथि",
            "table_action": "कार्रवाई",
            "view": "देखें",
            "download": "डाउनलोड",
            "reapply": "फिर से आवेदन करें",
            "ask_sevasetu": "सेवासेतु से पूछें",
            "no_schemes": "आपके मानदंडों से मेल खाने वाली कोई योजना नहीं मिली।",
            "footer": "बहुभाषी • सुरक्षित • वॉइस सक्षम"
        },
        "mr": {
            "dashboard_title": "नागरिक डॅशबोर्ड",
            "page_title": "आपल्यासाठी पात्र योजना",
            "page_subtitle": "आपल्या प्रोफाइल, कागदपत्रे आणि पात्रतेच्या आधारे.",
            "search_placeholder": "योजना शोधा...",
            "category_label": "वर्ग",
            "category_all": "सर्व वर्ग",
            "eligibility_label": "पात्रता",
            "eligibility_all": "सर्व स्थिती",
            "state_label": "राज्य",
            "state_value": "महाराष्ट्र",
            "available_schemes": "उपलब्ध योजना",
            "check_eligibility": "पात्रता तपासा",
            "apply_now": "आता अर्ज करा",
            "view_details": "तपशील पहा",
            "track_application": "अर्ज ट्रॅक करा",
            "my_applications": "माझे अर्ज",
            "table_scheme": "योजनेचे नाव",
            "table_status": "स्थिती",
            "table_applied_on": "अर्ज दिनांक",
            "table_action": "कृती",
            "view": "पहा",
            "download": "डाउनलोड",
            "reapply": "पुन्हा अर्ज करा",
            "ask_sevasetu": "सेतूसेवा ला विचारा",
            "no_schemes": "तुमच्या निकषांशी जुळणारी कोणतीही योजना सापडली नाही.",
            "footer": "बहुभाषिक • सुरक्षित • व्हॉइस सक्षम"
        }
    };

    const [content, setContent] = useState(translations['en']);

    useEffect(() => {
        // 1. Immediate client-side update for "fast" feel
        setContent(translations[language] || translations['en']);

        const fetchTranslations = async () => {
            try {
                const response = await api.get(`/landing-text?lang=${language}`);
                const backendContent = response.data.content || response.data || {};
                // 2. Enhance with backend content if available
                if (Object.keys(backendContent).length > 0) {
                    setContent(prev => ({
                        ...prev,
                        ...backendContent
                    }));
                }
            } catch (error) {
                console.warn("Backend translations not reachable, using local mapping", error);
            }
        };
        fetchTranslations();
    }, [language]);

    // MOCK DATA
    const schemesData = [
        {
            id: "SCH001",
            title: "Post Matric Digital Scholarship",
            department: "Education Department",
            category: "Education",
            eligibility: "Students in Class 11–12 and College",
            deadline: "31 March 2026",
            status: "Eligible",
            actions: ["Check Eligibility", "Apply Now"]
        },
        {
            id: "SCH002",
            title: "Kisan Smart Support Scheme",
            department: "Agriculture Department",
            category: "Agriculture",
            eligibility: "Registered Farmers with Land Records",
            deadline: "Rolling Basis",
            status: "Applied",
            actions: ["View Details", "Track Application"]
        },
        {
            id: "SCH003",
            title: "Senior Citizen Care Pension",
            department: "Social Welfare Department",
            category: "Pension",
            eligibility: "Age 60+ with Aadhaar linked",
            deadline: "Open",
            status: "Eligible",
            actions: ["View Details", "Apply Now"]
        },
        {
            id: "SCH004",
            title: "Labour Skill Upliftment Scheme",
            department: "Labour Department",
            category: "Labour",
            eligibility: "Registered Daily Wage Workers",
            deadline: "30 June 2026",
            status: "Not Eligible",
            actions: ["View Details"]
        },
        {
            id: "SCH005",
            title: "Urban Women Empowerment Grant",
            department: "Women & Child Development",
            category: "Social Welfare",
            eligibility: "Women Entrepreneurs in Urban Areas",
            deadline: "15 April 2026",
            status: "Eligible",
            actions: ["Check Eligibility", "Apply Now"]
        },
        {
            id: "SCH006",
            title: "Youth Innovation Fellowship",
            department: "Higher Education & Innovation",
            category: "Education",
            eligibility: "Postgraduate Students with Startup Idea",
            deadline: "20 May 2026",
            status: "Eligible",
            actions: ["View Details", "Apply Now"]
        },
        {
            id: "SCH007",
            title: "Rural Housing Assistance",
            department: "Rural Development",
            category: "Housing",
            eligibility: "Below Poverty Line (BPL) Families",
            deadline: "Open",
            status: "Applied",
            actions: ["Track Application"]
        },
        {
            id: "SCH008",
            title: "Smart Village Water Scheme",
            department: "Public Works Department",
            category: "Infrastructure",
            eligibility: "Village Panchayat Residents",
            deadline: "31 December 2026",
            status: "Eligible",
            actions: ["View Details"]
        }
    ];

    const applicationsData = [
        {
            scheme: "Post Matric Digital Scholarship",
            status: "Pending",
            appliedOn: "12 Feb 2026",
            action: "View"
        },
        {
            scheme: "Kisan Smart Support Scheme",
            status: "Approved",
            appliedOn: "05 Jan 2026",
            action: "Download"
        },
        {
            scheme: "Senior Citizen Care Pension",
            status: "Rejected",
            appliedOn: "01 Jan 2026",
            action: "Reapply"
        }
    ];

    // FILTER LOGIC
    const filteredSchemes = schemesData.filter(scheme => {
        const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            scheme.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filters.category === 'All' || scheme.category === filters.category;
        const matchesEligibility = filters.eligibility === 'All' ||
            (filters.eligibility === 'Eligible' && scheme.status === 'Eligible') ||
            (filters.eligibility === 'Applied' && scheme.status === 'Applied') ||
            (filters.eligibility === 'Not Eligible' && scheme.status === 'Not Eligible');

        return matchesSearch && matchesCategory && matchesEligibility;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'text-green-600 bg-green-50';
            case 'Pending': return 'text-yellow-600 bg-yellow-50';
            case 'Rejected': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getActionIcon = (action) => {
        switch (action) {
            case 'View': return <Eye size={16} />;
            case 'Download': return <Download size={16} />;
            case 'Reapply': return <RotateCcw size={16} />;
            default: return <Eye size={16} />;
        }
    };

    const translateAction = (action) => {
        const key = action.toLowerCase().replace(' ', '_');
        return content[key] || action;
    };

    return (
        <div className="schemes-page">
            <DashboardHeader onLanguageChange={setLanguage} lang={language} dashboardTitle={content.dashboard_title} />

            <main className="container" style={{ paddingTop: '20px', paddingBottom: '80px' }}>

                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{content.page_title}</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>
                        {content.page_subtitle}
                    </p>
                </div>

                <div className="search-filter-bar">
                    <div className="search-box">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder={content.search_placeholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="filters-group">
                        <div className="filter-dropdown">
                            <label>{content.category_label}</label>
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            >
                                <option value="All">{content.category_all}</option>
                                <option value="Education">Education</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Labour">Labour</option>
                                <option value="Pension">Pension</option>
                                <option value="Health">Health</option>
                                <option value="Social Welfare">Social Welfare</option>
                            </select>
                        </div>

                        <div className="filter-dropdown">
                            <label>{content.eligibility_label}</label>
                            <select
                                value={filters.eligibility}
                                onChange={(e) => setFilters({ ...filters, eligibility: e.target.value })}
                            >
                                <option value="All">{content.eligibility_all}</option>
                                <option value="Eligible">Eligible</option>
                                <option value="Not Eligible">Not Eligible</option>
                                <option value="Applied">Applied</option>
                            </select>
                        </div>

                        <div className="filter-dropdown">
                            <label>{content.state_label}</label>
                            <select
                                value={filters.state}
                                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                                disabled
                            >
                                <option value="Maharashtra">{content.state_value}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', borderLeft: '5px solid var(--saffron)', paddingLeft: '15px' }}>
                    {content.available_schemes}
                </h2>

                {filteredSchemes.length > 0 ? (
                    <div className="schemes-grid">
                        {filteredSchemes.map(scheme => (
                            <div key={scheme.id} className="scheme-card">
                                <div className="scheme-card-header">
                                    <h3>{scheme.title}</h3>
                                    <span className={`status-badge status-${scheme.status.toLowerCase().replace(' ', '-')}`}>
                                        {scheme.status}
                                    </span>
                                </div>
                                <div className="scheme-card-body">
                                    <div className="scheme-info-row">
                                        <span className="info-label">{content.category_label}:</span>
                                        <span className="info-value">{scheme.department}</span>
                                    </div>
                                    <div className="scheme-info-row">
                                        <span className="info-label">{content.eligibility_label}:</span>
                                        <span className="info-value">{scheme.eligibility}</span>
                                    </div>
                                    <div className="scheme-info-row">
                                        <span className="info-label">Deadline:</span>
                                        <span className="info-value deadline">{scheme.deadline}</span>
                                    </div>
                                </div>
                                <div className="scheme-card-footer">
                                    {scheme.actions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            className={`btn-action ${action === 'Apply Now' ? 'btn-primary' : 'btn-secondary'}`}
                                        >
                                            {translateAction(action)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        {content.no_schemes}
                    </div>
                )}

                <div style={{ marginTop: '60px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', borderLeft: '5px solid var(--saffron)', paddingLeft: '15px' }}>
                        {content.my_applications}
                    </h2>

                    <div className="applications-table-container">
                        <table className="applications-table">
                            <thead>
                                <tr>
                                    <th>{content.table_scheme}</th>
                                    <th>{content.table_status}</th>
                                    <th>{content.table_applied_on}</th>
                                    <th>{content.table_action}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicationsData.map((app, index) => (
                                    <tr key={index}>
                                        <td style={{ fontWeight: 600 }}>{app.scheme}</td>
                                        <td>
                                            <span className={`status-pill ${getStatusColor(app.status)}`}>
                                                {app.status === 'Pending' && '🟡 '}
                                                {app.status === 'Approved' && '🟢 '}
                                                {app.status === 'Rejected' && '🔴 '}
                                                {app.status}
                                            </span>
                                        </td>
                                        <td>{app.appliedOn}</td>
                                        <td>
                                            <button className="btn-icon-text">
                                                {getActionIcon(app.action)} {content[app.action.toLowerCase()] || app.action}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                    {content.footer}
                </div>

            </main>

            <div className="voice-fab-container">
                <button className="voice-fab-btn">
                    <Mic size={28} />
                </button>
                <span className="voice-label">{content.ask_sevasetu}</span>
            </div>

        </div>
    );
};

export default SchemesPage;
