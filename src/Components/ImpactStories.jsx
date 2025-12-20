import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { theme } from '../styles/theme'

const ImpactStories = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const navigate = useNavigate()

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
            <SectionLabel>Your Impact</SectionLabel>
            <MainHeading>
              Lives Transformed Through Giving
            </MainHeading>
            <Description>
              Your generous gifts are making a real difference in our community and beyond. 
              Here are just a few ways your contributions are changing lives and advancing God's kingdom.
            </Description>
            
            <ImpactList>
              <ImpactItem isVisible={isVisible} delay="0.2s">
                <ImpactNumber>150+</ImpactNumber>
                <ImpactLabel>Families Supported</ImpactLabel>
                <ImpactDescription>
                  Through our food pantry and assistance programs
                </ImpactDescription>
              </ImpactItem>
              
              <ImpactItem isVisible={isVisible} delay="0.4s">
                <ImpactNumber>50+</ImpactNumber>
                <ImpactLabel>Children in Programs</ImpactLabel>
                <ImpactDescription>
                  Learning about God's love in our youth ministries
                </ImpactDescription>
              </ImpactItem>
              
              <ImpactItem isVisible={isVisible} delay="0.6s">
                <ImpactNumber>25+</ImpactNumber>
                <ImpactLabel>Mission Partners</ImpactLabel>
                <ImpactDescription>
                  Supported locally and around the world
                </ImpactDescription>
              </ImpactItem>
            </ImpactList>
            
            <TestimonialCard isVisible={isVisible} delay="0.8s">
              <TestimonialQuote>
                "The generosity of this church family helped us through our most difficult time. 
                We're forever grateful for the love and support we received."
              </TestimonialQuote>
              <TestimonialAuthor>— Sarah M., Church Member</TestimonialAuthor>
            </TestimonialCard>
            
            <CallToAction isVisible={isVisible} delay="1.0s">
              <CTAText>
                Ready to make a difference?
              </CTAText>
              <CTAButton onClick={() => navigate('/contact')}>
                Start Giving Today
              </CTAButton>
            </CallToAction>
          </TextContent>
          
          <ImageContent isVisible={isVisible}>
            <ImageContainer>
              <StyledImage 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f8f6f0'/%3E%3Cg opacity='0.2'%3E%3Ccircle cx='200' cy='100' r='60' fill='%23d4af37'/%3E%3Cpath d='M150 180 Q200 160 250 180 L240 260 Q200 280 160 260 Z' fill='%2396a896'/%3E%3Ccircle cx='120' cy='350' r='45' fill='%23b5967a'/%3E%3Ccircle cx='280' cy='380' r='35' fill='%23d4af37'/%3E%3Cpath d='M100 420 Q200 400 300 420 Q280 490 200 510 Q120 490 100 420' fill='%2396a896' opacity='0.3'/%3E%3Cpath d='M180 300 L220 300 L220 340 L180 340 Z' fill='%23b5967a'/%3E%3Ccircle cx='200' cy='320' r='8' fill='%23d4af37'/%3E%3C/g%3E%3Ctext x='200' y='560' text-anchor='middle' font-family='serif' font-size='18' fill='%235f5f56'%3ELives Changed%3C/text%3E%3C/svg%3E"
                alt="Community impact illustration"
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
  color: ${theme.colors.accent.gold};
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

const ImpactList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
`

const ImpactItem = styled.div`
  text-align: center;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.6s ease-out;
  transition-delay: ${props => props.delay || '0s'};
`

const ImpactNumber = styled.div`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['3xl']};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.accent.gold};
  margin-bottom: ${theme.spacing.xs};
`

const ImpactLabel = styled.div`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const ImpactDescription = styled.div`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.normal};
`

const TestimonialCard = styled.blockquote`
  background: ${theme.colors.neutral[50]};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${theme.colors.accent.gold};
  margin: ${theme.spacing['2xl']} 0;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.6s ease-out;
  transition-delay: ${props => props.delay || '0s'};
`

const TestimonialQuote = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  font-style: italic;
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.md};
`

const TestimonialAuthor = styled.cite`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.muted};
  font-style: normal;
  font-weight: ${theme.typography.weights.medium};
`

const CallToAction = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.secondary[50]};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.secondary[200]};
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
  background: ${theme.colors.secondary[600]};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.secondary[700]};
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

export default ImpactStories