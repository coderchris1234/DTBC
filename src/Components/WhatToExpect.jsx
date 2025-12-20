import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const WhatToExpect = () => {
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
            <SectionLabel>First Visit</SectionLabel>
            <MainHeading>
              What to Expect
            </MainHeading>
            <Description>
              We want your first visit to feel comfortable and welcoming. 
              Here's what you can expect when you join us for worship.
            </Description>
            
            <ExpectationsList>
              <ExpectationItem isVisible={isVisible} delay="0.2s">
                <ExpectationNumber>1</ExpectationNumber>
                <ExpectationContent>
                  <ExpectationTitle>Warm Welcome</ExpectationTitle>
                  <ExpectationDescription>
                    Our greeting team will welcome you at the door and help you find your way around.
                  </ExpectationDescription>
                </ExpectationContent>
              </ExpectationItem>
              
              <ExpectationItem isVisible={isVisible} delay="0.4s">
                <ExpectationNumber>2</ExpectationNumber>
                <ExpectationContent>
                  <ExpectationTitle>Inspiring Worship</ExpectationTitle>
                  <ExpectationDescription>
                    Experience uplifting music and heartfelt worship that draws you closer to God.
                  </ExpectationDescription>
                </ExpectationContent>
              </ExpectationItem>
              
              <ExpectationItem isVisible={isVisible} delay="0.6s">
                <ExpectationNumber>3</ExpectationNumber>
                <ExpectationContent>
                  <ExpectationTitle>Relevant Teaching</ExpectationTitle>
                  <ExpectationDescription>
                    Hear practical, biblical messages that speak to real life and everyday challenges.
                  </ExpectationDescription>
                </ExpectationContent>
              </ExpectationItem>
              
              <ExpectationItem isVisible={isVisible} delay="0.8s">
                <ExpectationNumber>4</ExpectationNumber>
                <ExpectationContent>
                  <ExpectationTitle>Genuine Fellowship</ExpectationTitle>
                  <ExpectationDescription>
                    Connect with friendly people who are excited to get to know you better.
                  </ExpectationDescription>
                </ExpectationContent>
              </ExpectationItem>
            </ExpectationsList>
          </TextContent>
          
          <ImageContent isVisible={isVisible}>
            <ImageContainer>
              <StyledImage 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8f6f0'/%3E%3Cg opacity='0.2'%3E%3Ccircle cx='200' cy='100' r='60' fill='%23b5967a'/%3E%3Crect x='150' y='180' width='100' height='120' rx='10' fill='%2396a896'/%3E%3Ccircle cx='120' cy='350' r='40' fill='%23d4af37'/%3E%3Ccircle cx='280' cy='380' r='35' fill='%23b5967a'/%3E%3Cpath d='M100 250 Q200 230 300 250 Q280 320 200 340 Q120 320 100 250' fill='%2396a896' opacity='0.3'/%3E%3C/g%3E%3Ctext x='200' y='460' text-anchor='middle' font-family='serif' font-size='18' fill='%235f5f56'%3EWelcome Home%3C/text%3E%3C/svg%3E"
                alt="Welcome experience illustration"
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
  background: ${theme.colors.neutral[50]};
  
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

const ExpectationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const ExpectationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.6s ease-out;
  transition-delay: ${props => props.delay || '0s'};
`

const ExpectationNumber = styled.div`
  width: 40px;
  height: 40px;
  background: ${theme.colors.primary[600]};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.semibold};
  flex-shrink: 0;
  margin-top: ${theme.spacing.xs};
`

const ExpectationContent = styled.div`
  flex: 1;
`

const ExpectationTitle = styled.h3`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const ExpectationDescription = styled.p`
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

export default WhatToExpect