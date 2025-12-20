import { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'

const ContactForm = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Format the message for WhatsApp
    const whatsappMessage = `
*New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'Not provided'}
*Subject:* ${formData.subject}
*Preferred Contact:* ${formData.preferredContact}

*Message:*
${formData.message}

---
Sent from Divine Touch Bible Church website
    `.trim()
    
    // WhatsApp number (replace with actual church WhatsApp number)
    const whatsappNumber = '+2349026161344' // Church phone number
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    
    // Simulate form processing delay
    setTimeout(() => {
      // Open WhatsApp
      window.open(whatsappUrl, '_blank')
      
      // Show success modal
      setShowSuccessModal(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email'
      })
      
      setIsSubmitting(false)
      
      // Auto-hide modal after 5 seconds
      setTimeout(() => {
        setShowSuccessModal(false)
      }, 5000)
    }, 1000)
  }

  const closeSuccessModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <>
      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModalOverlay onClick={closeSuccessModal}>
          <SuccessModalContainer onClick={(e) => e.stopPropagation()}>
            <SuccessIcon>✅</SuccessIcon>
            <SuccessTitle>Message Sent Successfully!</SuccessTitle>
            <SuccessMessage>
              Your message has been sent to our WhatsApp. We'll get back to you as soon as possible.
            </SuccessMessage>
            <SuccessButton onClick={closeSuccessModal}>
              Close
            </SuccessButton>
          </SuccessModalContainer>
        </SuccessModalOverlay>
      )}
      
      <Section ref={sectionRef}>
      <Container>
        <ContentGrid>
          <FormContent isVisible={isVisible}>
            <SectionLabel>Send a Message</SectionLabel>
            <MainHeading>
              How Can We Help?
            </MainHeading>
            <Description>
              Fill out the form below and we'll get back to you as soon as possible. 
              We're here to answer questions, provide prayer, or help you get connected.
            </Description>
            
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                  <Select
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleInputChange}
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="either">Either</option>
                  </Select>
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="visit">Planning a Visit</option>
                  <option value="prayer">Prayer Request</option>
                  <option value="volunteer">Volunteer Opportunities</option>
                  <option value="ministry">Ministry Information</option>
                  <option value="other">Other</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Message *</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us how we can help you..."
                  rows="5"
                />
              </FormGroup>
              
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </Form>
          </FormContent>
          
          <ImageContent isVisible={isVisible}>
            <ImageContainer>
              <StyledImage 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8f6f0'/%3E%3Cg opacity='0.2'%3E%3Ccircle cx='200' cy='120' r='70' fill='%23b5967a'/%3E%3Cpath d='M150 220 Q200 200 250 220 L240 300 Q200 320 160 300 Z' fill='%2396a896'/%3E%3Ccircle cx='130' cy='380' r='50' fill='%23d4af37'/%3E%3Ccircle cx='270' cy='410' r='40' fill='%23b5967a'/%3E%3Cpath d='M100 350 Q200 330 300 350 Q280 420 200 440 Q120 420 100 350' fill='%2396a896' opacity='0.3'/%3E%3C/g%3E%3Ctext x='200' y='470' text-anchor='middle' font-family='serif' font-size='18' fill='%235f5f56'%3ELet%27s Connect%3C/text%3E%3C/svg%3E"
                alt="Contact us illustration"
              />
            </ImageContainer>
          </ImageContent>
        </ContentGrid>
      </Container>
    </Section>
    </>
  )
}

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// Styled Components
const SuccessModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(44, 44, 39, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out;
  padding-top: 100px;
  
  @media (max-width: 768px) {
    padding-top: 50px;
    align-items: center;
  }
`

const SuccessModalContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: ${theme.shadows.large};
  border: 1px solid ${theme.colors.neutral[200]};
  animation: ${slideDown} 0.5s ease-out;
`

const SuccessIcon = styled.div`
  font-size: ${theme.typography.sizes['5xl']};
  margin-bottom: ${theme.spacing.lg};
`

const SuccessTitle = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`

const SuccessMessage = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.xl};
`

const SuccessButton = styled.button`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.white};
  background: ${theme.colors.primary[600]};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.primary[700]};
    transform: translateY(-2px);
  }
`

const Section = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: var(--bg-secondary);
  transition: var(--transition-theme);
  
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['4xl']};
  align-items: flex-start;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
  }
`

const FormContent = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateX(${props => props.isVisible ? '0' : '-30px'});
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
  margin-bottom: ${theme.spacing['2xl']};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

const Label = styled.label`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-primary);
`

const Input = styled.input`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  padding: ${theme.spacing.md};
  border: 1px solid var(--border-color);
  border-radius: ${theme.borderRadius.lg};
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition-theme);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 3px var(--color-primary-100);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
`

const Select = styled.select`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  padding: ${theme.spacing.md};
  border: 1px solid var(--border-color);
  border-radius: ${theme.borderRadius.lg};
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition-theme);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 3px var(--color-primary-100);
  }
`

const TextArea = styled.textarea`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  padding: ${theme.spacing.md};
  border: 1px solid var(--border-color);
  border-radius: ${theme.borderRadius.lg};
  background: var(--bg-primary);
  color: var(--text-primary);
  resize: vertical;
  min-height: 120px;
  transition: var(--transition-theme);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 3px var(--color-primary-100);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
`

const SubmitButton = styled.button`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-inverse);
  background: var(--color-primary-600);
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: var(--transition-theme);
  align-self: flex-start;
  
  &:hover:not(:disabled) {
    background: var(--color-primary-700);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: var(--color-neutral-400);
    cursor: not-allowed;
  }
  
  @media (max-width: 640px) {
    width: 100%;
  }
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
    height: 300px;
  }
`

export default ContactForm