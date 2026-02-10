import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';

const SidebarLinks = ({ translations }) => {
    const t = translations || {};

    const links = [
        { label: t.new_applicant_registration || "New Applicant Registration", to: "/register" },
        { label: t.applicant_login || "Applicant Login", to: "/login" },
        { label: t.find_eligible_schemes || "Find Eligible Schemes", to: "/" },
        { label: t.institute_login || "Institute / Dept / DDO Login", to: "/" },
        { label: t.grievance || "Grievance / Suggestions", to: "/" },
        { label: t.user_manuals || "User Manuals", to: "/" },
        { label: t.faq || "Frequently Asked Questions", to: "/" }
    ];

    return (
        <div className="gov-card" style={{ padding: '15px', background: '#F9FAFB' }}>
            <div style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: 'bold', color: '#3A0CA3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📌</span> {t.quick_links_title || "Quick Links"}
            </div>

            {links.map((link, i) => (
                <Link key={i} to={link.to} className="link-box">
                    {link.label}
                    <ArrowRight size={16} color="#00B4D8" />
                </Link>
            ))}

        </div>
    );
};

export default SidebarLinks;
