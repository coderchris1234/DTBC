import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const GivingOptions = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showInPersonInfo, setShowInPersonInfo] = useState(false)
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

  const handleZelleClick = () => {
    // Open Zelle website in a new tab
    window.open('https://www.zellepay.com/', '_blank')
  }

  const handleInPersonClick = () => {
    setShowInPersonInfo(!showInPersonInfo)
  }

  const handleCheckClick = () => {
    const emailSubject = encodeURIComponent('Mailing Address Request')
    const emailBody = encodeURIComponent('Hello, I would like to get the mailing address for sending my check donation. Thank you!')
    const mailtoLink = `mailto:parakletos319@yahoo.com?subject=${emailSubject}&body=${emailBody}`
    
    // Try to open email client
    window.location.href = mailtoLink
    
    // Show a backup message after a short delay
    setTimeout(() => {
      if (confirm('If your email client did not open, would you like to copy the email address to your clipboard?')) {
        navigator.clipboard.writeText('parakletos319@yahoo.com').then(() => {
          alert('Email address copied: parakletos319@yahoo.com\n\nPlease send an email requesting the mailing address.')
        }).catch(() => {
          alert('Email: parakletos319@yahoo.com\n\nPlease send an email requesting the mailing address for check donations.')
        })
      }
    }, 1000)
  }

  return (
    <Section ref={sectionRef}>
      <Container>
        <HeaderContent isVisible={isVisible}>
          <SectionLabel>Ways to Give</SectionLabel>
          <MainHeading>
            Choose Your Giving Method
          </MainHeading>
          <Description>
            We've made it easy and secure for you to give in the way that works best for you. 
            Every gift, regardless of size, makes a meaningful difference in our ministry.
          </Description>
        </HeaderContent>
        
        <GivingGrid>
          <GivingCard isVisible={isVisible} delay="0.1s" featured>
            <CardIcon>📱</CardIcon>
            <CardTitle>Zelle Transfer</CardTitle>
            <CardDescription>
              Send your tithe and offerings quickly and securely using Zelle. 
              Simply use our email address to send your gift directly from your bank app.
            </CardDescription>
            <ZelleInfo>
              <ZelleLabel>Zelle Email:</ZelleLabel>
              <ZelleEmail>parakletos319@yahoo.com</ZelleEmail>
            </ZelleInfo>
            <CardFeatures>
              <Feature>✓ Instant transfer</Feature>
              <Feature>✓ No transaction fees</Feature>
              <Feature>✓ Bank-to-bank secure</Feature>
            </CardFeatures>
            <CardButton primary onClick={handleZelleClick}>
              Use Zelle
            </CardButton>
          </GivingCard>
          
          <GivingCard isVisible={isVisible} delay="0.2s">
            <CardIcon>💰</CardIcon>
            <CardTitle>In-Person Giving</CardTitle>
            <CardDescription>
              Bring your tithe and offerings during our worship services. 
              We have offering boxes available for your convenience.
            </CardDescription>
            <CardFeatures>
              <Feature>✓ Cash or check</Feature>
              <Feature>✓ During service</Feature>
              <Feature>✓ Traditional method</Feature>
            </CardFeatures>
            <CardButton onClick={handleInPersonClick}>
              {showInPersonInfo ? 'Hide Details' : 'Learn More'}
            </CardButton>
          </GivingCard>
          
          <GivingCard isVisible={isVisible} delay="0.3s">
            <CardIcon>✉️</CardIcon>
            <CardTitle>Mail Your Check</CardTitle>
            <CardDescription>
              Send your check by mail to our church office. 
              Please make checks payable to the name below.
            </CardDescription>
            <CheckInfo>
              <CheckLabel>Payable to:</CheckLabel>
              <CheckPayee>Divine Touch Bible Church Intl Inc</CheckPayee>
            </CheckInfo>
            <CardFeatures>
              <Feature>✓ Traditional giving</Feature>
              <Feature>✓ Tax deductible</Feature>
              <Feature>✓ Secure by mail</Feature>
            </CardFeatures>
            <CardButton onClick={handleCheckClick}>
              Get Address
            </CardButton>
          </GivingCard>
        </GivingGrid>
        
        {showInPersonInfo && (
          <InPersonSection isVisible={showInPersonInfo}>
            <InPersonTitle>In-Person Offering Guidelines</InPersonTitle>
            <InPersonContent>
              <InPersonItem>
                <InPersonIcon>🕐</InPersonIcon>
                <InPersonText>
                  <InPersonLabel>When to Give</InPersonLabel>
                  <InPersonDescription>
                    Offering time is during our worship services on Sundays and Wednesdays. 
                    Look for the designated offering moment in the service.
                  </InPersonDescription>
                </InPersonText>
              </InPersonItem>
              
              <InPersonItem>
                <InPersonIcon>📦</InPersonIcon>
                <InPersonText>
                  <InPersonLabel>Offering Boxes</InPersonLabel>
                  <InPersonDescription>
                    We have offering boxes located at the front and back of the sanctuary. 
                    You can also give during the offering collection.
                  </InPersonDescription>
                </InPersonText>
              </InPersonItem>
              
              <InPersonItem>
                <InPersonIcon>💵</InPersonIcon>
                <InPersonText>
                  <InPersonLabel>Cash & Checks</InPersonLabel>
                  <InPersonDescription>
                    Both cash and checks are welcome. For checks, please make them payable to 
                    "Divine Touch Bible Church Intl Inc" for proper processing.
                  </InPersonDescription>
                </InPersonText>
              </InPersonItem>
              
              <InPersonItem>
                <InPersonIcon>📋</InPersonIcon>
                <InPersonText>
                  <InPersonLabel>Giving Envelopes</InPersonLabel>
                  <InPersonDescription>
                    Offering envelopes are available at the entrance. Please include your name 
                    and contact information for tax receipt purposes.
                  </InPersonDescription>
                </InPersonText>
              </InPersonItem>
            </InPersonContent>
          </InPersonSection>
        )}
        
        <SecurityNote isVisible={isVisible} delay="0.5s">
          <SecurityIcon>🔒</SecurityIcon>
          <SecurityContent>
            <SecurityTitle>Your Security Matters</SecurityTitle>
            <SecurityText>
              All online transactions are processed through secure, encrypted connections. 
              We never store your financial information, and your privacy is always protected.
            </SecurityText>
          </SecurityContent>
        </SecurityNote>
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
`

const GivingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`

const GivingCard = styled.div`
  background: ${theme.colors.white};
  border: ${props => props.featured ? `2px solid ${theme.colors.secondary[300]}` : `1px solid ${theme.colors.neutral[200]}`};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  text-align: center;
  transition: all 0.3s ease;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.delay || '0s'};
  position: relative;
  
  ${props => props.featured && `
    background: ${theme.colors.secondary[50]};
    
    &::before {
      content: 'Recommended';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      background: ${theme.colors.secondary[600]};
      color: ${theme.colors.white};
      padding: ${theme.spacing.xs} ${theme.spacing.md};
      border-radius: ${theme.borderRadius.full};
      font-family: ${theme.typography.fonts.secondary};
      font-size: ${theme.typography.sizes.xs};
      font-weight: ${theme.typography.weights.medium};
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  `}
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`

const CardIcon = styled.div`
  font-size: ${theme.typography.sizes['4xl']};
  margin-bottom: ${theme.spacing.lg};
`

const CardTitle = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`

const CardDescription = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.lg};
`

const CardFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${theme.spacing.lg} 0;
  text-align: left;
`

const Feature = styled.li`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xs};
  padding-left: ${theme.spacing.md};
`

const ZelleInfo = styled.div`
  background: ${theme.colors.secondary[50]};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing.lg} 0;
  border: 1px solid ${theme.colors.secondary[200]};
`

const ZelleLabel = styled.div`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xs};
`

const ZelleEmail = styled.div`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.secondary[700]};
  word-break: break-all;
`

const CheckInfo = styled.div`
  background: ${theme.colors.primary[50]};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing.lg} 0;
  border: 1px solid ${theme.colors.primary[200]};
`

const CheckLabel = styled.div`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xs};
`

const CheckPayee = styled.div`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.primary[700]};
`

const InPersonSection = styled.div`
  background: ${theme.colors.neutral[50]};
  border: 1px solid ${theme.colors.neutral[200]};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['2xl']};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.5s ease-out;
`

const InPersonTitle = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`

const InPersonContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`

const InPersonItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
`

const InPersonIcon = styled.div`
  font-size: ${theme.typography.sizes.xl};
  flex-shrink: 0;
  margin-top: ${theme.spacing.xs};
`

const InPersonText = styled.div`
  flex: 1;
`

const InPersonLabel = styled.h4`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const InPersonDescription = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.normal};
`

const CardButton = styled.button`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: ${props => props.primary ? theme.colors.white : theme.colors.secondary[600]};
  background: ${props => props.primary ? theme.colors.secondary[600] : 'transparent'};
  border: 2px solid ${theme.colors.secondary[600]};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: ${props => props.primary ? theme.colors.secondary[700] : theme.colors.secondary[50]};
    transform: translateY(-2px);
  }
`

const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  background: ${theme.colors.primary[50]};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.primary[200]};
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

const SecurityIcon = styled.div`
  font-size: ${theme.typography.sizes['3xl']};
  flex-shrink: 0;
`

const SecurityContent = styled.div`
  flex: 1;
`

const SecurityTitle = styled.h4`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const SecurityText = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.normal};
`

export default GivingOptions