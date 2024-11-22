import {useState} from "react";
import job_title from "../../data/jobs";
import educationLevel from "../../data/education";
import genderList from "../../data/gender";
import "./salary_prediction.css";
import SearchableDropdown from "../searchable_dropdown/searchable_dropdown";
import NumberInput from "../number_input/number_input";
import Button from "../button/button";
import NumberOutput from "../number_output/number_output";
import Modal from "../modal/modal";
import SalaryGraphen from "../salary_graphen/salary_graphen";


function SalaryPrediciton() {
    const [prognose, setPrognose] = useState(new Map());
    const [age, setAge] = useState("18");
    const [gender, setGender] = useState("male");
    const [education, setEducation] = useState(educationLevel[0]["name"]);
    const [jobTitle, setJobTitle] = useState(job_title[0]["name"]);
    const [experience, setExperience] = useState("0");
    const [salaryPrediction, setSalaryPrediction] = useState("");
    const [isopenModal, setIsOpenModal] = useState(false);

    const openModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

    function getPrediction() {
        const input = {age, gender, education, "job_title": jobTitle, experience};
        fetch("http://localhost:8000/prediction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        })
            .then(response => response.json())
            .then(data => data["salary"])
            .then(data => {
                setSalaryPrediction(data + "$")
                openModal()
            })
            .catch(() => document.getElementById("output_label").innerText = "Fehler bei der Berechnung");
    }

    function getPrognose() {
        const input = {age, gender, education, "job_title": jobTitle, experience};
        fetch("http://localhost:8000/pension_prediction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        })
            .then(response => response.json())
            .then(data => data["prognose"])
            .then(data => {
                setPrognose(new Map(Object.entries(data)));
                openModal();
            })
            .catch(error => console.log(error));
    }

    return (
        <div className={"main"}>
            <div id={"salary"}>
                <div id={"input_form"}>
                    <div id={"age_input"}>
                        <NumberInput id={"age"} value={age} onChange={(e) => setAge(e.target.value)}
                                     placeholder={"age"} min={"18"} title={"Age"}/>
                    </div>
                    <div id={"experience_input"}>
                        <NumberInput value={experience}
                                     id={"experience"}
                                      onChange={(e) => setExperience(e.target.value)}
                                      placeholder={"Job experience"} min={"0"}
                                      title={"Job Experience"}
                        hasTooltip={true}
                        toolTipText={"Job Experience in Years"}/>
                    </div>
                    <div id={"gender_input"}>
                        <SearchableDropdown
                            options={genderList}
                            label={"name"}
                            id={"id"}
                            selectedVal={gender}
                            handleChange={(val) => setGender(val)}
                            placeholder={"select your gender"}
                            title={"Gender"}/>
                    </div>
                    <div id={"education_input"}>
                        <SearchableDropdown
                            options={educationLevel}
                            label={"name"}
                            id={"id"}
                            selectedVal={education}
                            handleChange={(val) => setEducation((val))}
                            placeholder={"Select your Education level"}
                            title={"Education level"}/>
                    </div>
                    <div id={"job_input"}>
                        <SearchableDropdown
                            options={job_title}
                            label="name"
                            id="id"
                            selectedVal={jobTitle}
                            handleChange={(val) => setJobTitle(val)}
                            placeholder={"Select your Job"}
                            title={"Job Title"}/>
                    </div>
                    <div className={"button_analyse"}>
                        <Button onClick={() => getPrediction()} disabled={false}
                                outline={true} text={"Analyse"}/>
                    </div>
                    <div className={"button_prognose"}>
                        <Button onClick={() => getPrognose()} disabled={false}
                                outline={true} text={"Retirement Prognose"}/>
                    </div>
                </div>
                <Modal isOpen={isopenModal} onClose={closeModal} title={"Salary prediction"}>
                    <NumberOutput title={"Salary Prediction"} value={salaryPrediction}/>
                    <SalaryGraphen dataPrognose={prognose}/>
                </Modal>


            </div>

        </div>
    );
}

export default SalaryPrediciton;