import { useState } from 'react'
import styled from 'styled-components'

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneType: 'Mobile',
    countryCode: '+1',
    phoneNumber: '',
    addressType: 'Home',
    streetAddress: '',
    aptUnit: '',
    city: '',
    state: '',
    zipCode: '',
    maritalStatus: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const maritalStatusOptions = [
    { value: '', label: 'Select Marital Status' },
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' }
  ]

  const phoneTypeOptions = [
    { value: 'Mobile', label: 'Mobile' },
    { value: 'Home', label: 'Home' },
    { value: 'Work', label: 'Work' }
  ]

  const countryCodeOptions = [
    { value: '+1', label: '+1 (US/CA)', flag: '🇺🇸' },
    { value: '+44', label: '+44 (UK)', flag: '🇬🇧' },
    { value: '+234', label: '+234 (NG)', flag: '🇳🇬' },
    { value: '+33', label: '+33 (FR)', flag: '🇫🇷' },
    { value: '+49', label: '+49 (DE)', flag: '🇩🇪' },
    { value: '+91', label: '+91 (IN)', flag: '🇮🇳' },
    { value: '+86', label: '+86 (CN)', flag: '🇨🇳' },
    { value: '+81', label: '+81 (JP)', flag: '🇯🇵' },
    { value: '+82', label: '+82 (KR)', flag: '🇰🇷' },
    { value: '+61', label: '+61 (AU)', flag: '🇦🇺' },
    { value: '+55', label: '+55 (BR)', flag: '🇧🇷' },
    { value: '+52', label: '+52 (MX)', flag: '🇲🇽' },
    { value: '+39', label: '+39 (IT)', flag: '🇮🇹' },
    { value: '+34', label: '+34 (ES)', flag: '🇪🇸' },
    { value: '+7', label: '+7 (RU)', flag: '🇷🇺' },
    { value: '+27', label: '+27 (ZA)', flag: '🇿🇦' },
    { value: '+20', label: '+20 (EG)', flag: '🇪🇬' },
    { value: '+971', label: '+971 (AE)', flag: '🇦🇪' },
    { value: '+966', label: '+966 (SA)', flag: '🇸🇦' },
    { value: '+65', label: '+65 (SG)', flag: '🇸🇬' }
  ]

  const addressTypeOptions = [
    { value: 'Home', label: 'Home' },
    { value: 'Work', label: 'Work' },
    { value: 'Other', label: 'Other' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required field validations
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/[\s\-()]/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number (with or without country code)'
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }

    if (formData.zipCode.trim() && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code'
    }

    if (!formData.maritalStatus) {
      newErrors.maritalStatus = 'Please select your marital status'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sendToWhatsApp = () => {
    // WhatsApp number (replace with your actual WhatsApp number)
    const whatsappNumber = '2348121948557' // Format: country code + number (no + sign)
    
    // Create WhatsApp message
    const message = `
🏛️ *New Contact Form Submission*

👤 *Name:* ${formData.firstName} ${formData.lastName}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.countryCode} ${formData.phoneNumber} (${formData.phoneType})

🏠 *Address:*
${formData.streetAddress}${formData.aptUnit ? ', ' + formData.aptUnit : ''}
${formData.city}, ${formData.state} ${formData.zipCode || ''}

💍 *Marital Status:* ${formData.maritalStatus}

💬 *Message:*
${formData.message || 'No additional message provided'}

📅 *Submitted:* ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

_Sent from DTBC Website Contact Form_
    `.trim()

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Send to WhatsApp only
      const result = await sendToWhatsApp()
      if (result === true) {
        setSubmitStatus('whatsapp_success')
      } else if (result === 'fallback') {
        setSubmitStatus('whatsapp_setup_needed')
      } else {
        setSubmitStatus('error')
      }
      
      // Reset form on success
      if (result === true || result === 'fallback') {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneType: 'Mobile',
          countryCode: '+1',
          phoneNumber: '',
          addressType: 'Home',
          streetAddress: '',
          aptUnit: '',
          city: '',
          state: '',
          zipCode: '',
          maritalStatus: '',
          message: ''
        })
      }
    } catch (error) {
      console.error('Error processing form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormSection>
      <Container>
        <FormWrapper>
          <FormHeader>
            <Title>Connect With Us</Title>
            <Subtitle>
              We'd like to get to know you better and help you take Next Steps at Divine Touch Bible Church. 
              Start by filling out this form and connecting with us.
            </Subtitle>
          </FormHeader>

          <StyledForm onSubmit={handleSubmit}>
            {/* Name Fields */}
            <FieldGroup>
              <Label>Your name *</Label>
              <NameRow>
                <InputWrapper>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    hasError={errors.firstName}
                  />
                  {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
                </InputWrapper>
                <InputWrapper>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    hasError={errors.lastName}
                  />
                  {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
                </InputWrapper>
              </NameRow>
            </FieldGroup>

            {/* Email */}
            <FieldGroup>
              <Label>Email address *</Label>
              <Input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                hasError={errors.email}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </FieldGroup>

            {/* Phone Number */}
            <FieldGroup>
              <Label>Phone number *</Label>
              <PhoneRow>
                <Select
                  name="phoneType"
                  value={formData.phoneType}
                  onChange={handleInputChange}
                >
                  {phoneTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <CountryCodeSelect
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                >
                  {countryCodeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.flag} {option.label}
                    </option>
                  ))}
                </CountryCodeSelect>
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  hasError={errors.phoneNumber}
                />
              </PhoneRow>
              {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}
            </FieldGroup>

            {/* Address */}
            <FieldGroup>
              <Label>Address *</Label>
              <AddressRow>
                <Select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleInputChange}
                >
                  {addressTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <Input
                  type="text"
                  name="streetAddress"
                  placeholder="Street address"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  hasError={errors.streetAddress}
                />
              </AddressRow>
              {errors.streetAddress && <ErrorText>{errors.streetAddress}</ErrorText>}
              
              <Input
                type="text"
                name="aptUnit"
                placeholder="Apt/Unit/Box"
                value={formData.aptUnit}
                onChange={handleInputChange}
                style={{ marginTop: '0.5rem' }}
              />
              
              <CityStateRow>
                <Input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  hasError={errors.city}
                />
                <Input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  hasError={errors.state}
                />
                <Input
                  type="text"
                  name="zipCode"
                  placeholder="Zip code (optional)"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  hasError={errors.zipCode}
                />
              </CityStateRow>
              {(errors.city || errors.state || errors.zipCode) && (
                <ErrorRow>
                  {errors.city && <ErrorText>{errors.city}</ErrorText>}
                  {errors.state && <ErrorText>{errors.state}</ErrorText>}
                  {errors.zipCode && <ErrorText>{errors.zipCode}</ErrorText>}
                </ErrorRow>
              )}
            </FieldGroup>

            {/* Marital Status */}
            <FieldGroup>
              <Label>Marital Status *</Label>
              <Select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                hasError={errors.maritalStatus}
              >
                {maritalStatusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {errors.maritalStatus && <ErrorText>{errors.maritalStatus}</ErrorText>}
            </FieldGroup>

            {/* Message */}
            <FieldGroup>
              <Label>Additional Message (Optional)</Label>
              <TextArea
                name="message"
                placeholder="Tell us how we can help you or any questions you have..."
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
              />
            </FieldGroup>

            {/* WhatsApp Info */}
            <FieldGroup>
              <WhatsAppInfo>
                <InfoText>💬 Your message will be sent directly to our WhatsApp number.</InfoText>
              </WhatsAppInfo>
            </FieldGroup>

            {/* Submit Status */}
            {submitStatus === 'whatsapp_success' && (
              <SuccessMessage>
                Thank you for connecting with us! Your message has been sent directly to our WhatsApp.
              </SuccessMessage>
            )}
            {submitStatus === 'whatsapp_setup_needed' && (
              <SetupMessage>
                Thank you for your submission! Your message has been received. 
                <br />
                <strong>Note:</strong> To enable direct WhatsApp delivery, please complete the WhatsApp API setup (see setup guide).
              </SetupMessage>
            )}
            {submitStatus === 'error' && (
              <ErrorMessage>
                There was an error sending your message. Please try again.
              </ErrorMessage>
            )}

            {/* Submit Button */}
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                'Sending to WhatsApp...'
              ) : (
                <>💬 Send to WhatsApp</>
              )}
            </SubmitButton>
          </StyledForm>
        </FormWrapper>
      </Container>
    </FormSection>
  )
}

// Styled Components
const FormSection = styled.section`
  background-color: #f8f9fa;
  padding: 4rem 0;
  min-height: calc(100vh - 4rem);
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const FormWrapper = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
`

const NameRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const PhoneRow = styled.div`
  display: grid;
  grid-template-columns: 120px 140px 1fr;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 100px 120px 1fr;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const CountryCodeSelect = styled.select`
  padding: 0.75rem 0.5rem;
  border: 2px solid ${props => props.hasError ? '#ef4444' : '#e5e7eb'};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: white;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ef4444' : '#2563eb'};
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.75rem 0.25rem;
  }
`

const AddressRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const CityStateRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 120px;
  gap: 1rem;
  margin-top: 0.5rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const ErrorRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 120px;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid ${props => props.hasError ? '#ef4444' : '#e5e7eb'};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ef4444' : '#2563eb'};
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid ${props => props.hasError ? '#ef4444' : '#e5e7eb'};
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ef4444' : '#2563eb'};
  }
`

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

const SuccessMessage = styled.div`
  background-color: #dcfce7;
  color: #166534;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
`

const ErrorMessage = styled.div`
  background-color: #fef2f2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
`

const WhatsAppInfo = styled.div`
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
`

const InfoText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
  margin: 0;
`

const SubmitButton = styled.button`
  background-color: #25D366;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    background-color: #128C7E;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`

export default Form