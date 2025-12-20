import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const WelcomeSection = () => {
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
            <SectionLabel>Our Community</SectionLabel>
            <MainHeading>
              A Place Where Every Heart Finds Home
            </MainHeading>
            <Description>
              At Divine Touch Bible Church, we believe that faith flourishes in community. 
              Whether you're taking your first steps in faith or have walked with God for years, 
              you'll find a warm welcome and genuine fellowship here.
            </Description>
            
            <FeatureList>
              <Feature isVisible={isVisible} delay="0.2s">
                <FeatureIcon>🤝</FeatureIcon>
                <FeatureText>
                  <FeatureTitle>Authentic Fellowship</FeatureTitle>
                  <FeatureDescription>
                    Build meaningful relationships in a community that cares
                  </FeatureDescription>
                </FeatureText>
              </Feature>
              
              <Feature isVisible={isVisible} delay="0.4s">
                <FeatureIcon>📖</FeatureIcon>
                <FeatureText>
                  <FeatureTitle>Biblical Teaching</FeatureTitle>
                  <FeatureDescription>
                    Grow in understanding through thoughtful, relevant messages
                  </FeatureDescription>
                </FeatureText>
              </Feature>
              
              <Feature isVisible={isVisible} delay="0.6s">
                <FeatureIcon>🌱</FeatureIcon>
                <FeatureText>
                  <FeatureTitle>Spiritual Growth</FeatureTitle>
                  <FeatureDescription>
                    Discover your purpose and deepen your relationship with God
                  </FeatureDescription>
                </FeatureText>
              </Feature>
            </FeatureList>
          </TextContent>
          
          <ImageContent isVisible={isVisible}>
            <ImageContainer>
              <StyledImage 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f8f6f0'/%3E%3Cg opacity='0.1'%3E%3Ccircle cx='100' cy='100' r='50' fill='%23b5967a'/%3E%3Ccircle cx='300' cy='200' r='30' fill='%2396a896'/%3E%3Cpath d='M50 250 Q200 150 350 250' stroke='%23b5967a' stroke-width='2' fill='none'/%3E%3C/g%3E%3Ctext x='200' y='160' text-anchor='middle' font-family='serif' font-size='24' fill='%235f5f56'%3ECommunity%3C/text%3E%3C/svg%3E"
                alt="Church community illustration"
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

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.6s ease-out;
  transition-delay: ${props => props.delay || '0s'};
`

const FeatureIcon = styled.div`
  font-size: ${theme.typography.sizes['2xl']};
  flex-shrink: 0;
  margin-top: ${theme.spacing.xs};
`

const FeatureText = styled.div`
  flex: 1;
`

const FeatureTitle = styled.h3`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const FeatureDescription = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.normal};
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
  height: 400px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`

export default WelcomeSection