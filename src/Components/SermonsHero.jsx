import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const SermonsHero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <HeroSection>
      <HeroOverlay />
      <Container>
        <HeroContent isVisible={isVisible}>
          <Breadcrumb>Home / Sermons</Breadcrumb>
          <HeroTitle>Sermons & Messages</HeroTitle>
          <HeroSubtitle>
            Discover life-changing messages from Pastor's heart to yours. 
            Each sermon is designed to encourage, challenge, and inspire your faith journey.
          </HeroSubtitle>
        </HeroContent>
      </Container>
    </HeroSection>
  )
}

// Styled Components
const HeroSection = styled.section`
  position: relative;
  height: 70vh;
  min-height: 500px;
  background: linear-gradient(
    135deg,
    var(--color-secondary-100) 0%,
    var(--color-primary-100) 50%,
    var(--color-accent-cream) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 80px;
  transition: var(--transition-theme);
  
  @media (max-width: 768px) {
    height: 60vh;
    min-height: 400px;
    margin-top: 70px;
  }
`

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="0.5" fill="%23d1d1cc" opacity="0.1"/><circle cx="75" cy="75" r="0.3" fill="%23d9ccb8" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  z-index: 1;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.md};
  }
`

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 1s ease-out;
`

const Breadcrumb = styled.nav`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  color: var(--text-muted);
  margin-bottom: ${theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 1px;
`

const HeroTitle = styled.h1`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['6xl']};
  font-weight: ${theme.typography.weights.light};
  color: var(--text-primary);
  margin-bottom: ${theme.spacing.lg};
  line-height: ${theme.typography.lineHeights.tight};
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.sizes['4xl']};
  }
  
  @media (max-width: 480px) {
    font-size: ${theme.typography.sizes['3xl']};
  }
`

const HeroSubtitle = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.normal};
  color: var(--text-secondary);
  line-height: ${theme.typography.lineHeights.relaxed};
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.sizes.lg};
  }
  
  @media (max-width: 480px) {
    font-size: ${theme.typography.sizes.base};
  }
`

export default SermonsHero