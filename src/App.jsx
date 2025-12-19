import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AboutPage from "./Pages/AboutPage";
import GivePage from "./Pages/GivePage";
import Visit from "./Pages/Visit";

function App() {


  return (
    <>
    <Header />
    
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="give" element={<GivePage />} />
      <Route path="visit" element={<Visit />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
