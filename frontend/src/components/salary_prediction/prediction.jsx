function Prediction() {

    const educationLevel = ["Bachelor's Degree", "Master's Degree", "PhD", "Bachelor's",
        "High School", "Master's", "phD"]
    const job_title = ["Software Engineer",
        "Data Scientist",
        "Software Engineer Manager",
        "Data Analyst",
        "Senior Project Engineer",
        "Product Manager",
        "Full Stack Engineer",
        "Marketing Manager",
        "Senior Software Engineer",
        "Back end Developer",
        "Front end Developer",
        "Marketing Coordinator",
        "Junior Sales Associate",
        "Financial Manager",
        "Marketing Analyst",
        "Software Developer",
        "Operations Manager",
        "Human Resources Manager",
        "Director of Marketing",
        "Web Developer",
        "Product Designer",
        "Research Director",
        "Content Marketing Manager",
        "Sales Associate",
        "Director of HR",
        "Senior Product Marketing Manager",
        "Research Scientist",
        "Marketing Director",
        "Sales Director",
        "Senior Data Scientist",
        "Junior HR Generalist",
        "Junior Software Developer",
        "Director of Data Science",
        "Receptionist",
        "Sales Manager",
        "Digital Marketing Manager",
        "Junior Marketing Manager",
        "Junior Software Engineer",
        "Senior Research Scientist",
        "Human Resources Coordinator",
        "Senior Human Resources Manager",
        "Junior Web Developer",
        "Senior HR Generalist",
        "Junior Sales Representative",
        "Financial Analyst",
        "Sales Representative",
        "Sales Executive",
        "Front End Developer",
        "Junior HR Coordinator",
        "Junior Data Analyst",
        "Project Manager",
        "Graphic Designer",
        "Digital Marketing Specialist",
        "Social Media Manager",
        "Director of Operations",
        "Senior Business Analyst",
        "Senior Marketing Analyst",
        "Senior Marketing Manager",
        "Junior Business Analyst",
        "Senior Financial Analyst",
        "Senior Project Manager",
        "Junior Financial Analyst",
        "Junior Business Development Associate",
        "Senior Product Manager",
        "Customer Service Representative",
        "Junior Marketing Coordinator",
        "Senior Project Coordinator",
        "Senior Operations Manager",
        "Junior Operations Analyst",
        "Senior Financial Manager",
        "Delivery Driver",
        "Junior Project Manager",
        "Senior Product Designer",
        "Junior Marketing Specialist",
        "Senior Operations Coordinator",
        "Senior Data Engineer",
        "Senior Business Development Manager",
        "Senior Marketing Specialist",
        "Junior Product Manager",
        "Senior Scientist",
        "Junior Accountant",
        "Junior Marketing Analyst",
        "Senior UX Designer",
        "Junior Operations Manager",
        "Juniour HR Generalist",
        "Juniour HR Coordinator",
        "Senior Marketing Coordinator",
        "Senior Financial Advisor",
        "Senior Data Analyst",
        "Senior HR Manager",
        "Senior Software Developer",
        "Director of Finance",
        "Senior IT Consultant",
        "Junior Business Operations Analyst",
        "Senior Sales Representative",
        "Event Coordinator",
        "Customer Service Manager",
        "HR Manager",
        "Senior Manager",
        "Senior Engineer",
        "Recruiter",
        "Director of Engineering",
        "Senior Sales Manager",
        "Director of Human Resources",
        "Senior Operations Analyst",
        "Business Analyst",
        "Administrative Assistant",
        "Senior Accountant",
        "HR Generalist",
        "Junior Account Manager",
        "Operations Director",
        "Customer Success Rep",
        "UX Designer",
        "VP of Operations",
        "IT Support",
        "Social Media Specialist",
        "Software Manager",
        "Senior Consultant",
        "Director",
        "Customer Service Rep",
        "Data Entry Clerk",
        "CEO",
        "Junior Developer",
        "Accountant",
        "Network Engineer",
        "Copywriter",
        "Strategy Consultant",
        "Account Manager",
        "Help Desk Analyst",
        "Business Development Manager",
        "IT Manager",
        "VP of Finance",
        "UX Researcher",
        "Business Intelligence Analyst",
        "Project Engineer",
        "Technical Writer",
        "Marketing Specialist",
        "Principal Engineer",
        "Chief Data Officer",
        "Digital Content Producer",
        "IT Support Specialist",
        "Chief Technology Officer",
        "Senior Training Specialist",
        "Sales Operations Manager",
        "Junior Web Designer",
        "Training Specialist",
        "Supply Chain Manager",
        "Principal Scientist",
        "Junior Designer",
        "Financial Advisor",
        "Creative Director",
        "Operations Analyst",
        "Public Relations Manager",
        "Product Marketing Manager",
        "Senior Graphic Designer",
        "Software Project Manager",
        "Supply Chain Analyst",
        "Customer Success Manager",
        "Technical Recruiter",
        "Human Resources Director",
        "Technical Support Specialist",
        "Junior Customer Support Specialist",
        "Senior IT Support Specialist",
        "Director of Sales",
        "Junior Recruiter",
        "Office Manager",
        "Senior Marketing Director",
        "Junior Social Media Manager",
        "Senior Human Resources Specialist",
        "Director of Sales and Marketing",
        "Senior Quality Assurance Analyst",
        "Senior IT Project Manager",
        "Junior Copywriter",
        "Senior Researcher",
        "Senior Account Manager",
        "Junior Data Scientist",
        "Senior Human Resources Coordinator",
        "Director of Product Management",
        "Director of Human Capital",
        "Junior Advertising Coordinator",
        "Junior UX Designer",
        "Senior Account Executive",
        "Director of Business Development",
        "Senior HR Specialist",
        "Senior Product Development Manager",
        "Junior Operations Coordinator",
        "Junior Financial Advisor",
        "Junior Research Scientist",
        "Junior Social Media Specialist",
        "Senior Software Architect",
        "Developer",
        "Social M",
        "Social Media Man",
    ]

    function getPrediction() {
        let input={}
        input.age=document.getElementById("alter_input").value
        input.gender=document.getElementById("gender_input").value
        input.education=document.getElementById("education_input").value
        input.job_title=document.getElementById("job_input").value
        input.experience=document.getElementById("experience_input").value
        fetch("http://localhost:8000/prediction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        }).then(response=>response.json())
            .then(data=>JSON.parse(data))
            .then(data=>data["salary_prediction"])
            .then(data=>{
                document.getElementById("output_label").innerText=Math.round(data*100)/100+"$"}
            )
    }

    return (
        <div>
            <div id={"input_form"}>
                <div id={"alter"}>
                    <h3>Alter</h3>
                    <input id={"alter_input"} type={"number"} min={"18"} defaultValue={"18"}/>
                </div>
                <div id={"geschlecht"}>
                    <h3>Geschlecht</h3>
                    <select id={"gender_input"} defaultValue={"male"}>
                        <option value={"male"}>Männlich</option>
                        <option value={"female"}>Weiblich</option>
                        <option value={"other"}>Divers</option>
                    </select>
                </div>
                <div id={"bildungsniveau"}>
                    <h3>Bildungsniveau</h3>
                    <select id={"education_input"}>
                        {educationLevel.map(item => <option
                            value={item}>{item}</option>)}
                    </select>
                </div>
                <div id={"job_title"}>
                    <h3>Job Title</h3>
                    <select id={"job_input"}>
                        {job_title.map(item => <option
                            value={item}>{item}</option>)}
                    </select>
                </div>
                <div id={"berufserfahrung"}>
                    <h3>Berufserfahrung</h3>
                    <input id={"experience_input"} type={"number"}/>
                </div>
                <div>
                    <button onClick={()=>{getPrediction()}}>Analyse</button>
                </div>
            </div>
            <div id={"output"}>
                <h3>Gehaltsvorhersage:</h3>
                <h3 id={"output_label"}></h3>
            </div>
        </div>
    );
}

export default Prediction;
