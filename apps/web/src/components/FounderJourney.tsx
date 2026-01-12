'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function FounderJourney() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <a href="#" className="founder-journey-trigger" onClick={handleOpen}>
                Read Founder’s Journey →
            </a>

            {mounted && createPortal(
                <div className={`founder-lightbox ${isOpen ? 'active' : ''}`}>
                    {/* Close on background click */}
                    <div className="absolute inset-0" onClick={handleClose}></div>

                    <div className="founder-lightbox-content relative z-10" onClick={(e) => e.stopPropagation()}>

                        {/* Image Column */}
                        <div className="founder-lightbox-image"></div>

                        {/* Copy Column */}
                        <div className="founder-lightbox-copy">
                            <h4>Founder in Practice</h4>
                            <p>
                                Beyond leading SkinLuxe, Alka remains actively involved in clinical
                                decision-making — from evaluating devices and protocols to guiding
                                complex treatments.
                            </p>
                            <p>
                                This ensures every procedure follows medical reasoning, not trends or
                                packages.
                            </p>
                            <button className="lightbox-close" onClick={handleClose}>
                                Close
                            </button>
                        </div>

                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
