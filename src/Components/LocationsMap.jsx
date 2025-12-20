import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime, MdMap, MdChat } from 'react-icons/md'

const LocationsMap = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeLocation, setActiveLocation] = useState('nj')
  const sectionRef = useRef(null)

  useEffect(() => {
    // Check if it's mobile view
    const isMobile = window.innerWidth <= 768
    
    if (isMobile) {
      // On mobile, make visible immediately
      setIsVisible(true)
    } else {
      // On desktop, use intersection observer
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
    }
  }, [])

  const locations = {
    nj: {
      name: 'New Jersey Campus',
      address: '471 Clinton Avenue, Newark, NJ 07108',
      phone: '(973) 202-0411',
      email: 'aitoya40@gmail.com',
      services: ['Sunday 9:45 AM', 'Wednesday 6:00 PM'],
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-74.17209968459391!3d40.73061797932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25370329b8e0d%3A0x4e8c0c8b8b8b8b8b!2s471%20Clinton%20Ave%2C%20Newark%2C%20NJ%2007108!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus'
    },
    tx: {
      name: 'Texas Campus',
      address: '3520 FM 723 Rd, Rosenberg, TX 77471',
      phone: '(973) 202-6758',
      email: 'dtbctexas@gmail.com',
      services: ['Sunday 9:00 AM', 'Wednesday 6:00 PM'],
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.123456789!2d-95.80123456789!3d29.55123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c123456789ab%3A0x123456789abcdef0!2s3520%20FM%20723%20Rd%2C%20Rosenberg%2C%20TX%2077471!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus'
    }
  }

  return (
    <Section ref={sectionRef}>
      <Container>
        <HeaderContent isVisible={isVisible}>
          <SectionLabel>Find Us</SectionLabel>
          <MainHeading>
            Our Locations
          </MainHeading>
          <Description>
            We have two campuses to serve you better. Choose the location that's most convenient for you.
          </Description>
        </HeaderContent>
        
        <LocationTabs>
          <TabButton 
            active={activeLocation === 'nj'} 
            onClick={() => setActiveLocation('nj')}
            isVisible={isVisible}
            delay="0.1s"
          >
            New Jersey
          </TabButton>
          <TabButton 
            active={activeLocation === 'tx'} 
            onClick={() => setActiveLocation('tx')}
            isVisible={isVisible}
            delay="0.2s"
          >
            Texas
          </TabButton>
        </LocationTabs>
        
        <LocationContent isVisible={isVisible} delay="0.3s">
          <LocationInfo>
            <LocationName>{locations[activeLocation].name}</LocationName>
            <LocationDetails>
              <DetailItem>
                <DetailIcon><MdLocationOn size={20} /></DetailIcon>
                <DetailText>{locations[activeLocation].address}</DetailText>
              </DetailItem>
              <DetailItem>
                <DetailIcon><MdPhone size={20} /></DetailIcon>
                <DetailText>{locations[activeLocation].phone}</DetailText>
              </DetailItem>
              <DetailItem>
                <DetailIcon><MdEmail size={20} /></DetailIcon>
                <DetailText>{locations[activeLocation].email}</DetailText>
              </DetailItem>
              <DetailItem>
                <DetailIcon><MdAccessTime size={20} /></DetailIcon>
                <DetailText>
                  {locations[activeLocation].services.join(' • ')}
                </DetailText>
              </DetailItem>
            </LocationDetails>
            
            <DirectionsButton 
              onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(locations[activeLocation].address)}`, '_blank')}
            >
              Get Directions
            </DirectionsButton>
          </LocationInfo>
          
          <MapContainer>
            <MapPlaceholder>
              <MapIcon><MdMap size={48} /></MapIcon>
              <MapText>Interactive Map</MapText>
              <MapSubtext>Click "Get Directions" for navigation</MapSubtext>
            </MapPlaceholder>
          </MapContainer>
        </LocationContent>
        
        <ContactPrompt isVisible={isVisible} delay="0.5s">
          <PromptIcon><MdChat size={32} /></PromptIcon>
          <PromptContent>
            <PromptTitle>Need Help Finding Us?</PromptTitle>
            <PromptText>
              Don't hesitate to call or email us if you need directions or have any questions about visiting.
            </PromptText>
          </PromptContent>
        </ContactPrompt>
      </Container>
    </Section>
  )
}

// Styled Components
const Section = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  background: var(--bg-primary);
  transition: var(--transition-theme);
  
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
  margin: 0 auto ${theme.spacing['3xl']};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
`

const SectionLabel = styled.span`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: var(--color-primary-600);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: ${theme.spacing.md};
  display: block;
`

const MainHeading = styled.h2`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['4xl']};
  font-weight: ${theme.typography.weights.light};
  color: var(--text-primary);
  line-height: ${theme.typography.lineHeights.tight};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.sizes['3xl']};
  }
`

const Description = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.lg};
  color: var(--text-secondary);
  line-height: ${theme.typography.lineHeights.relaxed};
`

const LocationTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing['2xl']};
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`

const TabButton = styled.button`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: ${props => props.active ? theme.colors.white : theme.colors.primary[600]};
  background: ${props => props.active ? theme.colors.primary[600] : 'transparent'};
  border: 2px solid ${theme.colors.primary[600]};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.6s ease-out;
  transition-delay: ${props => props.delay || '0s'};
  
  &:hover {
    background: ${props => props.active ? theme.colors.primary[700] : theme.colors.primary[50]};
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    width: 200px;
  }
`

const LocationContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['2xl']};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.delay || '0s'};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`

const LocationInfo = styled.div`
  background: ${theme.colors.neutral[50]};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.neutral[200]};
`

const LocationName = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
`

const LocationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
`

const DetailIcon = styled.div`
  font-size: ${theme.typography.sizes.lg};
  flex-shrink: 0;
  margin-top: ${theme.spacing.xs};
`

const DetailText = styled.div`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.normal};
`

const DirectionsButton = styled.button`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.white};
  background: ${theme.colors.primary[600]};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: ${theme.colors.primary[700]};
    transform: translateY(-2px);
  }
`

const MapContainer = styled.div`
  background: ${theme.colors.accent.cream};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  border: 1px solid ${theme.colors.neutral[200]};
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MapPlaceholder = styled.div`
  text-align: center;
  color: ${theme.colors.text.muted};
`

const MapIcon = styled.div`
  font-size: ${theme.typography.sizes['4xl']};
  margin-bottom: ${theme.spacing.md};
`

const MapText = styled.div`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.medium};
  margin-bottom: ${theme.spacing.xs};
`

const MapSubtext = styled.div`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.sm};
`

const ContactPrompt = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  background: ${theme.colors.secondary[50]};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.secondary[200]};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.delay || '0s'};
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: ${theme.spacing.md};
  }
`

const PromptIcon = styled.div`
  font-size: ${theme.typography.sizes['3xl']};
  flex-shrink: 0;
`

const PromptContent = styled.div`
  flex: 1;
`

const PromptTitle = styled.h4`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const PromptText = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.normal};
`

export default LocationsMap