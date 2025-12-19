import { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const WelcomeModal = ({ isVisible, onClose }) => {
  const [confetti] = useState(() => {
    // Generate confetti particles on initial render
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)]
    }))
  })

  if (!isVisible) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* Confetti Animation */}
        {confetti.map(particle => (
          <ConfettiPiece
            key={particle.id}
            left={particle.left}
            delay={particle.delay}
            color={particle.color}
          />
        ))}
        
        {/* Celebration Icons */}
        <CelebrationIcon delay="0.2s" position="top-left">🎉</CelebrationIcon>
        <CelebrationIcon delay="0.4s" position="top-right">🎊</CelebrationIcon>
        <CelebrationIcon delay="0.6s" position="bottom-left">✨</CelebrationIcon>
        <CelebrationIcon delay="0.8s" position="bottom-right">🙌</CelebrationIcon>
        
        {/* Close Button */}
        <CloseButton onClick={onClose}>×</CloseButton>
        
        {/* Main Content */}
        <WelcomeContent>
          <WelcomeIcon>⛪</WelcomeIcon>
          <WelcomeTitle>
            We are finally happy to welcome you to church!
          </WelcomeTitle>
          <WelcomeSubtitle>
            Experience the Divine Touch in our loving community
          </WelcomeSubtitle>
          <HeartIcon>💖</HeartIcon>
        </WelcomeContent>
        
        {/* Animated Border */}
        <AnimatedBorder />
      </ModalContainer>
    </ModalOverlay>
  )
}

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const confettiFall = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
`

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`

const borderAnimation = keyframes`
  0% {
    border-color: #FFD700;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  25% {
    border-color: #FF6B6B;
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
  }
  50% {
    border-color: #4ECDC4;
    box-shadow: 0 0 20px rgba(78, 205, 196, 0.5);
  }
  75% {
    border-color: #45B7D1;
    box-shadow: 0 0 20px rgba(69, 183, 209, 0.5);
  }
  100% {
    border-color: #FFD700;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
`

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.5s ease-out;
`

const ModalContainer = styled.div`
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;
  border: 3px solid #FFD700;
`

const AnimatedBorder = styled.div`
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 20px;
  border: 3px solid transparent;
  animation: ${borderAnimation} 2s infinite;
  pointer-events: none;
`

const ConfettiPiece = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
  left: ${props => props.left}%;
  animation: ${confettiFall} 3s linear infinite;
  animation-delay: ${props => props.delay}s;
  border-radius: 2px;
`

const CelebrationIcon = styled.div`
  position: absolute;
  font-size: 2rem;
  animation: ${bounce} 2s infinite;
  animation-delay: ${props => props.delay};
  
  ${props => {
    switch(props.position) {
      case 'top-left':
        return 'top: 10px; left: 10px;'
      case 'top-right':
        return 'top: 10px; right: 10px;'
      case 'bottom-left':
        return 'bottom: 10px; left: 10px;'
      case 'bottom-right':
        return 'bottom: 10px; right: 10px;'
      default:
        return ''
    }
  }}
`

const WelcomeContent = styled.div`
  position: relative;
  z-index: 2;
`

const WelcomeIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: ${pulse} 2s infinite;
`

const WelcomeTitle = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.3;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const WelcomeSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const HeartIcon = styled.div`
  font-size: 2rem;
  animation: ${pulse} 1.5s infinite;
`

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 3;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`

export default WelcomeModal