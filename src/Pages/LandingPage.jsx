import { useState, useEffect } from 'react'
import Hero from '../Components/Hero'
import Service from '../Components/Service'
import Purpose from '../Components/Purpose'
import Hope from '../Components/Hope'
import Sermons from '../Components/Sermons'
import WelcomeModal from '../Components/WelcomeModal'

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
      <Service />
      <Purpose />
      <Hope />
      <Sermons />
    </>
  )
}

export default LandingPage