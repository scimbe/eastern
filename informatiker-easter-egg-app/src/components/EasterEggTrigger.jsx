import React from 'react';
import '../styles/App.css';

const EasterEggTrigger = ({ onActivate }) => {
    return (
        <div className="easter-egg-trigger">
            <button className="trigger-button" onClick={onActivate}>
                🌐 TCP-Verbindung aufbauen 🔐
            </button>
        </div>
    );
};

export default EasterEggTrigger;