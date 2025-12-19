import styled from 'styled-components'

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <HeroTitle>Experience THE DIVINE TOUCH</HeroTitle>
        <HeroSubtitle>A Life-Giving Church in DTBC</HeroSubtitle>
        <PlanVisitButton>PLAN A VISIT</PlanVisitButton>
      </HeroContent>
    </HeroSection>
  )
}

// Styled Components
const HeroSection = styled.section`
  position: relative;
  height: calc(100vh - 4rem); /* Subtract header height from viewport height */
  background-image: url('https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  width: 100%;
  padding: 0 2rem;
`

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }
`

const PlanVisitButton = styled.button`
  background-color: #0d9488;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:hover {
    background-color: #0f766e;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(13, 148, 136, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.875rem;
  }
`

export default Hero