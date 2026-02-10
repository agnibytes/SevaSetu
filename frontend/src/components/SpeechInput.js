import React, { useState } from 'react';
import { Mic } from 'lucide-react';

const SpeechInput = ({ onResult, lang }) => {
    const [isListening, setIsListening] = useState(false);

    // Mapping lang code to locale for Web Speech API
    const locale = lang === 'hi' ? 'hi-IN' : (lang === 'mr' ? 'mr-IN' : 'en-IN');

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Browser does not support speech recognition");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = locale;
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
        };

        recognition.start();
    };

    return (
        <>
            <button
                className="fab-btn fab-mic"
                onClick={startListening}
                title="Tap to speak"
            >
                <Mic size={32} />
            </button>
            {isListening && (
                <div style={{
                    position: 'fixed', bottom: '100px', right: '30px',
                    background: 'rgba(0,0,0,0.8)', color: 'white',
                    padding: '8px 16px', borderRadius: '20px', fontSize: '0.8rem'
                }}>
                    Listening...
                </div>
            )}
        </>
    );
};

export default SpeechInput;
