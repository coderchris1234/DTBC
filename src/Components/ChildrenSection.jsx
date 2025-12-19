import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const ChildrenSection = () => {
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
    <ChildrenSectionContainer ref={sectionRef}>
      <Container>
        <ContentWrapper>
          <ImageSection isVisible={isVisible} animationDelay="0.2s">
            <ChildrenImage 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Children celebrating at church"
            />
          </ImageSection>
          
          <TextSection isVisible={isVisible} animationDelay="0.4s">
            <PurposeSection>
              <SectionTitle isVisible={isVisible} animationDelay="0.6s">
                Discover Purpose
              </SectionTitle>
              <SectionText isVisible={isVisible} animationDelay="0.7s">
                We aren't perfect. We often find ourselves having done things we regret. We each have a different story. You might be surprised that you aren't alone in the types of decisions you've made or maybe the things you still struggle with now. But God has created us to live in community, and He can use your unique background for His purpose. Like pieces in a puzzle, we're all different but fit together to make something better.
              </SectionText>
            </PurposeSection>
            
            <Divider />
            
            <CommunitySection>
              <SectionTitle isVisible={isVisible} animationDelay="0.8s">
                Find Community
              </SectionTitle>
              <SectionText isVisible={isVisible} animationDelay="0.9s">
                Everyone has a need to connect with something greater than themselves and with other people who are working to make a difference in the world. We can't do life alone; we need each other.
              </SectionText>
            </CommunitySection>
            
            <Divider />
            
            <DifferenceSection>
              <SectionTitle isVisible={isVisible} animationDelay="1.0s">
                Make A Difference
              </SectionTitle>
              <SectionText isVisible={isVisible} animationDelay="1.1s">
                Our mission at Divine Touch Bible Church is to guide you in building a personal relationship with God. As you grow in this relationship, you'll continually find more freedom in Christ and embrace the purpose He has for your life. You can live out your purpose and make a difference in the world by serving others with your God-given gifts.
              </SectionText>
            </DifferenceSection>
          </TextSection>
        </ContentWrapper>
      </Container>
    </ChildrenSectionContainer>
  )
}

// Styled Components
const ChildrenSectionContainer = styled.section`
  background-color: white;
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
  align-items: flex-start;
  
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

const ChildrenImage = styled.img`
  width: 100%;
  height: 500px;
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

const PurposeSection = styled.div`
  margin-bottom: 2rem;
`

const CommunitySection = styled.div`
  margin-bottom: 2rem;
`

const DifferenceSection = styled.div`
  margin-bottom: 0;
`

const SectionTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`

const SectionText = styled.p`
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.7;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    text-align: center;
  }
`

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, #e5e7eb, transparent);
  margin: 2rem 0;
  opacity: 0.6;
`

export default ChildrenSection