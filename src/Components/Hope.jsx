import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const Hope = () => {
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
    <HopeSection ref={sectionRef}>
      <Container>
        <HeaderContent isVisible={isVisible}>
          <SectionLabel>Your Journey</SectionLabel>
          <MainTitle>
            Your Faith Journey Begins Here
          </MainTitle>
          <Description>
            Whether you're exploring faith for the first time or looking to deepen your relationship with God, 
            we're here to walk alongside you every step of the way.
          </Description>
        </HeaderContent>
        
        <JourneyGrid>
          <JourneyStep isVisible={isVisible} delay="0.2s">
            <StepNumber>1</StepNumber>
            <StepIcon>🚪</StepIcon>
            <StepTitle>Take the First Step</StepTitle>
            <StepDescription>
              Join us for a service in person or online. Experience our welcoming community 
              and discover what makes our church family special.
            </StepDescription>
            <StepAction onClick={() => navigate('/visit')}>
              Plan Your Visit
            </StepAction>
          </JourneyStep>
          
          <JourneyStep isVisible={isVisible} delay="0.4s">
            <StepNumber>2</StepNumber>
            <StepIcon>🌱</StepIcon>
            <StepTitle>Grow in Faith</StepTitle>
            <StepDescription>
              Connect with others through small groups, Bible studies, and ministry opportunities. 
              Find your place in our community and grow in your relationship with God.
            </StepDescription>
            <StepAction onClick={() => navigate('/about')}>
              Learn More
            </StepAction>
          </JourneyStep>
          
          <JourneyStep isVisible={isVisible} delay="0.6s">
            <StepNumber>3</StepNumber>
            <StepIcon>🤝</StepIcon>
            <StepTitle>Make a Difference</StepTitle>
            <StepDescription>
              Use your gifts to serve others and make an impact in our community and beyond. 
              Discover how God can use you to touch lives and spread His love.
            </StepDescription>
            <StepAction onClick={() => navigate('/contact')}>
              Get Involved
            </StepAction>
          </JourneyStep>
        </JourneyGrid>
        
        <CallToAction isVisible={isVisible} delay="0.8s">
          <CTAContent>
            <CTATitle>Ready to Begin?</CTATitle>
            <CTAText>
              We're here to support you on your faith journey. Reach out with any questions 
              or to learn more about our community.
            </CTAText>
            <CTAButton onClick={() => navigate('/contact')}>
              Connect With Us
            </CTAButton>
          </CTAContent>
        </CallToAction>
      </Container>
    </HopeSection>
  )
}

// Styled Components
const HopeSection = styled.section`
  background: ${theme.colors.primary[50]};
  padding: ${theme.spacing['5xl']} 0;
  position: relative;
  
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

const HeaderContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${theme.spacing['4xl']};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
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

const MainTitle = styled.h2`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['5xl']};
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
`

const JourneyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['3xl']};
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`

const JourneyStep = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  text-align: center;
  box-shadow: ${theme.shadows.subtle};
  border: 1px solid ${theme.colors.neutral[200]};
  transition: all 0.3s ease;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.delay || '0s'};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.medium};
  }
`

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: ${theme.colors.primary[600]};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  margin: 0 auto ${theme.spacing.md};
`

const StepIcon = styled.div`
  font-size: ${theme.typography.sizes['3xl']};
  margin-bottom: ${theme.spacing.lg};
`

const StepTitle = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`

const StepDescription = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.lg};
`

const StepAction = styled.button`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.primary[600]};
  background: transparent;
  border: 2px solid ${theme.colors.primary[300]};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: ${theme.colors.primary[50]};
    border-color: ${theme.colors.primary[400]};
    transform: translateY(-2px);
  }
`

const CallToAction = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.soft};
  border: 1px solid ${theme.colors.neutral[200]};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.delay || '0s'};
`

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const CTATitle = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`

const CTAText = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.lg};
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

export default Hope