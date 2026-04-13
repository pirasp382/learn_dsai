import React from 'react';
import './IntrovertResult.css';

const IntrovertResult = ({ result }) => {
    const { personality, confidence, probabilities } = result;
    const isExtrovert = personality === 'Extrovert';
    
    const personalityInfo = {
        Extrovert: {
            icon: '🎉',
            title: 'Extrovertiert',
            description: 'Sie sind ein geselliger Mensch, der Energie aus sozialen Interaktionen schöpft.',
            traits: ['Gesellig', 'Energiegeladen', 'Aufgeschlossen', 'Kommunikativ', 'Teamplayer']
        },
        Introvert: {
            icon: '📚',
            title: 'Introvertiert',
            description: 'Sie sind ein nachdenklicher Mensch, der Energie aus ruhigen Aktivitäten schöpft.',
            traits: ['Nachdenklich', 'Fokussiert', 'Unabhängig', 'Tiefgründig', 'Kreativ']
        }
    };
    
    const info = personalityInfo[personality];
    
    return (
        <div className={`result-card ${isExtrovert ? 'extrovert' : 'introvert'}`}>
            <div className="result-icon">
                {info.icon}
            </div>
            
            <h2 className="result-title">{info.title}</h2>
            <p className="result-description">{info.description}</p>
            
            <div className="confidence-section">
                <div className="confidence-label">
                    <span>Konfidenz der Analyse:</span>
                    <span>{(confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="confidence-bar">
                    <div 
                        className="confidence-fill"
                        style={{ width: `${confidence * 100}%` }}
                    ></div>
                </div>
            </div>
            
            <div className="probabilities-section">
                <h3>Wahrscheinlichkeitsverteilung</h3>
                <div className="prob-bar-container">
                    <div className="prob-item">
                        <span>Extrovertiert</span>
                        <div className="prob-bar-bg">
                            <div 
                                className="prob-bar extrovert"
                                style={{ width: `${probabilities.extrovert * 100}%` }}
                            >
                                <span className="prob-value">
                                    {(probabilities.extrovert * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="prob-item">
                        <span>Introvertiert</span>
                        <div className="prob-bar-bg">
                            <div 
                                className="prob-bar introvert"
                                style={{ width: `${probabilities.introvert * 100}%` }}
                            >
                                <span className="prob-value">
                                    {(probabilities.introvert * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="traits-section">
                <h3>Typische Eigenschaften</h3>
                <div className="traits-list">
                    {info.traits.map((trait, index) => (
                        <span key={index} className="trait-badge">{trait}</span>
                    ))}
                </div>
            </div>
            
            <div className="recommendation-section">
                <h3>Empfehlung für Sie</h3>
                <p className="recommendation-text">
                    {isExtrovert 
                        ? "Nutzen Sie Ihre sozialen Fähigkeiten in Teamprojekten und Netzwerk-Events. Achten Sie aber auch auf ausreichend Zeit für sich selbst."
                        : "Schaffen Sie sich ruhige Arbeitsumgebungen und nutzen Sie Ihre Stärke in fokussierten Einzelarbeiten. Planen Sie soziale Aktivitäten bewusst ein."
                    }
                </p>
            </div>
        </div>
    );
};

export default IntrovertResult;