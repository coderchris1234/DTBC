import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { theme } from '../styles/theme'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const handlePlanVisit = () => {
    navigate('/visit')
  }

  return (
    <HeroSection>
      <HeroOverlay />
      <Container>
        <HeroContent isVisible={isVisible}>
          <WelcomeText>Welcome to</WelcomeText>
          <HeroTitle>Divine Touch Bible Church USA Inc</HeroTitle>
          <HeroSubtitle>
            A blessed Ministry located in NJ, USA to raise end-time believers to access the wonders of God through the practical teaching of the word of God and prayers.
          </HeroSubtitle>
          <ButtonContainer>
            <PrimaryButton onClick={handlePlanVisit}>
              Plan Your Visit
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate('/about')}>
              Learn More
            </SecondaryButton>
          </ButtonContainer>
          <ScrollIndicator>
            <ScrollText>Discover More</ScrollText>
            <ScrollArrow>↓</ScrollArrow>
          </ScrollIndicator>
        </HeroContent>
      </Container>
    </HeroSection>
  )
}

// Styled Components
const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 600px;
  background: linear-gradient(
    135deg,
    var(--color-neutral-100) 0%,
    var(--color-primary-50) 50%,
    var(--color-secondary-50) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: var(--transition-theme);
  
  @media (max-width: 768px) {
    min-height: 600px;
    padding-top: 70px;
    height: auto;
    min-height: calc(100vh - 70px);
  }
  
  @media (max-width: 480px) {
    min-height: calc(100vh - 70px);
    padding: 70px 0 ${theme.spacing.xl};
  }
`

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="0.5" fill="%23b8b8b0" opacity="0.1"/><circle cx="75" cy="75" r="0.3" fill="%23d9ccb8" opacity="0.1"/><circle cx="50" cy="10" r="0.4" fill="%23c8d4c8" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  z-index: 1;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  position: relative;
  z-index: 2;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: 0 ${theme.spacing.sm};
  }
`

const HeroContent = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} 0;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 1s ease-out;
  position: relative;
  z-index: 3;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: ${theme.spacing.md} 0;
  }
`

const WelcomeText = styled.p`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-secondary, #64748b);
  margin-bottom: ${theme.spacing.md};
  letter-spacing: 2px;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.sizes.base};
    letter-spacing: 1px;
    margin-bottom: ${theme.spacing.sm};
  }
  
  @media (max-width: 480px) {
    font-size: ${theme.typography.sizes.sm};
    letter-spacing: 0.5px;
  }
`

const HeroTitle = styled.h1`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['6xl']};
  font-weight: ${theme.typography.weights.light};
  color: var(--text-primary);
  margin-bottom: ${theme.spacing.lg};
  line-height: ${theme.typography.lineHeights.tight};
  word-wrap: break-word;
  hyphens: auto;
  
  @media (max-width: 1024px) {
    font-size: ${theme.typography.sizes['5xl']};
  }
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.sizes['4xl']};
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    font-size: ${theme.typography.sizes['3xl']};
    line-height: 1.1;
  }
  
  @media (max-width: 360px) {
    font-size: ${theme.typography.sizes['2xl']};
  }
`

const HeroSubtitle = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.normal};
  color: var(--text-secondary);
  line-height: ${theme.typography.lineHeights.relaxed};
  max-width: 700px;
  margin: 0 auto ${theme.spacing['3xl']};
  word-wrap: break-word;
  hyphens: auto;
  
  @media (max-width: 1024px) {
    font-size: ${theme.typography.sizes.lg};
    max-width: 600px;
  }
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.sizes.base};
    margin-bottom: ${theme.spacing['2xl']};
    max-width: 500px;
  }
  
  @media (max-width: 480px) {
    font-size: ${theme.typography.sizes.sm};
    max-width: 100%;
    margin-bottom: ${theme.spacing.xl};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  align-items: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`

const PrimaryButton = styled.button`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-inverse);
  background: var(--color-primary-600);
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: var(--transition-theme);
  box-shadow: ${theme.shadows.soft};
  
  &:hover {
    background: var(--color-primary-700);
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
  }
`

const SecondaryButton = styled.button`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: var(--color-primary-600);
  background: transparent;
  border: 2px solid var(--color-primary-300);
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: var(--transition-theme);
  
  &:hover {
    background: var(--color-primary-50);
    border-color: var(--color-primary-400);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
  }
`

const ScrollIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.xl};
  
  @media (max-width: 768px) {
    margin-top: ${theme.spacing.lg};
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`

const ScrollText = styled.span`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  color: var(--text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
`

const ScrollArrow = styled.div`
  font-size: ${theme.typography.sizes.lg};
  color: var(--text-muted);
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`

export default Hero