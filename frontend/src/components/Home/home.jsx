import React from 'react';
import "./home.css"

function Home() {
    return (
        <div className="home-container">
            <header className="hero">
                <h1>Willkommen zu meinem Projekt</h1>
                <p>Entwickle meiner Fähigkeiten in Machine Learning und Full-Stack-Entwicklung.</p>
                <a href="/salary" className="cta-button">Jetzt starten</a>
            </header>

            <section className="about">
                <h2>Über das Projekt</h2>
                <p>Dieses Projekt zielt darauf ab, mir die Fähigkeiten zu vermitteln, die ich
                    benötige, um in der Welt der Technologie erfolgreich zu sein.</p>
                <ul>
                    <li>Grundlagen von Machine Learning lernen</li>
                    <li>Vollständige Webanwendungen entwickeln</li>
                    <li>Mit neuen Technologien experimentieren</li>
                </ul>
            </section>

            <section className="projects">
                <h2>Projekte</h2>
                <div className="project">
                    <h3>Projekt 1: Gehaltsvorhersage</h3>
                    <p>Eine Anwendung zur Vorhersage von Gehältern basierend auf verschiedenen
                        Faktoren.</p>
                    <a href="/salary" className="project-link">Mehr erfahren</a>
                </div>
            </section>

            <footer className="footer">
                <p>© 2023 Mein Projekt. Alle Rechte vorbehalten.</p>
            </footer>
        </div>
    );
}

export default Home;