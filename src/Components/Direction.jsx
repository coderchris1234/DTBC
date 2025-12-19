import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Direction = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  // Function to open Google Maps with church locations
  const handleDirectionsClick = (location) => {
    // Church addresses
    const addresses = {
      newJersey: "471 Clinton Avenue, Newark NJ 07108",
      texas: "3520 FM 723 Rd, Rosenberg TX 77471"
    }
    
    // Create Google Maps URL for the selected location
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addresses[location])}`
    
    // Open in new tab
    window.open(googleMapsUrl, '_blank')
  }

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
    <DirectionSection ref={sectionRef}>
      <Container>
        <ContentWrapper>
          <InfoSection isVisible={isVisible} animationDelay="0.2s">
            <SectionTitle isVisible={isVisible} animationDelay="0.1s">
              Service Times
            </SectionTitle>
            
            <ServiceGroup isVisible={isVisible} animationDelay="0.3s">
              <GroupTitle>New Jersey</GroupTitle>
              <GroupTitle>Wednesday Service</GroupTitle>
              <ServiceItem>Bible Study | <Time>6:30pm</Time></ServiceItem>
            </ServiceGroup>
            
            <ServiceGroup isVisible={isVisible} animationDelay="0.4s">
              <GroupTitle>Sunday Service</GroupTitle>
              <ServiceItem>Divine Service | <Time>9:45am</Time></ServiceItem>
            </ServiceGroup>

            <ServiceGroup isVisible={isVisible} animationDelay="0.3s">
              <GroupTitle>Texas</GroupTitle>
              <GroupTitle>Wednesday Service</GroupTitle>
              <ServiceItem>Bible Study | <Time>6:30pm</Time></ServiceItem>
            </ServiceGroup>
            
            <ServiceGroup isVisible={isVisible} animationDelay="0.4s">
              <GroupTitle>Sunday Service</GroupTitle>
              <ServiceItem>Divine Service | <Time>9:00am</Time></ServiceItem>
            </ServiceGroup>
            
            <LocationSection isVisible={isVisible} animationDelay="0.5s">
              <SectionTitle>Locations</SectionTitle>
              <LocationItem>
                <LocationName>New Jersey</LocationName>
                <Address>471 Clinton Avenue, Newark NJ 07108</Address>
                <DirectionsButton onClick={() => handleDirectionsClick('newJersey')}>
                  GET DIRECTIONS
                </DirectionsButton>
              </LocationItem>
              
              <LocationItem>
                <LocationName>Texas</LocationName>
                <Address>3520 FM 723 Rd, Rosenberg TX 77471</Address>
                <DirectionsButton onClick={() => handleDirectionsClick('texas')}>
                  GET DIRECTIONS
                </DirectionsButton>
              </LocationItem>
            </LocationSection>
          </InfoSection>
          
          <ImageSection isVisible={isVisible} animationDelay="0.6s">
            <ServiceImage 
              src="https://images.unsplash.com/photo-1760367120345-2b96c53de838?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZSUyMHRhbGtpbmclMjB0b2dldGhlciUyMGluJTIwYSUyMGNodXJjaHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Church community gathering"
            />
          </ImageSection>
        </ContentWrapper>
      </Container>
    </DirectionSection>
  )
}

// Styled Components
const DirectionSection = styled.section`
  background-color: #f8f9fa;
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

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const InfoSection = styled.div`
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '-50px'}) translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2rem;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`

const ServiceGroup = styled.div`
  margin-bottom: 2rem;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const GroupTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
`

const ServiceItem = styled.div`
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`

const Time = styled.span`
  font-weight: 600;
  color: #1f2937;
`

const Note = styled.span`
  font-style: italic;
  color: #6b7280;
  font-size: 0.875rem;
`

const LocationSection = styled.div`
  margin-top: 2rem;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const LocationItem = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

const LocationName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`

const Address = styled.div`
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.5;
  margin-bottom: 1rem;
`

const DirectionsButton = styled.button`
  background-color: #0891b2;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background-color: #0e7490;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(8, 145, 178, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`

const ImageSection = styled.div`
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '50px'}) translateY(${props => props.isVisible ? '0' : '20px'}) scale(${props => props.isVisible ? '1' : '0.95'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const ServiceImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
`

export default Direction