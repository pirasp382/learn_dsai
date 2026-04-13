import SalaryPrediciton from "./components/salary_prediction/salary_prediction";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import "./App.css";
import Home from "./components/Home/home";
import IntrovertPrediction from "./components/introvert_prediction/IntrovertPrediction";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/salary" element={<SalaryPrediciton />} />
                        <Route path="/introvert" element={<IntrovertPrediction />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;