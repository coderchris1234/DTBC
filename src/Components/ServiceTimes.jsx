import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const ServiceTimes = () => {
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
    <Section id="service-times" ref={sectionRef}>
      <Container>
        <HeaderContent isVisible={isVisible}>
          <SectionLabel>Service Times</SectionLabel>
          <MainHeading>
            Join Us for Worship
          </MainHeading>
          <Description>
            We gather together to worship, learn, and grow in community. 
            All services include inspiring music, relevant teaching, and warm fellowship.
          </Description>
        </HeaderContent>
        
        <ServicesGrid>
          <ServiceCard isVisible={isVisible} delay="0.1s" featured>
            <ServiceIcon>🌅</ServiceIcon>
            <ServiceLocation>New Jersey</ServiceLocation>
            <ServiceTime>Sunday 9:45 AM</ServiceTime>
            <ServiceAddress>
              471 Clinton Avenue<br />
              Newark, NJ 07108
            </ServiceAddress>
            <ServiceNote>Main Sunday Service</ServiceNote>
          </ServiceCard>
          
          <ServiceCard isVisible={isVisible} delay="0.2s" featured>
            <ServiceIcon>🌅</ServiceIcon>
            <ServiceLocation>Texas</ServiceLocation>
            <ServiceTime>Sunday 9:00 AM</ServiceTime>
            <ServiceAddress>
              3520 FM 723 Rd<br />
              Rosenberg, TX 77471
            </ServiceAddress>
            <ServiceNote>Main Sunday Service</ServiceNote>
          </ServiceCard>
          
          <ServiceCard isVisible={isVisible} delay="0.3s">
            <ServiceIcon>🌙</ServiceIcon>
            <ServiceLocation>Both Locations</ServiceLocation>
            <ServiceTime>Wednesday 6:00 PM</ServiceTime>
            <ServiceAddress>
              Mid-week Bible Study<br />
              & Prayer Meeting
            </ServiceAddress>
            <ServiceNote>Bible Study & Prayer</ServiceNote>
          </ServiceCard>
        </ServicesGrid>
        
        <AdditionalInfo isVisible={isVisible} delay="0.4s">
          <InfoCard>
            <InfoIcon>⏰</InfoIcon>
            <InfoContent>
              <InfoTitle>Arrive Early</InfoTitle>
              <InfoText>We recommend arriving 15 minutes before service to find parking and get settled.</InfoText>
            </InfoContent>
          </InfoCard>
          
          <InfoCard>
            <InfoIcon>👨‍👩‍👧‍👦</InfoIcon>
            <InfoContent>
              <InfoTitle>Children's Ministry</InfoTitle>
              <InfoText>Age-appropriate programs available for children during all Sunday services.</InfoText>
            </InfoContent>
          </InfoCard>
          
          <InfoCard>
            <InfoIcon>☕</InfoIcon>
            <InfoContent>
              <InfoTitle>Fellowship Time</InfoTitle>
              <InfoText>Join us for coffee and conversation after each Sunday service.</InfoText>
            </InfoContent>
          </InfoCard>
        </AdditionalInfo>
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
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`

const ServiceCard = styled.div`
  background: ${props => props.featured ? theme.colors.primary[50] : theme.colors.white};
  border: ${props => props.featured ? `2px solid ${theme.colors.primary[200]}` : `1px solid ${theme.colors.neutral[200]}`};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  text-align: center;
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

const ServiceIcon = styled.div`
  font-size: ${theme.typography.sizes['3xl']};
  margin-bottom: ${theme.spacing.md};
`

const ServiceLocation = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const ServiceTime = styled.div`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.primary[600]};
  margin-bottom: ${theme.spacing.md};
`

const ServiceAddress = styled.address`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  font-style: normal;
  line-height: ${theme.typography.lineHeights.normal};
  margin-bottom: ${theme.spacing.md};
`

const ServiceNote = styled.div`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.primary[600]};
  font-weight: ${theme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${theme.colors.primary[100]};
  border-radius: ${theme.borderRadius.full};
  display: inline-block;
`

const AdditionalInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.delay || '0s'};
`

const InfoCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.neutral[50]};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.neutral[200]};
`

const InfoIcon = styled.div`
  font-size: ${theme.typography.sizes.xl};
  flex-shrink: 0;
  margin-top: ${theme.spacing.xs};
`

const InfoContent = styled.div`
  flex: 1;
`

const InfoTitle = styled.h4`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const InfoText = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.normal};
`

export default ServiceTimes