import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { theme } from '../styles/theme'

const ValuesSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const navigate = useNavigate()

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

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <Section ref={sectionRef}>
      <Container>
        <ContentGrid>
          <TextContent isVisible={isVisible}>
            <SectionLabel>Our Values</SectionLabel>
            <MainHeading>
              What We Stand For
            </MainHeading>
            <Description>
              Our core values shape everything we do as a church community. 
              They guide our decisions, inform our ministry, and reflect our 
              commitment to living out the Gospel in practical ways.
            </Description>
            
            <ValuesList>
              <ValueItem isVisible={isVisible} delay="0.2s">
                <ValueIcon>📖</ValueIcon>
                <ValueContent>
                  <ValueTitle>Biblical Truth</ValueTitle>
                  <ValueDescription>
                    We believe in the authority and relevance of Scripture for all aspects of life
                  </ValueDescription>
                </ValueContent>
              </ValueItem>
              
              <ValueItem isVisible={isVisible} delay="0.4s">
                <ValueIcon>❤️</ValueIcon>
                <ValueContent>
                  <ValueTitle>Authentic Love</ValueTitle>
                  <ValueDescription>
                    We strive to love God and others with genuine care and compassion
                  </ValueDescription>
                </ValueContent>
              </ValueItem>
              
              <ValueItem isVisible={isVisible} delay="0.6s">
                <ValueIcon>🤝</ValueIcon>
                <ValueContent>
                  <ValueTitle>Inclusive Community</ValueTitle>
                  <ValueDescription>
                    We welcome all people regardless of background, creating space for everyone
                  </ValueDescription>
                </ValueContent>
              </ValueItem>
              
              <ValueItem isVisible={isVisible} delay="0.8s">
                <ValueIcon>🌱</ValueIcon>
                <ValueContent>
                  <ValueTitle>Spiritual Growth</ValueTitle>
                  <ValueDescription>
                    We are committed to helping each person mature in their faith journey
                  </ValueDescription>
                </ValueContent>
              </ValueItem>
            </ValuesList>
            
            <CallToAction isVisible={isVisible} delay="1.0s">
              <CTAText>
                Ready to be part of our community?
              </CTAText>
              <CTAButton onClick={() => navigate('/visit')}>
                Plan Your Visit
              </CTAButton>
            </CallToAction>
          </TextContent>
          
          <ImageContent isVisible={isVisible}>
            <ImageContainer>
              <StyledImage 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f8f6f0'/%3E%3Cg opacity='0.2'%3E%3Ccircle cx='200' cy='150' r='80' fill='%23b5967a'/%3E%3Ccircle cx='120' cy='300' r='60' fill='%2396a896'/%3E%3Ccircle cx='280' cy='320' r='50' fill='%23d4af37'/%3E%3Ccircle cx='200' cy='450' r='70' fill='%23b5967a'/%3E%3Cpath d='M100 200 Q200 180 300 200 Q280 280 200 300 Q120 280 100 200' fill='%2396a896' opacity='0.3'/%3E%3C/g%3E%3Ctext x='200' y='550' text-anchor='middle' font-family='serif' font-size='20' fill='%235f5f56'%3EUnited in Faith%3C/text%3E%3C/svg%3E"
                alt="Community values illustration"
              />
            </ImageContainer>
          </ImageContent>
        </ContentGrid>
      </Container>
    </Section>
  )
}

// Styled Components
const Section = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  background: ${theme.colors.white};
  
  @media (max-width: 768px) {
    padding: ${theme.spacing['3xl']} 0;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  
  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.md};
  }
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['4xl']};
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
  }
`

const TextContent = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateX(${props => props.isVisible ? '0' : '-30px'});
  transition: all 0.8s ease-out;
`

const SectionLabel = styled.span`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.primary[600]};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: ${theme.spacing.md};
  display: block;
`

const MainHeading = styled.h2`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['4xl']};
  font-weight: ${theme.typography.weights.light};
  color: ${theme.colors.text.primary};
  line-height: ${theme.typography.lineHeights.tight};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.sizes['3xl']};
  }
`

const Description = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing['2xl']};
`

const ValuesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
`

const ValueItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.6s ease-out;
  transition-delay: ${props => props.delay || '0s'};
`

const ValueIcon = styled.div`
  font-size: ${theme.typography.sizes['2xl']};
  flex-shrink: 0;
  margin-top: ${theme.spacing.xs};
`

const ValueContent = styled.div`
  flex: 1;
`

const ValueTitle = styled.h3`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const ValueDescription = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.normal};
`

const CallToAction = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.primary[50]};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.primary[200]};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.delay || '0s'};
`

const CTAText = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`

const CTAButton = styled.button`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.white};
  background: ${theme.colors.primary[600]};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.primary[700]};
    transform: translateY(-2px);
  }
`

const ImageContent = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateX(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  transition-delay: 0.2s;
  
  @media (max-width: 768px) {
    order: -1;
  }
`

const ImageContainer = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.soft};
  background: ${theme.colors.accent.cream};
`

const StyledImage = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`

export default ValuesSection