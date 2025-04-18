import React, { useEffect, useState, useRef } from 'react';
import '../styles/TcpHandshakeAnimation.css';

const TcpHandshakeAnimation = () => {
    const [step, setStep] = useState(0);
    const [handshakeComplete, setHandshakeComplete] = useState(false);
    
    // Stabile Animation durch exakte Zeitabstände
    useEffect(() => {
        if (step < 3) {
            const timer = setTimeout(() => {
                setStep(step + 1);
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setHandshakeComplete(true);
        }
    }, [step]);

    return (
        <div className="tcp-handshake-animation">
            <div className="celebration title-celebration">
                <p>🎉 Finde das "Easter Egg" powered by vibe coding 🎉</p>
            </div>
            <h2>TCP 3-Way Handshake</h2>
            <div className="handshake-container">
                {/* Client Seite - statisch positioniert */}
                <div className="figure client">
                    <div className="figure-head">Client</div>
                    <div className="figure-body">
                        <div className="figure-torso">🧑‍💻</div>
                        <div className="figure-arm-container">
                            <div className={`figure-arm ${step === 0 || step === 2 ? 'arm-extended' : 'arm-retracted'}`}></div>
                        </div>
                        <div className="figure-hand-container">
                            <div className={`figure-hand ${step === 0 || step === 2 ? 'hand-visible' : 'hand-hidden'}`}>👋</div>
                        </div>
                    </div>
                </div>

                {/* Nachrichtenbereich mit animierten Nachrichten */}
                <div className="message-container">
                    {step >= 0 && (
                        <div className={`message syn ${step === 0 ? 'sending-right' : (step > 0 ? 'received-right' : '')}`}>
                            SYN
                        </div>
                    )}
                    {step >= 1 && step <= 2 && ( // SYN-ACK wird nur während Schritt 1-2 angezeigt
                        <div className={`message syn-ack ${step === 1 ? 'sending-left' : (step > 1 ? 'received-left' : '')}`}>
                            SYN-ACK
                        </div>
                    )}
                    {step >= 2 && (
                        <div className={`message ack ${step === 2 ? 'sending-right' : (step > 2 ? 'received-right' : '')}`}>
                            ACK
                        </div>
                    )}
                </div>

                {/* Server Seite - statisch positioniert */}
                <div className="figure server">
                    <div className="figure-head">Osterhasen-Server</div>
                    <div className="figure-body">
                        <div className="figure-torso bunny">🐰</div>
                        <div className="figure-arm-container">
                            <div className={`figure-arm ${step === 1 ? 'arm-extended' : 'arm-retracted'}`}></div>
                        </div>
                        <div className="figure-hand-container">
                            <div className={`figure-hand ${step === 1 ? 'hand-visible' : 'hand-hidden'}`}>👋</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statusanzeige mit fester Höhe */}
            <div className="handshake-status">
                {step === 0 && <p>Client sendet SYN zum Osterhasen...</p>}
                {step === 1 && <p>Osterhasen-Server antwortet mit SYN-ACK...</p>}
                {step === 2 && <p>Client bestätigt mit ACK...</p>}
                {handshakeComplete && (
                    <div className="celebration">
                        <p>🎉 Verbindung zum Osterhasen hergestellt! 🎉</p>
                        <p className="technical-note">TCP-Verbindung erfolgreich aufgebaut.</p>
                    </div>
                )}
            </div>
            
            {/* Footer mit Link zu GitHub und HAW Hamburg */}
            <div className="tcp-handshake-footer">
                <a href="https://github.com/scimbe/eastern" target="_blank" rel="noopener noreferrer">
                    GitHub Repository
                </a>
                <span className="footer-divider">|</span>
                <span>CaDS - HAW Hamburg</span>
            </div>
        </div>
    );
};

export default TcpHandshakeAnimation;