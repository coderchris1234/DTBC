import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const HelpGive = () => {
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
    <HelpGiveSection ref={sectionRef}>
      <Container>
        <ContentWrapper>
          <ImageSection isVisible={isVisible} animationDelay="0.2s">
            <CommunityImage 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Church community members"
            />
          </ImageSection>
          
          <TextSection isVisible={isVisible} animationDelay="0.4s">
            <MissionText isVisible={isVisible} animationDelay="0.6s">
              Join our mission of reaching people with the transformational message of Jesus! Your generosity allows us to help more people to experience a personal relationship with Him. It is a privilege to give from our resources to enlarge the kingdom of God. We give to the Lord not out of obligation, but instead, out of obedience and thankfulness for His blessings in our lives.
            </MissionText>
            
            <TaxText isVisible={isVisible} animationDelay="0.8s">
              All your financial donations to Hope City Church are tax-deductible. We are very grateful for your donation and hope online giving is convenient, useful, and practical for you.
            </TaxText>
            
            <GiveButton 
              href="https://yahoo.com" 
              target="_blank" 
              rel="noopener noreferrer"
              isVisible={isVisible} 
              animationDelay="1.0s"
            >
              GIVE HERE
            </GiveButton>
          </TextSection>
        </ContentWrapper>
      </Container>
    </HelpGiveSection>
  )
}

// Styled Components
const HelpGiveSection = styled.section`
  background: linear-gradient(135deg, #0891b2 0%, #0e7490 50%, #155e75 100%);
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
    background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
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
  transform: translateX(${props => props.isVisible ? '0' : '-100px'}) rotate(${props => props.isVisible ? '0deg' : '-5deg'}) scale(${props => props.isVisible ? '1' : '0.9'});
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const CommunityImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    height: 300px;
  }
`

const TextSection = styled.div`
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '100px'}) rotate(${props => props.isVisible ? '0deg' : '5deg'});
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const MissionText = styled.p`
  font-size: 1.125rem;
  color: white;
  line-height: 1.7;
  margin-bottom: 2rem;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }
`

const TaxText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    text-align: center;
  }
`

const GiveButton = styled.a`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.4);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '30px'}) scale(${props => props.isVisible ? '1' : '0.9'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
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
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`

export default HelpGive