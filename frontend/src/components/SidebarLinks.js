import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

const SidebarLinks = ({ translations }) => {
    const t = translations || {};

    const links = [
        { label: t.new_applicant_registration || "New Applicant Registration", to: "/register.html" },
        { label: t.applicant_login || "Applicant Login", to: "/login.html" },
        { label: t.find_eligible_schemes || "Find Eligible Schemes", to: "/schemes.html" },
        { label: t.institute_login || "Institute / Dept / DDO Login", to: "/institute-login.html" },
        { label: t.grievance || "Grievance / Suggestions", to: "/grievance.html" },
        { label: t.user_manuals || "User Manuals", to: "/manuals.html" },
        { label: t.faq || "Frequently Asked Questions", to: "/faq.html" }
    ];

    return (
        <div className="gov-card" style={{ padding: '15px', background: '#F9FAFB' }}>
            <div style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: 'bold', color: '#3A0CA3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📌</span> {t.quick_links || "Quick Links"}
            </div>

            {links.map((link, i) => (
                <a
                    key={i}
                    href={link.to}
                    className="link-box"
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    {link.label}
                    <ArrowRight size={16} color="#00B4D8" />
                </a>
            ))}

        </div>
    );
};

export default SidebarLinks;
