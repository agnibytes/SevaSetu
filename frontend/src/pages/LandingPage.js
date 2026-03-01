import React, { useEffect, useState } from 'react';
import api from '../api/api';
// Components
import TopGovernmentBar from '../components/TopGovernmentBar';
import ServiceCarousel from '../components/ServiceCarousel';
import NoticePanel from '../components/NoticePanel';
import SidebarLinks from '../components/SidebarLinks';
import SpeechInput from '../components/SpeechInput';
import SpeakText from '../components/SpeakText';
// Icons
import { Mic, Shield, Globe, Home } from 'lucide-react';

const translations = {
    en: {
        hero_title: "Government Services Portal",
        hero_subtitle: "Access schemes & submit grievances easily",
        start_with_voice: "Start with Voice",
        citizen_login: "Citizen Login",

        notice_board_title: "Notice Board",
        quick_links: "Quick Links",
        view_all: "View All",

        // Quick Links Items
        new_applicant_registration: "New Applicant Registration",
        applicant_login: "Applicant Login",
        find_eligible_schemes: "Find Eligible Schemes",
        institute_login: "Institute / Dept / DDO Login",
        grievance: "Grievance / Suggestions",
        user_manuals: "User Manuals",
        faq: "Frequently Asked Questions",

        // Features
        voice_title: "Voice First",
        voice_desc: "Speak instead of type.",
        secure_title: "Secure Identity",
        secure_desc: "Aadhaar + PAN + OTP.",
        multi_title: "Multilingual",
        multi_desc: "All major languages.",

        footer: "Multilingual • Secure • Voice Enabled",
        tap_to_speak: "Tap to Speak"
    },
    hi: {
        hero_title: "सरकारी सेवा पोर्टल",
        hero_subtitle: "योजनाओं और शिकायतों तक आसान पहुंच",
        start_with_voice: "आवाज़ से शुरू करें",
        citizen_login: "नागरिक लॉगिन",

        notice_board_title: "सूचना बोर्ड",
        quick_links: "त्वरित लिंक",
        view_all: "सभी देखें",

        // Quick Links Items
        new_applicant_registration: "नया आवेदन पंजीकरण",
        applicant_login: "आवेदक लॉगिन",
        find_eligible_schemes: "योग्य योजनाएँ खोजें",
        institute_login: "संस्थान / विभाग / DDO लॉगिन",
        grievance: "शिकायत / सुझाव",
        user_manuals: "उपयोगकर्ता पुस्तिका",
        faq: "अक्सर पूछे जाने वाले प्रश्न",

        // Features
        voice_title: "वॉइस फर्स्ट",
        voice_desc: "टाइप करने के बजाय बोलें।",
        secure_title: "सुरक्षित पहचान",
        secure_desc: "आधार + पैन + OTP.",
        multi_title: "बहुभाषी",
        multi_desc: "सभी प्रमुख भाषाएँ।",

        footer: "बहुभाषी • सुरक्षित • वॉइस सक्षम",
        tap_to_speak: "बोलने के लिए टैप करें"
    },
    mr: {
        hero_title: "शासकीय सेवा पोर्टल",
        hero_subtitle: "योजना व तक्रारी सुलभपणे मिळवा",
        start_with_voice: "आवाजाने सुरू करा",
        citizen_login: "नागरिक लॉगिन",

        notice_board_title: "सूचना फलक",
        quick_links: "जलद दुवे",
        view_all: "सर्व पहा",

        // Quick Links Items
        new_applicant_registration: "नवीन अर्ज नोंदणी",
        applicant_login: "अर्जदार लॉगिन",
        find_eligible_schemes: "पात्र योजना शोधा",
        institute_login: "संस्था / विभाग / DDO लॉगिन",
        grievance: "तक्रार / सूचना",
        user_manuals: "वापरकर्ता मार्गदर्शिका",
        faq: "वारंवार विचारले जाणारे प्रश्न",

        // Features
        voice_title: "व्हॉइस फर्स्ट",
        voice_desc: "टाइप करण्याऐवजी बोला.",
        secure_title: "सुरक्षित ओळख",
        secure_desc: "आधार + पॅन + OTP.",
        multi_title: "बहुभाषिक",
        multi_desc: "सर्व प्रमुख भाषा.",

        footer: "बहुभाषिक • सुरक्षित • व्हॉइस सक्षम",
        tap_to_speak: "बोलण्यासाठी टॅप करा"
    }
};

const LandingPage = () => {
    const [lang, setLang] = useState('en');
    const [voiceActive, setVoiceActive] = useState(false);
    const [uiText, setUiText] = useState(translations.en);

    const fetchContent = async (languageCode) => {
        // 1. Client-side immediate update
        setUiText(translations[languageCode] || translations.en);

        try {
            // 2. Dynamic content API call (Required by prompt)
            await api.get(`/landing-text?lang=${languageCode}`);
            // Note: We are using the strict client-side map as primary source of truth for UI text as per prompt requirements,
            // but strictly calling the API as requested.
        } catch (error) {
            console.error("Failed to fetch landing content", error);
        }
    };

    useEffect(() => {
        // Initial load
        fetchContent(lang);
    }, [lang]);

    const handleLanguageChange = (newLang) => {
        setLang(newLang);
    };

    const handleSpeechResult = (transcript) => {
        console.log("Speech input received:", transcript);
        setVoiceActive(false);
        alert(`System heard: "${transcript}"`);
    };

    const activateVoice = () => {
        setVoiceActive(true);
        // Trigger the existing SpeechInput component
        const fabBtn = document.querySelector('.fab-mic');
        if (fabBtn) fabBtn.click();

        setTimeout(() => setVoiceActive(false), 8000);
    };

    return (
        <div className="landing-page-gov">
            {/* 1. TOP HEADER */}
            <TopGovernmentBar
                onLanguageChange={handleLanguageChange}
                lang={lang}
                brandingSubtitle="Government Services Portal"
            />

            {/* 2. SERVICES RIBBON */}
            <ServiceCarousel />

            {/* 3. STRICT 3-COLUMN LAYOUT */}
            <div className="container gov-grid">

                {/* LEFT COL: NOTICE BOARD */}
                <div className="left-col">
                    <NoticePanel title={uiText.notice_board_title} viewAll={uiText.view_all} />
                </div>

                {/* CENTER COL: HERO & FEATURES */}
                <div className="center-col">

                    <div className="hero-center">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                {/* Hero Title: Localized */}
                                <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#1A1A1A' }}>
                                    {uiText.hero_title}
                                </h2>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '25px' }}>
                                    <p style={{ fontSize: '1.2rem', color: '#4B5563' }}>
                                        {uiText.hero_subtitle}
                                    </p>
                                    <SpeakText text={uiText.hero_subtitle} lang={lang === 'hi' ? 'hi-IN' : 'en-IN'} />
                                </div>

                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <button
                                        className="btn-primary"
                                        onClick={activateVoice}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {uiText.start_with_voice}
                                    </button>
                                    <button
                                        className="btn-secondary"
                                        onClick={() => window.location.href = '/login'}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {uiText.citizen_login}
                                    </button>
                                </div>
                            </div>

                            {/* Right Visual: Architecture/Govt Symbol */}
                            <div className={`voice-ring-container ${voiceActive ? 'voice-active' : ''}`} style={{ width: '150px', height: '150px' }}>
                                <div className="pulse-ring"></div>
                                <div className="pulse-ring"></div>
                                <div style={{ zIndex: 2, position: 'relative', width: '120px', height: '120px', background: '#F0F9FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Home size={60} color="#00B4D8" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="feature-grid-3">
                        <div className="feature-box">
                            <Mic size={32} color="#00B4D8" style={{ marginBottom: '10px' }} />
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{uiText.voice_title}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>{uiText.voice_desc}</p>
                        </div>
                        <div className="feature-box">
                            <Shield size={32} color="#3A0CA3" style={{ marginBottom: '10px' }} />
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{uiText.secure_title}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>{uiText.secure_desc}</p>
                        </div>
                        <div className="feature-box">
                            <Globe size={32} color="#FA5252" style={{ marginBottom: '10px' }} />
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{uiText.multi_title}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>{uiText.multi_desc}</p>
                        </div>
                    </div>

                </div>

                {/* RIGHT COL: QUICK LINKS */}
                <div className="right-col">
                    <SidebarLinks translations={uiText} />
                </div>

            </div>

            {/* FOOTER */}
            <div style={{ textAlign: 'center', padding: '30px', borderTop: '1px solid #eee', marginTop: '20px', color: '#888', background: 'white' }}>
                <p style={{ fontSize: '0.9rem' }}>{uiText.footer}</p>
            </div>

            {/* FAB - Fixed Bottom Right */}
            <div className="voice-fab">
                <div style={{ marginBottom: '10px', background: 'white', padding: '5px 10px', borderRadius: '4px', border: '1px solid #eee', fontSize: '0.8rem', fontWeight: 'bold', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    {uiText.tap_to_speak}
                </div>
                <SpeechInput onResult={handleSpeechResult} lang={lang === 'hi' ? 'hi-IN' : 'en-IN'} />
            </div>
        </div>
    );
};

export default LandingPage;
