import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    const features = [
        {
            icon: '💰',
            title: 'Gehaltsvorhersage',
            description: 'Prädizieren Sie Ihr Gehalt basierend auf Alter, Geschlecht, Bildung, Beruf und Erfahrung.',
            path: '/salary',
            color: 'primary'
        },
        {
            icon: '🧠',
            title: 'Persönlichkeitsanalyse',
            description: 'Entdecken Sie ob Sie eher extrovertiert oder introvertiert sind basierend auf Ihren Gewohnheiten.',
            path: '/introvert',
            color: 'secondary'
        }
    ];
    
    const stats = [
        { value: '98%', label: 'Genauigkeit' },
        { value: '10k+', label: 'Analysen' },
        { value: '24/7', label: 'Verfügbar' }
    ];
    
    return (
        <div className="home">
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Willkommen bei{' '}
                            <span className="text-gradient">ML Predictor</span>
                        </h1>
                        <p className="hero-subtitle">
                            Entdecken Sie die Kraft von Machine Learning mit unseren 
                            interaktiven Prädiktions-Tools
                        </p>
                        <div className="hero-buttons">
                            <Link to="/salary" className="btn btn-primary">
                                🚀 Jetzt starten
                            </Link>
                            <a href="#features" className="btn btn-primary">
                                Mehr erfahren
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section id="features" className="features-section">
                <div className="container">
                    <h2 className="section-title">Unsere Prädiktions-Tools</h2>
                    <p className="section-subtitle">
                        Wählen Sie eines unserer modernen ML-Modelle für Ihre Analyse
                    </p>
                    
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card card">
                                <div className={`feature-icon feature-icon-${feature.color}`}>
                                    {feature.icon}
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                                <Link to={feature.path} className="feature-link">
                                    Jetzt analysieren →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Bereit für Ihre Analyse?</h2>
                        <p>Starten Sie jetzt mit einer kostenlosen Prädiktion</p>
                        <Link to="/salary" className="btn btn-primary">
                            Kostenlos testen
                        </Link>
                    </div>
                </div>
            </section>
            
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>ML Predictor</h3>
                            <p>Moderne Machine Learning Lösungen für präzise Vorhersagen</p>
                        </div>
                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/salary">Gehaltsvorhersage</Link></li>
                                <li><Link to="/introvert">Persönlichkeitsanalyse</Link></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Technologien</h4>
                            <ul>
                                <li>React & FastAPI</li>
                                <li>Scikit-learn</li>
                                <li>Pandas & NumPy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 ML Predictor. Alle Rechte vorbehalten.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;