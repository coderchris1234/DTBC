import { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'
import { MdPhoneAndroid, MdAttachMoney, MdEmail, MdAccessTime, MdInventory, MdPayment, MdAssignment, MdSecurity, MdClose, MdContentCopy, MdCheck } from 'react-icons/md'

const GivingOptions = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showInPersonInfo, setShowInPersonInfo] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    // Check if it's mobile view
    const isMobile = window.innerWidth <= 768
    
    if (isMobile) {
      // On mobile, make visible immediately with a timeout to avoid cascading renders
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 0)
      
      return () => clearTimeout(timer)
    } else {
      // On desktop, use intersection observer
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
    
    // Reset copied state and show the modal
    setEmailCopied(false)
    setShowAddressModal(true)
    
    // Auto-hide modal after 8 seconds
    setTimeout(() => {
      setShowAddressModal(false)
    }, 8000)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('parakletos319@yahoo.com').then(() => {
      setEmailCopied(true)
      // Reset the copied state after 3 seconds
      setTimeout(() => {
        setEmailCopied(false)
      }, 3000)
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = 'parakletos319@yahoo.com'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setEmailCopied(true)
      // Reset the copied state after 3 seconds
      setTimeout(() => {
        setEmailCopied(false)
      }, 3000)
    })
  }

  const closeAddressModal = () => {
    setShowAddressModal(false)
    setEmailCopied(false) // Reset copied state when modal closes
  }

  return (
    <>
      {/* Address Request Modal */}
      {showAddressModal && (
        <AddressModal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Mailing Address Request</ModalTitle>
              <CloseButton onClick={closeAddressModal}>
                <MdClose size={20} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <ModalText>
                We've opened your email client to send a request for our mailing address.
              </ModalText>
              <ModalText>
                If your email didn't open, please copy our email address below and send us a message:
              </ModalText>
              <EmailCopySection>
                <EmailAddress>parakletos319@yahoo.com</EmailAddress>
                <CopyButton onClick={handleCopyEmail} copied={emailCopied}>
                  {emailCopied ? (
                    <>
                      <MdCheck size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <MdContentCopy size={16} />
                      Copy Email
                    </>
                  )}
                </CopyButton>
              </EmailCopySection>
            </ModalBody>
          </ModalContent>
        </AddressModal>
      )}
      
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
            <CardIcon><MdPhoneAndroid size={48} /></CardIcon>
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
            <CardIcon><MdAttachMoney size={48} /></CardIcon>
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
            <CardIcon><MdEmail size={48} /></CardIcon>
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
                <InPersonIcon><MdAccessTime size={24} /></InPersonIcon>
                <InPersonText>
                  <InPersonLabel>When to Give</InPersonLabel>
                  <InPersonDescription>
                    Offering time is during our worship services on Sundays and Wednesdays. 
                    Look for the designated offering moment in the service.
                  </InPersonDescription>
                </InPersonText>
              </InPersonItem>
              
              <InPersonItem>
                <InPersonIcon><MdInventory size={24} /></InPersonIcon>
                <InPersonText>
                  <InPersonLabel>Offering Boxes</InPersonLabel>
                  <InPersonDescription>
                    We have offering boxes located at the front and back of the sanctuary. 
                    You can also give during the offering collection.
                  </InPersonDescription>
                </InPersonText>
              </InPersonItem>
              
              <InPersonItem>
                <InPersonIcon><MdPayment size={24} /></InPersonIcon>
                <InPersonText>
                  <InPersonLabel>Cash & Checks</InPersonLabel>
                  <InPersonDescription>
                    Both cash and checks are welcome. For checks, please make them payable to 
                    "Divine Touch Bible Church Intl Inc" for proper processing.
                  </InPersonDescription>
                </InPersonText>
              </InPersonItem>
              
              <InPersonItem>
                <InPersonIcon><MdAssignment size={24} /></InPersonIcon>
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
          <SecurityIcon><MdSecurity size={32} /></SecurityIcon>
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
    </>
  )
}

// Animations
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

// Modal Styled Components
const AddressModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out;
`

const ModalContent = styled.div`
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 0 0 ${theme.borderRadius.xl} ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.large};
  max-width: 500px;
  margin: 0 auto;
  animation: ${slideDown} 0.5s ease-out;
  overflow: hidden;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: var(--color-primary-50);
  border-bottom: 1px solid var(--border-color);
`

const ModalTitle = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-primary);
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.md};
  transition: var(--transition-theme);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }
`

const ModalBody = styled.div`
  padding: ${theme.spacing.xl};
`

const ModalText = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: var(--text-secondary);
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.md};
  
  &:last-of-type {
    margin-bottom: ${theme.spacing.lg};
  }
`

const EmailCopySection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: ${theme.borderRadius.lg};
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`

const EmailAddress = styled.span`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: var(--color-primary-600);
  flex: 1;
  word-break: break-all;
`

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-inverse);
  background: ${props => props.copied ? 'var(--color-secondary-600)' : 'var(--color-primary-600)'};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: var(--transition-theme);
  white-space: nowrap;
  min-width: 100px;
  justify-content: center;
  
  &:hover {
    background: ${props => props.copied ? 'var(--color-secondary-700)' : 'var(--color-primary-700)'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`

// Styled Components
const Section = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  background: var(--bg-secondary);
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
  margin: 0 auto ${theme.spacing['4xl']};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
`

const SectionLabel = styled.span`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: var(--color-secondary-600);
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

const GivingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
  
  @media (max-width: 480px) {
    gap: ${theme.spacing.md};
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