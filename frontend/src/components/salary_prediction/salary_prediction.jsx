import { useState, useEffect } from "react";
import axios from "axios";
import job_title from "../../data/jobs";
import educationLevel from "../../data/education";
import genderList from "../../data/gender";
import "./salary_prediction.css";
import SearchableDropdown from "../searchable_dropdown/searchable_dropdown";
import SliderInput from "../slider_input/SliderInput";
import Button from "../button/button";
import NumberOutput from "../number_output/number_output";
import Modal from "../modal/modal";
import SalaryGraphen from "../salary_graphen/salary_graphen";

function SalaryPrediction() {
    const [prognose, setPrognose] = useState(new Map());
    const [age, setAge] = useState(30);
    const [gender, setGender] = useState("male");
    const [education, setEducation] = useState(educationLevel[0]?.name || "");
    const [jobTitle, setJobTitle] = useState(job_title[0]?.name || "");
    const [experience, setExperience] = useState(5);
    const [salaryPrediction, setSalaryPrediction] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => {
        setIsOpenModal(false);
        setPrognose(new Map());
        setSalaryPrediction("");
    };

    const validateInputs = () => {
        if (!age || age < 18 || age > 100) {
            setError("Bitte geben Sie ein gültiges Alter ein (18-100)");
            return false;
        }
        if (!experience || experience < 0 || experience > 50) {
            setError("Bitte geben Sie eine gültige Berufserfahrung ein (0-50)");
            return false;
        }
        if (!gender) {
            setError("Bitte wählen Sie Ihr Geschlecht");
            return false;
        }
        if (!education) {
            setError("Bitte wählen Sie Ihren Bildungsabschluss");
            return false;
        }
        if (!jobTitle) {
            setError("Bitte wählen Sie Ihre Berufsbezeichnung");
            return false;
        }
        setError(null);
        return true;
    };

    const getPrediction = async () => {
        if (!validateInputs()) return;
        
        setLoading(true);
        setError(null);
        
        const input = {
            age: age.toString(),
            gender: gender,
            education: education,
            job_title: jobTitle,
            experience: experience.toString()
        };
        
        try {
            const response = await axios.post(
                "http://localhost:8001/prediction",
                input,
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 10000
                }
            );
            
            const salary = response.data.salary;
            setSalaryPrediction(`${salary.toLocaleString()} €`);
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

    const getPrognose = async () => {
        if (!validateInputs()) return;
        
        setLoading(true);
        setError(null);
        
        const input = {
            age: age.toString(),
            gender: gender,
            education: education,
            job_title: jobTitle,
            experience: experience.toString()
        };
        
        try {
            const response = await axios.post(
                "http://localhost:8001/pension_prediction",
                input,
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 10000
                }
            );
            
            const prognoseData = response.data.prognose;
            setPrognose(new Map(Object.entries(prognoseData)));
            openModal();
        } catch (err) {
            console.error("Prognose error:", err);
            setError("Fehler bei der Rentenprognose");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setAge(30);
        setGender("male");
        setEducation(educationLevel[0]?.name || "");
        setJobTitle(job_title[0]?.name || "");
        setExperience(5);
        setError(null);
    };

    return (
        <div className="salary-container">
            <div className="salary-card">
                <div className="salary-header">
                    <h1>💰 Gehaltsvorhersage</h1>
                    <p>Prädizieren Sie Ihr Gehalt basierend auf Ihren persönlichen Daten</p>
                </div>

                <div className="salary-form">
                    <SliderInput
                        id="age"
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value))}
                        min={18}
                        max={100}
                        step={1}
                        title="Alter"
                        unit="Jahre"
                        hasTooltip={true}
                        toolTipText="Ihr aktuelles Alter in Jahren"
                        icon="🎂"
                    />

                    <SliderInput
                        id="experience"
                        value={experience}
                        onChange={(e) => setExperience(parseFloat(e.target.value))}
                        min={0}
                        max={50}
                        step={0.5}
                        title="Berufserfahrung"
                        unit="Jahre"
                        hasTooltip={true}
                        toolTipText="Ihre gesamte Berufserfahrung in Jahren"
                        icon="💼"
                    />

                    <div className="form-field">
                        <label className="field-label">
                            <span className="field-icon">👤</span>
                            Geschlecht
                        </label>
                        <SearchableDropdown
                            options={genderList}
                            label={"name"}
                            id={"id"}
                            selectedVal={gender}
                            handleChange={(val) => setGender(val)}
                            placeholder="Wählen Sie Ihr Geschlecht"
                            title="Gender"
                        />
                    </div>

                    <div className="form-field">
                        <label className="field-label">
                            <span className="field-icon">🎓</span>
                            Bildungsabschluss
                        </label>
                        <SearchableDropdown
                            options={educationLevel}
                            label={"name"}
                            id={"id"}
                            selectedVal={education}
                            handleChange={(val) => setEducation(val)}
                            placeholder="Wählen Sie Ihren Bildungsabschluss"
                            title="Education level"
                        />
                    </div>

                    <div className="form-field">
                        <label className="field-label">
                            <span className="field-icon">💻</span>
                            Berufsbezeichnung
                        </label>
                        <SearchableDropdown
                            options={job_title}
                            label="name"
                            id="id"
                            selectedVal={jobTitle}
                            handleChange={(val) => setJobTitle(val)}
                            placeholder="Wählen Sie Ihre Berufsbezeichnung"
                            title="Job Title"
                        />
                    </div>

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
                            text={loading ? "Berechne..." : "💰 Gehalt analysieren"}
                            icon="💰"
                        />
                        <Button
                            onClick={getPrognose}
                            disabled={loading}
                            outline={true}
                            text={loading ? "Berechne..." : "📈 Rentenprognose"}
                            icon="📈"
                        />
                        <Button
                            onClick={resetForm}
                            disabled={loading}
                            outline={true}
                            text={"🔄 Zurücksetzen"}
                            icon="🔄"
                        />
                    </div>
                </div>

                    <Modal 
                        isOpen={isOpenModal} 
                        onClose={closeModal} 
                        title="📊 Detaillierte Gehaltsanalyse"
                        size="full"
                    >
                        {salaryPrediction && (
                            <NumberOutput 
                                title="Vorhergesagtes Jahresgehalt" 
                                value={salaryPrediction}
                                subtitle="Basierend auf Ihren Angaben"
                            />
                        )}
                        {prognose.size > 0 && (
                            <SalaryGraphen dataPrognose={prognose} />
                        )}
                    </Modal>
            </div>
        </div>
    );
}

export default SalaryPrediction;