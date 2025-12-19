import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Hope = () => {
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
    <HopeSection ref={sectionRef}>
      <Container>
        <MainTitle isVisible={isVisible}>
          It All Starts Here.
        </MainTitle>
        
        <CardsGrid>
          <HopeCard isVisible={isVisible} animationDelay="0.2s" direction="left">
            <CardImage 
              src="https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Church service"
            />
            <CardContent>
              <CardText>
                Attend a service in person or online. We would love to meet you!
              </CardText>
            </CardContent>
          </HopeCard>
          
          <HopeCard isVisible={isVisible} animationDelay="0.4s" direction="center">
            <CardImage 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Community gathering"
            />
            <CardContent>
              <CardText>
                We've designed a path for you and your family to grow in your faith, find friends, and serve others.
              </CardText>
            </CardContent>
          </HopeCard>
          
          <HopeCard isVisible={isVisible} animationDelay="0.6s" direction="right">
            <CardImage 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
              alt="Prayer and support"
            />
            <CardContent>
              <CardText>
                Have a question or need prayer? Let our team know and we will reach out to you.
              </CardText>
            </CardContent>
          </HopeCard>
        </CardsGrid>
      </Container>
    </HopeSection>
  )
}

// Styled Components
const HopeSection = styled.section`
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(147, 197, 253, 0.2) 0%, transparent 50%);
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

const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: #93c5fd;
  margin-bottom: 4rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '50px'}) scale(${props => props.isVisible ? '1' : '0.9'});
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const HopeCard = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: ${props => {
    if (!props.isVisible) {
      switch(props.direction) {
        case 'left': return 'translateX(-50px) translateY(30px) rotate(-3deg) scale(0.9)';
        case 'right': return 'translateX(50px) translateY(30px) rotate(3deg) scale(0.9)';
        case 'center': return 'translateY(-50px) scale(0.9)';
        default: return 'translateY(50px) scale(0.9)';
      }
    }
    return 'translateX(0) translateY(0) rotate(0) scale(1)';
  }};
  
  &:hover {
    transform: translateY(-10px) scale(1.02) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 1024px) {
    &:hover {
      transform: translateY(-5px) scale(1.01) !important;
    }
  }
`

const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${HopeCard}:hover & {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 200px;
  }
`

const CardContent = styled.div`
  padding: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const CardText = styled.p`
  font-size: 1.125rem;
  color: #374151;
  line-height: 1.6;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export default Hope