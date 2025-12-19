import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const PrayerSection = () => {
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
    <PrayerSectionContainer ref={sectionRef}>
      <Container>
        <ContentWrapper>
          <ImageSection isVisible={isVisible} animationDelay="0.2s">
            <PrayerImage 
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
              alt="Praying in a church"
            />
          </ImageSection>
          
          <TextSection isVisible={isVisible} animationDelay="0.4s">
            <MainTitle>
              We have a place for you and your family
            </MainTitle>
            
            <BulletList>
              <BulletItem isVisible={isVisible} animationDelay="0.6s">
                A church where you can begin your personal spiritual journey.
              </BulletItem>
              <BulletItem isVisible={isVisible} animationDelay="0.7s">
                A safe space for your children to learn Christian principles.
              </BulletItem>
              <BulletItem isVisible={isVisible} animationDelay="0.8s">
                A community where your family can grow together with other families.
              </BulletItem>
            </BulletList>
            
            <Description isVisible={isVisible} animationDelay="0.9s">
              Trusting God, like any relationship, takes time and effort. We believe that through worship, Connect Groups, Hope Teams, and prayer you will learn how to trust God and gain the spiritual tools to put your faith into action.
            </Description>
            
            <ConnectButton isVisible={isVisible} animationDelay="1.1s">
              CONNECT WITH US
            </ConnectButton>
          </TextSection>
        </ContentWrapper>
      </Container>
    </PrayerSectionContainer>
  )
}

// Styled Components
const PrayerSectionContainer = styled.section`
  background-color: #f9fafb;
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
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

const PrayerImage = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    height: 350px;
  }
`

const TextSection = styled.div`
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '100px'}) rotate(${props => props.isVisible ? '0deg' : '5deg'});
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const MainTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`

const BulletItem = styled.li`
  font-size: 1.125rem;
  color: #374151;
  margin-bottom: 1rem;
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.6;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #3b82f6;
    font-weight: bold;
    font-size: 1.5rem;
    top: -0.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const Description = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const ConnectButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
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
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    
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

export default PrayerSection