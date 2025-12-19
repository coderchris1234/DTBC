import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <AboutHeroSection ref={sectionRef}>
      <HeroOverlay />
      <HeroContent>
        <Container>
          <ContentWrapper isVisible={isVisible}>
            <HeroTitle>About Us</HeroTitle>
            <HeroDescription>
              It all comes down to loving God and loving people. If we can do that well, everything else will fall into place.
            </HeroDescription>
          </ContentWrapper>
        </Container>
      </HeroContent>
    </AboutHeroSection>
  )
}

// Styled Components
const AboutHeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 600px;
  background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  
  @media (max-width: 768px) {
    background-attachment: scroll;
    min-height: 500px;
  }
`

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(139, 69, 19, 0.7) 0%,
    rgba(160, 82, 45, 0.6) 30%,
    rgba(205, 133, 63, 0.5) 60%,
    rgba(222, 184, 135, 0.4) 100%
  );
  z-index: 1;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const ContentWrapper = styled.div`
  max-width: 600px;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '-100px'}) translateY(${props => props.isVisible ? '0' : '50px'});
  transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
  }
`

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  line-height: 1.1;
  
  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`

const HeroDescription = styled.p`
  font-size: 1.5rem;
  color: white;
  line-height: 1.6;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  font-weight: 400;
  max-width: 500px;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    font-size: 1.125rem;
  }
`

export default HeroSection