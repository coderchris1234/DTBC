import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const VisionSection = () => {
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
        <HeaderContent isVisible={isVisible}>
          <SectionLabel>Our Vision</SectionLabel>
          <MainHeading>
            Four Pillars of Faith
          </MainHeading>
          <Description>
            Our mission is built on four foundational principles that guide everything we do. 
            These pillars represent our commitment to helping each person grow in their spiritual journey.
          </Description>
        </HeaderContent>
        
        <PillarsGrid>
          <Pillar isVisible={isVisible} delay="0.1s">
            <PillarIcon>🙏</PillarIcon>
            <PillarContent>
              <PillarTitle>Know God</PillarTitle>
              <PillarDescription>
                Discover the depth of God's love through personal relationship, prayer, and His Word. 
                Experience transformation as you draw closer to Him.
              </PillarDescription>
            </PillarContent>
          </Pillar>
          
          <Pillar isVisible={isVisible} delay="0.2s">
            <PillarIcon>👥</PillarIcon>
            <PillarContent>
              <PillarTitle>Find Community</PillarTitle>
              <PillarDescription>
                Build lasting friendships and find your place in a family that supports, 
                encourages, and walks alongside you in faith.
              </PillarDescription>
            </PillarContent>
          </Pillar>
          
          <Pillar isVisible={isVisible} delay="0.3s">
            <PillarIcon>🌟</PillarIcon>
            <PillarContent>
              <PillarTitle>Discover Purpose</PillarTitle>
              <PillarDescription>
                Uncover God's unique plan for your life and learn to use your gifts 
                and talents to make a meaningful impact in the world.
              </PillarDescription>
            </PillarContent>
          </Pillar>
          
          <Pillar isVisible={isVisible} delay="0.4s">
            <PillarIcon>❤️</PillarIcon>
            <PillarContent>
              <PillarTitle>Make A Difference</PillarTitle>
              <PillarDescription>
                Serve others with compassion and love, extending God's grace to our 
                community and beyond through acts of service and kindness.
              </PillarDescription>
            </PillarContent>
          </Pillar>
        </PillarsGrid>
      </Container>
    </Section>
  )
}

// Styled Components
const Section = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  background: ${theme.colors.neutral[50]};
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

const MainHeading = styled.h2`
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

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing['2xl']};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`

const Pillar = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.subtle};
  border: 1px solid ${theme.colors.neutral[200]};
  transition: all 0.3s ease;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.delay || '0s'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`

const PillarIcon = styled.div`
  font-size: ${theme.typography.sizes['4xl']};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`

const PillarContent = styled.div`
  text-align: center;
`

const PillarTitle = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`

const PillarDescription = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
`

export default VisionSection