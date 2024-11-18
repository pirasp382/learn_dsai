import Salary_Prediciton from "./components/salary_prediction/salary_prediction";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import "./App.css"
import Home from "./components/Home/home";

function App() {

    return <div>
        {
        <BrowserRouter>
            <div>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/salary"} element={<Salary_Prediciton/>}/>
                </Routes>
            </div>
        </BrowserRouter>
        }
    </div>
}

export default App;