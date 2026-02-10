import React from 'react';
import { Home, FilePlus, FolderClock, Bell, FileText, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardSidebar = () => {
    const navItems = [
        { icon: Home, label: "Dashboard", active: true },
        { icon: FilePlus, label: "Apply for Schemes" },
        { icon: FolderClock, label: "My Applications" },
        { icon: Bell, label: "Notifications" },
        { icon: FileText, label: "My Documents" },
        { icon: Settings, label: "Settings" },
    ];

    return (
        <div className="gov-card" style={{ padding: '15px', background: 'white' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '12px 15px', borderRadius: '6px',
                            cursor: 'pointer',
                            background: item.active ? '#EEF2FF' : 'transparent',
                            color: item.active ? '#3A0CA3' : '#4B5563',
                            fontWeight: item.active ? '600' : '500',
                            borderLeft: item.active ? '4px solid #3A0CA3' : '4px solid transparent'
                        }}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </div>
                ))}

                <div style={{ borderTop: '1px solid #eee', margin: '10px 0' }}></div>

                <Link to="/" style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 15px', borderRadius: '6px',
                    cursor: 'pointer', color: '#DC2626', textDecoration: 'none', fontWeight: '500'
                }}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default DashboardSidebar;
