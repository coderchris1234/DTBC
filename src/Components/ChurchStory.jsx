import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const ChurchStory = () => {
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
            <SectionLabel>Our Beginning</SectionLabel>
            <MainHeading>
              Founded on Faith, Built with Love
            </MainHeading>
            <StoryText>
              Divine Touch Bible Church USA Inc began as a vision to create a spiritual home where 
              people from all walks of life could experience God's transformative love. 
              What started as a small gathering of believers has grown into a thriving 
              community that spans across New Jersey and Texas.
            </StoryText>
            <StoryText>
              Our journey has been marked by God's faithfulness and the dedication of 
              countless individuals who believed in the power of authentic fellowship 
              and biblical teaching. Today, we continue to be guided by the same 
              principles that founded our church: love, grace, and service to others.
            </StoryText>
            
            <Timeline>
              <TimelineItem isVisible={isVisible} delay="0.2s">
                <TimelineYear>2010</TimelineYear>
                <TimelineEvent>Church founded in Newark, New Jersey</TimelineEvent>
              </TimelineItem>
              <TimelineItem isVisible={isVisible} delay="0.4s">
                <TimelineYear>2015</TimelineYear>
                <TimelineEvent>Expanded community outreach programs</TimelineEvent>
              </TimelineItem>
              <TimelineItem isVisible={isVisible} delay="0.6s">
                <TimelineYear>2020</TimelineYear>
                <TimelineEvent>Opened second location in Rosenberg, Texas</TimelineEvent>
              </TimelineItem>
            </Timeline>
          </TextContent>
          
          <ImageContent isVisible={isVisible}>
            <ImageContainer>
              <StyledImage 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8f6f0'/%3E%3Cg opacity='0.15'%3E%3Cpath d='M200 50 L350 150 L350 400 L50 400 L50 150 Z' fill='%23b5967a' stroke='%23b5967a' stroke-width='2'/%3E%3Crect x='180' y='200' width='40' height='80' fill='%2396a896'/%3E%3Cpath d='M170 150 L200 120 L230 150 Z' fill='%23b5967a'/%3E%3Ccircle cx='200' cy='180' r='15' fill='%23d4af37'/%3E%3C/g%3E%3Ctext x='200' y='460' text-anchor='middle' font-family='serif' font-size='18' fill='%235f5f56'%3EFounded on Faith%3C/text%3E%3C/svg%3E"
                alt="Church building illustration"
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

const StoryText = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.lg};
`

const Timeline = styled.div`
  margin-top: ${theme.spacing['2xl']};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.6s ease-out;
  transition-delay: ${props => props.delay || '0s'};
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.xs};
  }
`

const TimelineYear = styled.div`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.primary[600]};
  min-width: 80px;
`

const TimelineEvent = styled.div`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  flex: 1;
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

export default ChurchStory