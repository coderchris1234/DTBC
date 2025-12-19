import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AboutPage from "./Pages/AboutPage";
import GivePage from "./Pages/GivePage";
import Visit from "./Pages/Visit";
import ContactPage from "./Pages/ContactPage";
import ErrorBoundary from "./Components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Header />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="give" element={<GivePage />} />
        <Route path="visit" element={<Visit />} />
        <Route path="contact" element={<ContactPage />} />
      </Routes>
      
      <Footer />
    </ErrorBoundary>
  )
}

export default App
