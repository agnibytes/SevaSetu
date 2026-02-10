import React, { useState, useEffect, useRef } from 'react';
import api from '../api/api';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSelector = ({ onLanguageChange }) => {
    const [languages, setLanguages] = useState([]);
    const [selectedLang, setSelectedLang] = useState('en');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await api.get('/languages');
                // Handling response format based on typical flask wrapper
                const langs = response.data.languages || response.data || [];
                // Ensure format is compatible
                const formatted = Array.isArray(langs) ? langs : Object.entries(langs).map(([k, v]) => ({ code: k, name: v }));
                setLanguages(formatted);
            } catch (error) {
                console.error("Failed to fetch languages", error);
                setLanguages([
                    { code: 'en', name: 'English' },
                    { code: 'hi', name: 'Hindi' },
                    { code: 'mr', name: 'Marathi' }
                ]);
            }
        };
        fetchLanguages();
    }, []);

    const handleSelect = (code) => {
        setSelectedLang(code);
        onLanguageChange(code);
        setIsOpen(false);
    };

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentLabel = languages.find(l => l.code === selectedLang)?.name || 'English';

    return (
        <div className="custom-select-wrapper" ref={dropdownRef}>
            <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
                <Globe size={16} color="#6366F1" />
                <span style={{ color: '#64748B' }}>Language:</span>
                <span style={{ color: '#0F172A', fontWeight: 600 }}>{currentLabel}</span>
                <ChevronDown size={14} color="#94A3B8" />
            </div>

            <div className={`custom-options ${isOpen ? 'open' : ''}`}>
                {languages.map((lang) => (
                    <div
                        key={lang.code}
                        className={`custom-option ${selectedLang === lang.code ? 'selected' : ''}`}
                        onClick={() => handleSelect(lang.code)}
                    >
                        {lang.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelector;
