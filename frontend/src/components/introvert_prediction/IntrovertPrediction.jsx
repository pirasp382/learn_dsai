import { useState } from "react";
import axios from "axios";
import "./IntrovertPrediction.css";
import Button from "../button/button";
import Modal from "../modal/modal";
import IntrovertResult from "../introvert_result/IntrovertResult";
import IntrovertGraphen from "../introvert_graphen/IntrovertGraphen";
import SliderInput from "../slider_input/SliderInput";

function IntrovertPrediction() {
    const [formData, setFormData] = useState({
        time_spent_alone: 15,
        stage_fear: "No",
        social_event_attendance: 4,
        going_outside: 3,
        drained_after_socializing: "No",
        friends_circle_size: 8,
        post_frequency: 5
    });
    
    const [predictionResult, setPredictionResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    
    const [batchResults, setBatchResults] = useState([]);
    const [showBatchModal, setShowBatchModal] = useState(false);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => {
        setIsOpenModal(false);
        setPredictionResult(null);
    };

    const handleSliderChange = (field, e) => {
        const value = parseFloat(e.target.value);
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        if (error) setError(null);
    };

    const handleRadioChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const validateForm = () => {
        const required = ['time_spent_alone', 'social_event_attendance', 'going_outside', 'friends_circle_size', 'post_frequency'];
        for (let field of required) {
            if (formData[field] === undefined || formData[field] === null) {
                setError(`Bitte füllen Sie das Feld ${field} aus`);
                return false;
            }
        }
        return true;
    };

    const getPrediction = async () => {
        if (!validateForm()) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const payload = {
                time_spent_alone: parseFloat(formData.time_spent_alone),
                stage_fear: formData.stage_fear,
                social_event_attendance: parseFloat(formData.social_event_attendance),
                going_outside: parseFloat(formData.going_outside),
                drained_after_socializing: formData.drained_after_socializing,
                friends_circle_size: parseFloat(formData.friends_circle_size),
                post_frequency: parseFloat(formData.post_frequency)
            };
            
            const response = await axios.post(
                "http://localhost:8001/predict_introvert",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    timeout: 10000
                }
            );
            
            setPredictionResult(response.data);
            openModal();
        } catch (err) {
            console.error("Prediction error:", err);
            if (err.response) {
                setError(`Server Fehler: ${err.response.data.detail || err.response.statusText}`);
            } else if (err.request) {
                setError("Keine Verbindung zum Server. Bitte stellen Sie sicher, dass der Server läuft.");
            } else {
                setError(`Fehler: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const getBatchPrediction = async () => {
        setLoading(true);
        setError(null);
        
        const scenarios = [
            {
                ...formData,
                time_spent_alone: parseFloat(formData.time_spent_alone),
                social_event_attendance: parseFloat(formData.social_event_attendance),
                going_outside: parseFloat(formData.going_outside),
                friends_circle_size: parseFloat(formData.friends_circle_size),
                post_frequency: parseFloat(formData.post_frequency)
            },
            {
                ...formData,
                time_spent_alone: Math.min(parseFloat(formData.time_spent_alone) + 20, 168),
                social_event_attendance: Math.max(parseFloat(formData.social_event_attendance) - 2, 0),
            },
            {
                ...formData,
                going_outside: Math.min(parseFloat(formData.going_outside) + 5, 30),
                friends_circle_size: Math.min(parseFloat(formData.friends_circle_size) + 10, 100),
            }
        ];
        
        try {
            const response = await axios.post(
                "http://localhost:8001/predict_introvert_batch",
                { persons: scenarios },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            
            setBatchResults(response.data.predictions);
            setShowBatchModal(true);
        } catch (err) {
            console.error("Batch prediction error:", err);
            setError("Batch-Vorhersage fehlgeschlagen");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            time_spent_alone: 15,
            stage_fear: "No",
            social_event_attendance: 4,
            going_outside: 3,
            drained_after_socializing: "No",
            friends_circle_size: 8,
            post_frequency: 5
        });
        setError(null);
        setPredictionResult(null);
    };

    return (
        <div className="introvert-main">
            <div className="introvert-container">
                <div className="introvert-header">
                    <h1>🧠 Persönlichkeitsanalyse</h1>
                    <p>Entdecken Sie, ob Sie eher extrovertiert oder introvertiert sind</p>
                    <p className="header-hint">💡 Bewegen Sie die Slider, um Ihre Werte einzustellen</p>
                </div>

                <div className="introvert-form">
                    <SliderInput
                        id="time_spent_alone"
                        value={formData.time_spent_alone}
                        onChange={(e) => handleSliderChange("time_spent_alone", e)}
                        min={0}
                        max={168}
                        step={0.5}
                        title="⏰ Zeit alleine"
                        unit="Std./Woche"
                        hasTooltip={true}
                        toolTipText="Wie viele Stunden verbringen Sie durchschnittlich alleine pro Woche?"
                        icon="🏠"
                    />

                    <div className="form-field radio-field">
                        <label className="field-label">
                            🎤 Angst vor öffentlichen Auftritten?
                            <span className="tooltip-icon" title="Haben Sie Angst vor Präsentationen oder Auftritten vor Publikum?">ⓘ</span>
                        </label>
                        <div className="radio-group">
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="stage_fear"
                                    value="Yes"
                                    checked={formData.stage_fear === "Yes"}
                                    onChange={(e) => handleRadioChange("stage_fear", e.target.value)}
                                />
                                <span>Ja</span>
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="stage_fear"
                                    value="No"
                                    checked={formData.stage_fear === "No"}
                                    onChange={(e) => handleRadioChange("stage_fear", e.target.value)}
                                />
                                <span>Nein</span>
                            </label>
                        </div>
                    </div>

                    <SliderInput
                        id="social_event_attendance"
                        value={formData.social_event_attendance}
                        onChange={(e) => handleSliderChange("social_event_attendance", e)}
                        min={0}
                        max={50}
                        step={1}
                        title="🎉 Soziale Events"
                        unit="pro Monat"
                        hasTooltip={true}
                        toolTipText="Wie viele soziale Veranstaltungen besuchen Sie pro Monat?"
                        icon="🎪"
                    />

                    <SliderInput
                        id="going_outside"
                        value={formData.going_outside}
                        onChange={(e) => handleSliderChange("going_outside", e)}
                        min={0}
                        max={30}
                        step={0.5}
                        title="🚶 Rausgehen"
                        unit="pro Woche"
                        hasTooltip={true}
                        toolTipText="Wie oft gehen Sie pro Woche aus (Restaurants, Kino, Spaziergänge etc.)?"
                        icon="🌳"
                    />

                    <div className="form-field radio-field">
                        <label className="field-label">
                            😴 Fühlen Sie sich nach Sozialkontakten ausgelaugt?
                            <span className="tooltip-icon" title="Fühlen Sie sich nach längeren sozialen Interaktionen erschöpft?">ⓘ</span>
                        </label>
                        <div className="radio-group">
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="drained_after_socializing"
                                    value="Yes"
                                    checked={formData.drained_after_socializing === "Yes"}
                                    onChange={(e) => handleRadioChange("drained_after_socializing", e.target.value)}
                                />
                                <span>Ja</span>
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="drained_after_socializing"
                                    value="No"
                                    checked={formData.drained_after_socializing === "No"}
                                    onChange={(e) => handleRadioChange("drained_after_socializing", e.target.value)}
                                />
                                <span>Nein</span>
                            </label>
                        </div>
                    </div>

                    <SliderInput
                        id="friends_circle_size"
                        value={formData.friends_circle_size}
                        onChange={(e) => handleSliderChange("friends_circle_size", e)}
                        min={0}
                        max={100}
                        step={1}
                        title="👥 Freundeskreis"
                        unit="Personen"
                        hasTooltip={true}
                        toolTipText="Wie viele enge Freunde haben Sie?"
                        icon="👥"
                    />

                    <SliderInput
                        id="post_frequency"
                        value={formData.post_frequency}
                        onChange={(e) => handleSliderChange("post_frequency", e)}
                        min={0}
                        max={50}
                        step={1}
                        title="📱 Social Media Posts"
                        unit="pro Woche"
                        hasTooltip={true}
                        toolTipText="Wie oft posten Sie durchschnittlich pro Woche auf Social Media?"
                        icon="📱"
                    />

                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="button-group">
                        <Button
                            onClick={getPrediction}
                            disabled={loading}
                            outline={false}
                            text={loading ? "Analysiere..." : "🧠 Persönlichkeit analysieren"}
                        />
                        <Button
                            onClick={resetForm}
                            disabled={loading}
                            outline={true}
                            text={"🔄 Zurücksetzen"}
                        />
                        <Button
                            onClick={getBatchPrediction}
                            disabled={loading}
                            outline={true}
                            text={"📊 Vergleichsanalyse"}
                        />
                    </div>
                </div>

                <Modal 
                    isOpen={isOpenModal} 
                    onClose={closeModal} 
                    title={"Ihr Persönlichkeitsprofil"}
                >
                    {predictionResult && (
                        <IntrovertResult result={predictionResult} />
                    )}
                </Modal>

                <Modal
                    isOpen={showBatchModal}
                    onClose={() => setShowBatchModal(false)}
                    title={"Vergleichsanalyse"}
                >
                    <IntrovertGraphen results={batchResults} />
                </Modal>
            </div>
        </div>
    );
}

export default IntrovertPrediction;