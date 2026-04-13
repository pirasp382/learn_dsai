
import React from 'react';
import './IntrovertGraphen.css';

const IntrovertGraphen = ({ results }) => {
    if (!results || results.length === 0) {
        return <div>Keine Daten für Vergleichsanalyse verfügbar</div>;
    }
    
    return (
        <div className="graphen-container">
            <h3>Vergleich verschiedener Szenarien</h3>
            
            <div className="comparison-chart">
                {results.map((result, index) => {
                    const isExtrovert = result.personality === 'Extrovert';
                    const confidence = result.confidence * 100;
                    
                    return (
                        <div key={index} className="scenario-card">
                            <div className="scenario-header">
                                <span className="scenario-number">Szenario {index + 1}</span>
                                <span className={`personality-badge ${isExtrovert ? 'extrovert' : 'introvert'}`}>
                                    {result.personality}
                                </span>
                            </div>
                            
                            <div className="scenario-confidence">
                                <div className="confidence-label">
                                    Konfidenz: {confidence.toFixed(1)}%
                                </div>
                                <div className="mini-bar">
                                    <div 
                                        className="mini-fill"
                                        style={{ width: `${confidence}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <div className="scenario-probabilities">
                                <div className="mini-prob">
                                    <span>E:</span>
                                    <div className="mini-prob-bar">
                                        <div 
                                            className="mini-prob-fill extrovert"
                                            style={{ width: `${result.probabilities.extrovert * 100}%` }}
                                        ></div>
                                    </div>
                                    <span>{(result.probabilities.extrovert * 100).toFixed(0)}%</span>
                                </div>
                                <div className="mini-prob">
                                    <span>I:</span>
                                    <div className="mini-prob-bar">
                                        <div 
                                            className="mini-prob-fill introvert"
                                            style={{ width: `${result.probabilities.introvert * 100}%` }}
                                        ></div>
                                    </div>
                                    <span>{(result.probabilities.introvert * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default IntrovertGraphen;