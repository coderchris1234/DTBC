import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Purpose = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.3,
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
    <PurposeSection ref={sectionRef}>
      <Container>
        <MainTitle isVisible={isVisible}>
          We're here to help people Know God, Find Community, Discover Purpose, and Make A Difference.
        </MainTitle>
        
        <CardsGrid>
          <PurposeCard isVisible={isVisible} animationDelay="0.1s" direction="left">
            <CardImage 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Know God"
            />
            <CardOverlay>
              <CardTitle>Know God</CardTitle>
              <CardText>
                You can know Jesus on a personal level. See how a relationship with Him changes your life for the better.
              </CardText>
            </CardOverlay>
          </PurposeCard>
          
          <PurposeCard isVisible={isVisible} animationDelay="0.2s" direction="top">
            <CardImage 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2132&q=80"
              alt="Find Community"
            />
            <CardOverlay>
              <CardTitle>Find Community</CardTitle>
              <CardText>
                You weren't meant to do life alone. Find friends and build stronger relationships with God and others.
              </CardText>
            </CardOverlay>
          </PurposeCard>
          
          <PurposeCard isVisible={isVisible} animationDelay="0.3s" direction="bottom">
            <CardImage 
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
              alt="Discover Purpose"
            />
            <CardOverlay>
              <CardTitle>Discover Purpose</CardTitle>
              <CardText>
                You're here for a reason. Find out who God created you to be and learn how to live life on purpose.
              </CardText>
            </CardOverlay>
          </PurposeCard>
          
          <PurposeCard isVisible={isVisible} animationDelay="0.4s" direction="right">
            <CardImage 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
              alt="Make A Difference"
            />
            <CardOverlay>
              <CardTitle>Make A Difference</CardTitle>
              <CardText>
                Learn how to impact people in your community and on the other side of the world.
              </CardText>
            </CardOverlay>
          </PurposeCard>
        </CardsGrid>
      </Container>
    </PurposeSection>
  )
}

// Styled Components
const PurposeSection = styled.section`
  background-color: white;
  padding: 4rem 0;
  overflow-x: hidden;
  width: 100%;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #1f2937;
  margin-bottom: 3rem;
  line-height: 1.3;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const PurposeCard = styled.div`
  position: relative;
  height: 400px;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: ${props => {
    if (!props.isVisible) {
      switch(props.direction) {
        case 'left': return 'translateX(-50px) rotate(-2deg)';
        case 'right': return 'translateX(50px) rotate(2deg)';
        case 'top': return 'translateY(-50px) scale(0.9)';
        case 'bottom': return 'translateY(50px) scale(0.9)';
        default: return 'translateY(30px)';
      }
    }
    return 'translateX(0) translateY(0) rotate(0) scale(1)';
  }};
  
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  &:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 640px) {
    height: 350px;
  }
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
  color: white;
  padding: 2rem 1.5rem;
  text-align: center;
`

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`

const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.95;
  
  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`

export default Purpose