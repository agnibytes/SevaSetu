import React, { useRef } from 'react';
import { GraduationCap, Briefcase, Heart, Sprout, HandCoins, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
    { icon: GraduationCap, label: "Post Matric Scholarship" },
    { icon: Users, label: "Pre Matric Scholarship" },
    { icon: HandCoins, label: "Pension Schemes" },
    { icon: Sprout, label: "Farmer Schemes" },
    { icon: Briefcase, label: "Labour Schemes" },
    { icon: Heart, label: "Special Assistance" },
    // Duplicate for scrolling effect demo
    { icon: GraduationCap, label: "Fellowships" },
    { icon: Briefcase, label: "Employment" },
];

const ServiceCarousel = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
        }
    };

    return (
        <div className="service-ribbon">
            <div className="container" style={{ position: 'relative' }}>

                <button className="carousel-arrow left" onClick={() => scroll('left')} style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                    <ChevronLeft />
                </button>

                <div className="service-scroll-container" ref={scrollRef} style={{ display: 'flex', overflowX: 'auto', gap: '30px', scrollbarWidth: 'none', padding: '10px 5px' }}>
                    {services.map((s, i) => (
                        <div key={i} className="service-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '110px', cursor: 'pointer' }}>
                            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#F0F9FF', border: '1px solid #E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                <s.icon size={32} color="#00B4D8" />
                            </div>
                            <span style={{ fontSize: '0.85rem', textAlign: 'center', fontWeight: 600, color: '#4B5563', lineHeight: 1.2 }}>{s.label}</span>
                        </div>
                    ))}
                </div>

                <button className="carousel-arrow right" onClick={() => scroll('right')} style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                    <ChevronRight />
                </button>

            </div>
        </div>
    );
};

export default ServiceCarousel;
