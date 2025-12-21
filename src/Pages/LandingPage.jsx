import { useState, useEffect } from 'react'
import Hero from '../Components/Hero'
import WelcomeSection from '../Components/WelcomeSection'
import VisionSection from '../Components/VisionSection'
import Hope from '../Components/Hope'
import WelcomeModal from '../Components/WelcomeModal'
import DailyVerse from '../Components/DailyVerse'
import VisitorCounter from '../Components/VisitorCounter'
import FloatingPrayerButton from '../Components/FloatingPrayerButton'

const LandingPage = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(() => {
    // Check if user has visited before on initial render
    const hasVisited = localStorage.getItem('dtbc-visited')
    return !hasVisited
  })

  useEffect(() => {
    if (showWelcomeModal) {
      // Auto-hide modal after 5 seconds
      const timer = setTimeout(() => {
        setShowWelcomeModal(false)
        localStorage.setItem('dtbc-visited', 'true')
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [showWelcomeModal])

  const handleCloseModal = () => {
    setShowWelcomeModal(false)
    localStorage.setItem('dtbc-visited', 'true')
  }

  return (
    <>
      <WelcomeModal 
        isVisible={showWelcomeModal} 
        onClose={handleCloseModal}
      />
      <Hero/>
      <WelcomeSection />
      <DailyVerse />
      <VisionSection />
      <Hope />
      <VisitorCounter />
      <FloatingPrayerButton />
    </>
  )
}

export default LandingPage