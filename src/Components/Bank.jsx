import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Bank = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px'
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
    <BankSection ref={sectionRef}>
      <Container>
        <GivingOptionsGrid>
          {/* <GivingCard isVisible={isVisible} animationDelay="0.2s" direction="left">
            <CardTitle>Online</CardTitle>
            <CardDescription>
              Online giving is a safe and easy way to invest in all that God is doing at Hope City.
            </CardDescription>
            <GiveButton href="https://yahoo.com" target="_blank" rel="noopener noreferrer">
              GIVE HERE
            </GiveButton>
          </GivingCard> */}
          
          <GivingCard isVisible={isVisible} animationDelay="0.4s" direction="top">
            <CardTitle>Zelle</CardTitle>
            <CardDescription>
              If your bank uses Zelle, use our email, <EmailLink href="https://yahoo.com" target="_blank" rel="noopener noreferrer">parakletos319@yahoo.com</EmailLink> to give your offering. **Zelle App no longer available
            </CardDescription>
          </GivingCard>
          
          <GivingCard isVisible={isVisible} animationDelay="0.6s" direction="bottom">
            <CardTitle>In Service</CardTitle>
            <CardDescription>
              Offering envelopes are provided in each service for you to give with cash or check.
            </CardDescription>
          </GivingCard>
          
          <GivingCard isVisible={isVisible} animationDelay="0.8s" direction="right">
            <CardTitle>By Check</CardTitle>
            <CardDescription>
              Divine touch<br />
              Bible Church<br />
              intl inc
            </CardDescription>
          </GivingCard>
        </GivingOptionsGrid>
        
        <BottomMessage isVisible={isVisible} animationDelay="1.0s">
          WE ARE BETTER TOGETHER
        </BottomMessage>
      </Container>
    </BankSection>
  )
}

// Styled Components
const BankSection = styled.section`
  background-color: #f3f4f6;
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const GivingOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const GivingCard = styled.div`
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
  color: white;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(30, 58, 138, 0.3);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  position: relative;
  overflow: hidden;
  
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: ${props => {
    if (!props.isVisible) {
      switch(props.direction) {
        case 'left': return 'translateX(-100px) rotate(-5deg) scale(0.9)';
        case 'right': return 'translateX(100px) rotate(5deg) scale(0.9)';
        case 'top': return 'translateY(-100px) scale(0.8)';
        case 'bottom': return 'translateY(100px) scale(0.8)';
        default: return 'translateY(50px) scale(0.9)';
      }
    }
    return 'translateX(0) translateY(0) rotate(0) scale(1)';
  }};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02) !important;
    box-shadow: 0 20px 40px rgba(30, 58, 138, 0.4);
  }
  
  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
    
    &:hover {
      transform: translateY(-5px) scale(1.01) !important;
    }
  }
`

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const CardDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const EmailLink = styled.a`
  color: #93c5fd;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
  
  &:focus {
    outline: 2px solid rgba(147, 197, 253, 0.5);
    outline-offset: 2px;
  }
`

const GiveButton = styled.a`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const BottomMessage = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0.1em;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`

export default Bank