import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';

const notices = [
    "Application acceptance for new academic year started.",
    "Fresh/Renewal applications open for 2025-26.",
    "Re-apply provisions extended till 31st March.",
    "Guidelines and rules reminder: Check document list.",
    "Aadhaar linking is mandatory for all schemes."
];

const NoticePanel = ({ title, viewAll }) => {
    return (
        <div className="gov-card">
            <div className="card-header">
                <Bell size={20} />
                {title || "Notice Board"}
            </div>
            <div style={{ height: '350px', overflowY: 'auto' }}> {/* Fixed height for alignment */}
                <ul className="notice-list">
                    {notices.map((notice, index) => (
                        <li key={index} className="notice-item">
                            <ChevronRight size={16} className="notice-icon" />
                            <span>{notice}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ padding: '10px', textAlign: 'center', borderTop: '1px solid #eee', color: '#00B4D8', fontWeight: 'bold', cursor: 'pointer' }}>
                {viewAll || "View All"}
            </div>
        </div>
    );
};

export default NoticePanel;
