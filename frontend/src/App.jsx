import Prediction from "./components/salary_prediction/prediction";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css"
import Home from "./components/Home/Home";

function App() {

    return <div>
        <BrowserRouter>
            <div>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/salary"} element={<Prediction/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    </div>
}

export default App;