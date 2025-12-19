import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Place = () => {
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
    <>
      <HeaderSection>
        <HeaderText isVisible={isVisible} animationDelay="0.1s">
          THERE'S A PLACE FOR YOU AT DIVINE TOUCH BIBLE CHURCH
        </HeaderText>
      </HeaderSection>
      
      <PlaceSection ref={sectionRef}>
        <Container>
          <ContentWrapper>
            <ImageSection isVisible={isVisible} animationDelay="0.3s">
              <KidsImage 
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80"
                alt="Kids at church"
              />
            </ImageSection>
            
            <TextSection isVisible={isVisible} animationDelay="0.5s">
              <MainTitle isVisible={isVisible} animationDelay="0.4s">
                What kind of experience will my kids have?
              </MainTitle>
              
              <Description isVisible={isVisible} animationDelay="0.6s">
                While you experience inspiring worship and teaching in the auditorium, your children  can learn a Bible lesson tailored to their grade level and participate in fun activities with other children their age in a secured area.
              </Description>
            </TextSection>
          </ContentWrapper>
        </Container>
      </PlaceSection>
    </>
  )
}

// Styled Components
const HeaderSection = styled.section`
  background-color: white;
  padding: 2rem 0;
  text-align: center;
  overflow-x: hidden;
  width: 100%;
`

const HeaderText = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #0891b2;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0 1rem;
  }
`

const PlaceSection = styled.section`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  padding: 4rem 0;
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
    background: radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(147, 197, 253, 0.03) 0%, transparent 50%);
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

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const ImageSection = styled.div`
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '-50px'}) translateY(${props => props.isVisible ? '0' : '30px'}) scale(${props => props.isVisible ? '1' : '0.9'});
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const KidsImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.03);
  }
  
  @media (max-width: 768px) {
    height: 280px;
  }
`

const TextSection = styled.div`
  color: #1f2937;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '50px'}) translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const MainTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: #1f2937;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '30px'}) scale(${props => props.isVisible ? '1' : '0.95'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    font-size: 1.875rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const Description = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #4b5563;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '25px'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const AdditionalInfo = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: #4b5563;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '25px'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export default Place