import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const HeroGive = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const sectionRef = useRef(null)
  
  const givingWords = [
    'Generosity',
    'Giving',
    'Blessing',
    'Stewardship',
    'Offering',
    'Tithing',
    'Sharing',
    'Abundance'
  ]

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

  // Word cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => 
        (prevIndex + 1) % givingWords.length
      )
    }, 2500) // Change word every 2.5 seconds

    return () => clearInterval(interval)
  }, [givingWords.length])

  return (
    <GiveHeroSection ref={sectionRef}>
      <HeroOverlay />
      <HeroContent>
        <Container>
          <ContentWrapper isVisible={isVisible}>
            <HeroTitle>
              <AnimatedWord key={currentWordIndex}>
                {givingWords[currentWordIndex]}
              </AnimatedWord>
            </HeroTitle>
            <HeroDescription>
             We give because we are made in God’s image, and He is a giver. We are never more like God than when we give. 
            </HeroDescription>
          </ContentWrapper>
        </Container>
      </HeroContent>
    </GiveHeroSection>
  )
}

// Styled Components
const GiveHeroSection = styled.section`
  position: relative;
  height: 60vh;
  min-height: 400px;
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
    min-height: 350px;
    height: 50vh;
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
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.5) 100%
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
  transform: translateX(${props => props.isVisible ? '0' : '-100px'}) translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
  }
`

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  line-height: 1.1;
  min-height: 1.2em; /* Prevent layout shift during word changes */
  
  @media (max-width: 1024px) {
    font-size: 3rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const AnimatedWord = styled.span`
  display: inline-block;
  animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    50% {
      opacity: 0.7;
      transform: translateY(-5px) scale(1.05);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`

const HeroDescription = styled.p`
  font-size: 1.25rem;
  color: white;
  line-height: 1.6;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  font-weight: 400;
  max-width: 500px;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

export default HeroGive