import React, { useEffect, useState, useRef } from 'react';
import '../styles/Logbook.css';

// Ironische Sicherheitsmeldungen für Mausbewegungen
const securityMessages = [
  "WARNUNG: Verdächtige Mausbewegung erkannt! Möglicher Hacking-Versuch.",
  "KRITISCH: Maus bewegt sich in unerlaubtem Winkel. Protokolliert für forensische Analyse.",
  "ALARM: Mausbewegungsgeschwindigkeit überschreitet zulässige Parameter.",
  "ACHTUNG: Potentiell bösartige Cursor-Trajektorie identifiziert.",
  "SICHERHEITSVERSTOS: Unvorhersehbare Mausbewegung deutet auf Kompromittierung hin.",
  "WARNUNG: Mausaktivität weicht von normalen Benutzermustern ab.",
  "GEFAHR: Mausbewegung entspricht bekanntem Angriffsmuster von APT-33.",
  "ERHÖHTE SICHERHEIT: Ungewöhnliche Mausaktivität löst Intrusion Detection System aus.",
  "WARNUNG: Mauszeiger hat auf verdächtigen Bildschirmbereich zugegriffen.",
  "NOTFALL: Mausbewegungsentropie entspricht nicht autorisierten Parametern."
];

const getRandomLogPrefix = () => {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const pid = Math.floor(Math.random() * 9000) + 1000;
  const logLevels = ['DEBUG', 'INFO', 'NOTICE', 'WARNING', 'ERROR', 'CRITICAL', 'ALERT'];
  const level = logLevels[Math.floor(Math.random() * logLevels.length)];
  
  return `[${timestamp}] [pid:${pid}] [${level}]`;
};

const Logbook = ({ mouseMovements }) => {
    const [logs, setLogs] = useState([]);
    const logbookRef = useRef(null);

    useEffect(() => {
        if (mouseMovements.length > 0) {
            const movement = mouseMovements[mouseMovements.length - 1];
            const prefix = getRandomLogPrefix();
            const message = securityMessages[Math.floor(Math.random() * securityMessages.length)];
            const newLog = `${prefix} ${message} x=${movement.x}, y=${movement.y}`;
            
            // Begrenze die Logs auf maximal 15 Einträge, um Performance-Probleme zu vermeiden
            setLogs((prevLogs) => {
                const updatedLogs = [...prevLogs, newLog];
                return updatedLogs.slice(-15);
            });
        }
    }, [mouseMovements]);

    useEffect(() => {
        // Automatisches Scrollen zum neuesten Log-Eintrag
        if (logbookRef.current) {
            logbookRef.current.scrollTop = logbookRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="logbook-container">
            <div className="logbook-header">
                <h2>S.I.C.H.E.R.H.E.I.T.S.L.O.G</h2>
                <div className="logbook-status">
                    <div className="status-indicator"></div>
                    <span>System überwacht • Anomalien werden protokolliert</span>
                </div>
            </div>
            <div className="logbook-content" ref={logbookRef}>
                <div className="logbook-entries">
                    {logs.length === 0 ? (
                        <div className="empty-log">Warte auf verdächtige Aktivitäten...</div>
                    ) : (
                        logs.map((log, index) => (
                            <div 
                                key={index} 
                                className={`log-entry ${index === logs.length - 1 ? 'new-entry' : ''}`}
                            >
                                <code>{log}</code>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="logbook-footer">
                <div className="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
                <div className="log-stats">
                    {logs.length} Sicherheitsverletzungen erkannt
                </div>
            </div>
        </div>
    );
};

export default Logbook;