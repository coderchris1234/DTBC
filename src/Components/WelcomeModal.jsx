import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'

const WelcomeModal = ({ isVisible, onClose }) => {
  const [confetti] = useState(() => {
    // Generate confetti particles on initial render
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: ['#d4af37', '#c7b299', '#b0c0b0'][Math.floor(Math.random() * 3)]
    }))
  })

  if (!isVisible) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* Subtle confetti animation */}
        {confetti.map(particle => (
          <ConfettiPiece
            key={particle.id}
            left={particle.left}
            delay={particle.delay}
            color={particle.color}
          />
        ))}
        
        {/* Close Button */}
        <CloseButton onClick={onClose}>×</CloseButton>
        
        {/* Main Content */}
        <WelcomeContent>
          <WelcomeIcon>🕊️</WelcomeIcon>
          <WelcomeTitle>
            Welcome to Our Church Family
          </WelcomeTitle>
          <WelcomeSubtitle>
            We're blessed to have you join us in worship and fellowship
          </WelcomeSubtitle>
          <Blessing>May God's peace be with you</Blessing>
        </WelcomeContent>
      </ModalContainer>
    </ModalOverlay>
  )
}

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const confettiFall = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(100vh) rotate(180deg);
    opacity: 0;
  }
`

const gentlePulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(44, 44, 39, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.5s ease-out;
`

const ModalContainer = styled.div`
  position: relative;
  background: var(--bg-primary);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  max-width: 500px;
  width: 90%;
  text-align: center;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;
  box-shadow: ${theme.shadows.large};
  border: 1px solid var(--border-color);
`

const ConfettiPiece = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: ${props => props.color};
  left: ${props => props.left}%;
  animation: ${confettiFall} 4s linear infinite;
  animation-delay: ${props => props.delay}s;
  border-radius: ${theme.borderRadius.sm};
  opacity: 0.7;
`

const WelcomeContent = styled.div`
  position: relative;
  z-index: 2;
`

const WelcomeIcon = styled.div`
  font-size: ${theme.typography.sizes['5xl']};
  margin-bottom: ${theme.spacing.lg};
  animation: ${gentlePulse} 3s infinite;
`

const WelcomeTitle = styled.h1`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['3xl']};
  font-weight: ${theme.typography.weights.light};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  line-height: ${theme.typography.lineHeights.tight};
  
  @media (max-width: 480px) {
    font-size: ${theme.typography.sizes['2xl']};
  }
`

const WelcomeSubtitle = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.lg};
  line-height: ${theme.typography.lineHeights.relaxed};
  
  @media (max-width: 480px) {
    font-size: ${theme.typography.sizes.base};
  }
`

const Blessing = styled.div`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  font-style: italic;
  color: ${theme.colors.primary[600]};
  margin-top: ${theme.spacing.lg};
`

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.neutral[100]};
  border: none;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.sizes['2xl']};
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 3;
  
  &:hover {
    background: ${theme.colors.neutral[200]};
    color: ${theme.colors.text.primary};
  }
  
  &:active {
    transform: scale(0.95);
  }
`

export default WelcomeModal