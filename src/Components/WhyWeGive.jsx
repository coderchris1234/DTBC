import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const WhyWeGive = () => {
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
            <SectionLabel>Our Heart</SectionLabel>
            <MainHeading>
              Why We Give
            </MainHeading>
            <Description>
              Giving is not just about supporting the church—it's about participating 
              in God's work and expressing our gratitude for His abundant blessings. 
              When we give, we align our hearts with God's heart for the world.
            </Description>
            
            <ReasonsList>
              <ReasonItem isVisible={isVisible} delay="0.2s">
                <ReasonIcon>🙏</ReasonIcon>
                <ReasonContent>
                  <ReasonTitle>Worship & Gratitude</ReasonTitle>
                  <ReasonDescription>
                    Giving is an act of worship that expresses our thankfulness for God's provision and grace in our lives.
                  </ReasonDescription>
                </ReasonContent>
              </ReasonItem>
              
              <ReasonItem isVisible={isVisible} delay="0.4s">
                <ReasonIcon>🌱</ReasonIcon>
                <ReasonContent>
                  <ReasonTitle>Kingdom Growth</ReasonTitle>
                  <ReasonDescription>
                    Our gifts help spread the Gospel, support missions, and build God's kingdom both locally and globally.
                  </ReasonDescription>
                </ReasonContent>
              </ReasonItem>
              
              <ReasonItem isVisible={isVisible} delay="0.6s">
                <ReasonIcon>🤝</ReasonIcon>
                <ReasonContent>
                  <ReasonTitle>Community Care</ReasonTitle>
                  <ReasonDescription>
                    Together, we can care for those in need, support families, and strengthen our church community.
                  </ReasonDescription>
                </ReasonContent>
              </ReasonItem>
              
              <ReasonItem isVisible={isVisible} delay="0.8s">
                <ReasonIcon>💝</ReasonIcon>
                <ReasonContent>
                  <ReasonTitle>Spiritual Growth</ReasonTitle>
                  <ReasonDescription>
                    Generous giving cultivates trust in God and helps us grow in faith, breaking the hold of materialism.
                  </ReasonDescription>
                </ReasonContent>
              </ReasonItem>
            </ReasonsList>
          </TextContent>
          
          <ImageContent isVisible={isVisible}>
            <ImageContainer>
              <StyledImage 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8f6f0'/%3E%3Cg opacity='0.2'%3E%3Ccircle cx='200' cy='120' r='70' fill='%2396a896'/%3E%3Cpath d='M150 200 Q200 180 250 200 L240 280 Q200 300 160 280 Z' fill='%23b5967a'/%3E%3Ccircle cx='130' cy='350' r='50' fill='%23d4af37'/%3E%3Ccircle cx='270' cy='380' r='40' fill='%2396a896'/%3E%3Cpath d='M100 300 Q200 280 300 300 Q280 370 200 390 Q120 370 100 300' fill='%23b5967a' opacity='0.3'/%3E%3C/g%3E%3Ctext x='200' y='460' text-anchor='middle' font-family='serif' font-size='18' fill='%235f5f56'%3EGenerous Hearts%3C/text%3E%3C/svg%3E"
                alt="Generous giving illustration"
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
  color: ${theme.colors.secondary[600]};
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

const ReasonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const ReasonItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.6s ease-out;
  transition-delay: ${props => props.delay || '0s'};
`

const ReasonIcon = styled.div`
  font-size: ${theme.typography.sizes['2xl']};
  flex-shrink: 0;
  margin-top: ${theme.spacing.xs};
`

const ReasonContent = styled.div`
  flex: 1;
`

const ReasonTitle = styled.h3`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const ReasonDescription = styled.p`
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
  height: 500px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`

export default WhyWeGive