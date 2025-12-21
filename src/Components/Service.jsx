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
          DIVINE TOUCH BIBLE CHURCH USA INC IS A PLACE FOR YOU TO BELONG!
        </MainTitle>
        
        <ContentWrapper>
          <ImageContainer isVisible={isVisible} animationDelay="0.2s">
            <ServiceImage 
              src="data:image/jpeg;base64,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" 
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
  transform: translateX(${props => props.isVisible ? '0' : '100px'}) rotate(${props => props.isVisible ? '0deg' : '5deg'});
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