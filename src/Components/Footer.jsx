import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef(null)
  const navigate = useNavigate()

  const handleConnectClick = () => {
    navigate('/contact')
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <FooterSection ref={footerRef}>
      <Container>
        <FooterContent>
          <LogoSection isVisible={isVisible} animationDelay="0.2s">
            <LogoContainer>
              <LogoCircle>
                <LogoText>DTBC</LogoText>
              </LogoCircle>
              <BrandContainer>
                <BrandTitle>DIVINE TOUCH BIBLE</BrandTitle>
                <BrandSubtitle>CHURCH</BrandSubtitle>
              </BrandContainer>
            </LogoContainer>
          </LogoSection>
          
          <InfoSection isVisible={isVisible} animationDelay="0.4s">
            <SectionTitle>SERVICE TIMES</SectionTitle>
            <InfoList>
              <InfoItem> New Jersey, Sunday  at 9:45 AM</InfoItem>
              <InfoItem> Texas, Sunday  at 9:00 AM</InfoItem>
              <InfoItem>Wednesday at 6:30 PM</InfoItem>
            </InfoList>
          </InfoSection>
          
          <InfoSection isVisible={isVisible} animationDelay="0.6s">
            <SectionTitle>LOCATION</SectionTitle>
            <InfoList>
              <InfoItem>New Jersey- 471 Clinton Avenue, Newark NJ07108</InfoItem>
              <InfoItem>Texa- 471 3520 FM 723 Rd, Rosenberg Tx 77471</InfoItem>
            </InfoList>
            
            <SectionTitle style={{ marginTop: '2rem' }}>PHONE & EMAIL</SectionTitle>
            <InfoList>
              <InfoItem>9732020411, 9732026758</InfoItem>
              <InfoItem>Dtbctexas@gmail.com, aitoya40@gmail.com</InfoItem>
            </InfoList>
          </InfoSection>
          
          <SocialSection isVisible={isVisible} animationDelay="0.8s">
            <SectionTitle>EXPERIENCE THE TOUCH OF GOD</SectionTitle>
            <SocialIcons>
              <SocialIcon href="https://www.facebook.com/DivineTouchChurch" target='_blank' aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.youtube.com/@divinetouchbiblechurchnewj9570" target='_blank' aria-label="YouTube">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447c0-1.297.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708c1.297 0 2.448.49 3.323 1.297c.876.876 1.366 2.027 1.366 3.324c0 1.297-.49 2.448-1.297 3.323c-.876.876-2.027 1.366-3.324 1.366zm7.718 0c-1.297 0-2.448-.49-3.323-1.297c-.876-.876-1.366-2.027-1.366-3.324c0-1.297.49-2.448 1.297-3.323c.876-.876 2.027-1.366 3.324-1.366c1.297 0 2.448.49 3.323 1.297c.876.876 1.366 2.027 1.366 3.324c0 1.297-.49 2.448-1.297 3.323c-.876.876-2.027 1.366-3.324 1.366z"/>
                </svg>
              </SocialIcon>
            </SocialIcons>
            <ConnectButton onClick={handleConnectClick}>CONNECT WITH US</ConnectButton>
          </SocialSection>
        </FooterContent>
      </Container>
    </FooterSection>
  )
}

// Styled Components
const FooterSection = styled.footer`
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
  color: white;
  padding: 3rem 0 2rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`

const LogoSection = styled.div`
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '30px'}) scale(${props => props.isVisible ? '1' : '0.9'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 640px) {
    justify-content: center;
  }
`

const LogoCircle = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`

const LogoText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
`

const BrandContainer = styled.div`
  margin-left: 1rem;
`

const BrandTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.2;
`

const BrandSubtitle = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
`

const InfoSection = styled.div`
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '40px'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const SectionTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
`

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const InfoItem = styled.li`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`

const SocialSection = styled.div`
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '50px'}) scale(${props => props.isVisible ? '1' : '0.8'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 640px) {
    justify-content: center;
  }
`

const SocialIcon = styled.a`
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    transform: translateY(-2px) scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`

const ConnectButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`

export default Footer