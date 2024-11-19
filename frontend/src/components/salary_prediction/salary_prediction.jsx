import Salary_Graphen from "../salary_graphen/salary_graphen";
import {useState} from "react";
import job_title from "../../data/jobs";
import educationLevel from "../../data/education";
import genderList from "../../data/gender";
import "./salary_prediction.css";
import Searchable_Dropdown from "../searchable_dropdown/searchable_dropdown";
import Number_Input from "../number_input/number_input";
import Button from "../button/button";
import Number_Output from "../number_output/number_output";
import Modal from "../modal/modal";

function Salary_Prediciton() {
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
        const input = {age, gender, education, jobTitle, experience};
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
            .catch(error => document.getElementById("output_label").innerText = "Fehler bei der Berechnung");
    }

    function getPrognose() {
        const input = {age, gender, education, jobTitle, experience};
        fetch("http://localhost:8000/pension_prediction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        })
            .then(response => response.json())
            .then(data => data["prognose"])
            .then(data => setPrognose(new Map(Object.entries(data))))
            .catch(error => console.log(error));
    }

    return (
        <div className={"main"}>
            <div id={"salary"}>
                <div id={"input_form"}>
                    <div id={"age_input"}>
                        <Number_Input value={age} onChange={(e) => setAge(e.target.value)}
                                      placehoder={"age"} min={"18"} title={"Age"}/>
                    </div>
                    <div id={"experience_input"}>
                        <Number_Input value={experience}
                                      onChange={(e) => setExperience(e.target.value)}
                                      placehoder={"Job experience"} min={"0"}
                                      title={"Job Experience"}/>
                    </div>
                    <div id={"gender_input"}>
                        <Searchable_Dropdown
                            options={genderList}
                            label={"name"}
                            id={"id"}
                            selectedVal={gender}
                            handleChange={(val) => setGender(val)}
                            placeholder={"select your gender"}
                            title={"Gender"}/>
                    </div>
                    <div id={"education_input"}>
                        <Searchable_Dropdown
                            options={educationLevel}
                            label={"name"}
                            id={"id"}
                            selectedVal={education}
                            handleChange={(val) => setEducation((val))}
                            placeholder={"Select your Education level"}
                            title={"Education level"}/>
                    </div>
                    <div id={"job_input"}>
                        <Searchable_Dropdown
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
                    <Number_Output title={"Salary Prediction"} value={salaryPrediction}/>
                    <Salary_Graphen dataPrognose={prognose}/>
                </Modal>


            </div>

        </div>
    );
}

export default Salary_Prediciton;