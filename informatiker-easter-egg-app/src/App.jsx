import React, { useState, useEffect, useCallback } from 'react';
import TcpHandshakeAnimation from './components/TcpHandshakeAnimation';
import Logbook from './components/Logbook';
import EasterEggTrigger from './components/EasterEggTrigger';
import './styles/App.css';

const EASTER_CODE = ['o', 's', 't', 'e', 'r', 'n']; // Die geheime Tastenfolge "ostern"

const App = () => {
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [mouseMovements, setMouseMovements] = useState([]);
    const [keySequence, setKeySequence] = useState([]);
    const [showEasterMessage, setShowEasterMessage] = useState(false);

    const handleEasterEggToggle = () => {
        setShowEasterEgg(!showEasterEgg);
    };

    // Behandelt Tastatureingaben und prüft auf die geheime Sequenz
    const handleKeyPress = useCallback((event) => {
        const key = event.key.toLowerCase();
        
        setKeySequence(prev => {
            const newSequence = [...prev, key].slice(-EASTER_CODE.length);
            
            // Prüfen, ob die aktuelle Sequenz mit dem EASTER_CODE übereinstimmt
            if (newSequence.join('') === EASTER_CODE.join('')) {
                setShowEasterMessage(true);
                // Blende die Nachricht nach 3 Sekunden wieder aus
                setTimeout(() => setShowEasterMessage(false), 3000);
            }
            
            return newSequence;
        });
    }, []);

    useEffect(() => {
        // Tastaturereignisse global überwachen
        window.addEventListener('keydown', handleKeyPress);
        
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        if (showEasterEgg) {
            const handleMouseMove = (event) => {
                const newMovement = {
                    x: event.clientX,
                    y: event.clientY,
                    timestamp: new Date().toISOString()
                };
                setMouseMovements(prev => [...prev, newMovement]);
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [showEasterEgg]);

    return (
        <div className="App">
            <h1>Kontakt zum Osterhasen</h1>
            <EasterEggTrigger onActivate={handleEasterEggToggle} />
            {showEasterEgg && (
                <div className="easter-egg-container">
                    <TcpHandshakeAnimation />
                    <Logbook mouseMovements={mouseMovements} />
                </div>
            )}
            
            {/* Das "Frohe Ostern" Easter Egg */}
            {showEasterMessage && (
                <div className="easter-message">
                    <h2>🐰 Frohe Ostern! 🥚</h2>
                    <p>Du hast das geheime Easter Egg gefunden!</p>
                </div>
            )}
        </div>
    );
};

export default App;