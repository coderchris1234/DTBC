import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Service = () => {
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
    <ServiceSection ref={sectionRef}>
      <Container>
        <MainTitle isVisible={isVisible}>
          DIVINE TOUCH BIBLE CHURCH IS A PLACE FOR YOU TO BELONG!
        </MainTitle>
        
        <ContentWrapper>
          <ImageContainer isVisible={isVisible} animationDelay="0.2s">
            <ServiceImage 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Church community members"
            />
          </ImageContainer>
          
          <TextContent isVisible={isVisible} animationDelay="0.4s">
            <WelcomeTitle>Everyone is Welcome!</WelcomeTitle>
            <WelcomeText>
              Don't settle for just good enough. We'd love to help you find the purpose and life-giving relationships you were made for.
            </WelcomeText>
            
            <ServiceInfo>
              <ServiceItem isVisible={isVisible} animationDelay="0.6s">
                <ServiceLabel>New Jersey Service Times</ServiceLabel>
                <ServiceDetails>Sunday at 9:45 AM [471 Clinton Avenue, Newark NJ07108]</ServiceDetails>
                <ServiceDetails>Wednesday at 6PM [471 Clinton Avenue, Newark NJ07108]</ServiceDetails>
              </ServiceItem>
              
              <ServiceItem isVisible={isVisible} animationDelay="0.8s">
                <ServiceLabel>Texas Service Time</ServiceLabel>
                <ServiceDetails>Sunday at 9:45 AM [3520 FM 723BRd, Rosenberg Tx 77471]</ServiceDetails>
                <ServiceDetails>Wednesday at 6:00 PM [3520 FM 723BRd, Rosenberg Tx 77471]</ServiceDetails>
              </ServiceItem>
            </ServiceInfo>
          </TextContent>
        </ContentWrapper>
      </Container>
    </ServiceSection>
  )
}

// Styled Components
const ServiceSection = styled.section`
  background-color: #f5f5f5;
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
  line-height: 1.2;
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

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const ImageContainer = styled.div`
  width: 100%;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '-50px'}) rotate(${props => props.isVisible ? '0deg' : '-2deg'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const ServiceImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    height: 300px;
  }
`

const TextContent = styled.div`
  padding: 1rem 0;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '50px'}) rotate(${props => props.isVisible ? '0deg' : '2deg'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const WelcomeTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`

const WelcomeText = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const ServiceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ServiceItem = styled.div`
  border-left: 4px solid #2563eb;
  padding-left: 1rem;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '30px'}) scale(${props => props.isVisible ? '1' : '0.9'});
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const ServiceLabel = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`

const ServiceDetails = styled.p`
  font-size: 1rem;
  color: #2563eb;
  font-weight: 500;
`

const LocationDetails = styled.p`
  font-size: 1rem;
  color: #2563eb;
  font-weight: 500;
  line-height: 1.4;
`

export default Service