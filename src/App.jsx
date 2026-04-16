import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AboutPage from "./Pages/AboutPage";
import SermonsPage from "./Pages/SermonsPage";
import GivePage from "./Pages/GivePage";
import Visit from "./Pages/Visit";
import ContactPage from "./Pages/ContactPage";
import BookmarksPage from "./Pages/BookmarksPage";
import NotFound from "./Pages/NotFound";
import ErrorBoundary from "./Components/ErrorBoundary";
import ScrollToTop from "./Components/ScrollToTop";
import Analytics from "./Components/Analytics";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Header />
        <ScrollToTop />
        <Analytics />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sermons" element={<SermonsPage />} />
          <Route path="/give" element={<GivePage />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Footer />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
