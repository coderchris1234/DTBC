import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AboutPage from "./Pages/AboutPage";
import GivePage from "./Pages/GivePage";
import Visit from "./Pages/Visit";
import ContactPage from "./Pages/ContactPage";
import ErrorBoundary from "./Components/ErrorBoundary";
import ScrollToTop from "./Components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Header />
        <ScrollToTop />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="give" element={<GivePage />} />
          <Route path="visit" element={<Visit />} />
          <Route path="contact" element={<ContactPage />} />
        </Routes>
        
        <Footer />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
