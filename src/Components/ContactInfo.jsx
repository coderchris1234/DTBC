import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { MdEmail, MdPhone, MdLocationOn, MdChat } from 'react-icons/md'
import { FaFacebookF, FaYoutube } from 'react-icons/fa'

const ContactInfo = () => {
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
        <HeaderContent isVisible={isVisible}>
          <SectionLabel>Get in Touch</SectionLabel>
          <MainHeading>
            We're Here for You
          </MainHeading>
          <Description>
            Reach out to us through any of these channels. We're committed to responding 
            promptly and connecting you with the right person for your needs.
          </Description>
        </HeaderContent>
        
        <ContactGrid>
          <ContactCard isVisible={isVisible} delay="0.1s">
            <CardIcon><MdEmail size={48} /></CardIcon>
            <CardTitle>Email Us</CardTitle>
            <CardDescription>
              Send us a message and we'll get back to you within 24 hours.
            </CardDescription>
            <ContactDetails>
              <ContactItem>
                <ContactLabel>General Inquiries:</ContactLabel>
                <ContactValue href="mailto:aitoya40@gmail.com">aitoya40@gmail.com</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Texas Campus:</ContactLabel>
                <ContactValue href="mailto:dtbctexas@gmail.com">dtbctexas@gmail.com</ContactValue>
              </ContactItem>
            </ContactDetails>
          </ContactCard>
          
          <ContactCard isVisible={isVisible} delay="0.2s">
            <CardIcon><MdPhone size={48} /></CardIcon>
            <CardTitle>Call Us</CardTitle>
            <CardDescription>
              Speak with someone from our team during office hours.
            </CardDescription>
            <ContactDetails>
              <ContactItem>
                <ContactLabel>New Jersey:</ContactLabel>
                <ContactValue href="tel:+19732020411">(973) 202-0411</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Texas:</ContactLabel>
                <ContactValue href="tel:+19732026758">(973) 202-6758</ContactValue>
              </ContactItem>
            </ContactDetails>
            <OfficeHours>
              <HoursLabel>Office Hours:</HoursLabel>
              <HoursText>Monday - Friday: 9 AM - 5 PM</HoursText>
            </OfficeHours>
          </ContactCard>
          
          <ContactCard isVisible={isVisible} delay="0.3s">
            <CardIcon><MdLocationOn size={48} /></CardIcon>
            <CardTitle>Visit Us</CardTitle>
            <CardDescription>
              Come see us in person at either of our two locations.
            </CardDescription>
            <ContactDetails>
              <ContactItem>
                <ContactLabel>New Jersey:</ContactLabel>
                <ContactAddress>
                  471 Clinton Avenue<br />
                  Newark, NJ 07108
                </ContactAddress>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Texas:</ContactLabel>
                <ContactAddress>
                  3520 FM 723 Rd<br />
                  Rosenberg, TX 77471
                </ContactAddress>
              </ContactItem>
            </ContactDetails>
          </ContactCard>
          
          <ContactCard isVisible={isVisible} delay="0.4s">
            <CardIcon><MdChat size={48} /></CardIcon>
            <CardTitle>Connect Online</CardTitle>
            <CardDescription>
              Follow us on social media for updates and community connection.
            </CardDescription>
            <SocialLinks>
              <SocialLink href="https://www.facebook.com/DivineTouchChurch" target="_blank" rel="noopener noreferrer">
                <SocialIcon><FaFacebookF size={20} /></SocialIcon>
                <SocialText>Facebook</SocialText>
              </SocialLink>
              <SocialLink href="https://www.youtube.com/@divinetouchbiblechurchnewj9570" target="_blank" rel="noopener noreferrer">
                <SocialIcon><FaYoutube size={20} /></SocialIcon>
                <SocialText>YouTube</SocialText>
              </SocialLink>
            </SocialLinks>
          </ContactCard>
        </ContactGrid>
      </Container>
    </Section>
  )
}

// Styled Components
const Section = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: ${theme.colors.white};
  
  @media (max-width: 768px) {
    padding: ${theme.spacing['2xl']} 0;
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`

const ContactCard = styled.div`
  background: ${theme.colors.neutral[50]};
  border: 1px solid ${theme.colors.neutral[200]};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  transition: all 0.3s ease;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.delay || '0s'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
    background: ${theme.colors.white};
  }
`

const CardIcon = styled.div`
  font-size: ${theme.typography.sizes['3xl']};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`

const CardTitle = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`

const CardDescription = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

const ContactLabel = styled.span`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`

const ContactValue = styled.a`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.primary[600]};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${theme.colors.primary[700]};
  }
`

const ContactAddress = styled.address`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  font-style: normal;
  line-height: ${theme.typography.lineHeights.normal};
`

const OfficeHours = styled.div`
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.neutral[200]};
`

const HoursLabel = styled.span`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.secondary};
  display: block;
  margin-bottom: ${theme.spacing.xs};
`

const HoursText = styled.span`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.primary};
`

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.neutral[200]};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.primary[50]};
    border-color: ${theme.colors.primary[300]};
    transform: translateX(5px);
  }
`

const SocialIcon = styled.span`
  font-size: ${theme.typography.sizes.xl};
`

const SocialText = styled.span`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
`

export default ContactInfo