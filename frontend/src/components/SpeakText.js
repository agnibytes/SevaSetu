import React, { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';

const SpeakText = ({ text, lang = 'en-IN', autoPlay = false }) => {
    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
        if (autoPlay && text) {
            handleSpeak();
        }
    }, [text, autoPlay]);

    const handleSpeak = () => {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel(); // Stop any current speech

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    return (
        <button
            onClick={handleSpeak}
            className={`speak-btn ${speaking ? 'speaking' : ''}`}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: speaking ? 'var(--accent-color)' : 'var(--primary-color)',
                padding: '8px',
                display: 'inline-flex',
                alignItems: 'center'
            }}
            aria-label="Read text aloud"
        >
            <Volume2 size={24} />
        </button>
    );
};

export default SpeakText;
