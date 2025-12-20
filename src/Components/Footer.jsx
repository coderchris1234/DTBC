import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../styles/theme'

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

    const currentRef = footerRef.current
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
    <FooterSection ref={footerRef}>
      <Container>
        <FooterContent>
          <MainSection isVisible={isVisible}>
            <LogoSection>
              <LogoContainer>
                <LogoCircle>
                  <LogoImage 
                    src="/dtbc.jpeg" 
                    alt="DTBC Logo"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <LogoFallback style={{ display: 'none' }}>
                    <LogoText>D</LogoText>
                  </LogoFallback>
                </LogoCircle>
                <BrandContainer>
                  <BrandTitle>Divine Touch Bible Church</BrandTitle>
                  <BrandTagline>A place where hearts find home</BrandTagline>
                </BrandContainer>
              </LogoContainer>
            </LogoSection>
          </MainSection>
            
            <InfoGrid>
              <InfoSection isVisible={isVisible} delay="0.2s">
                <SectionTitle>Service Times</SectionTitle>
                <InfoList>
                  <InfoItem>Sunday 9:45 AM (New Jersey)</InfoItem>
                  <InfoItem>Sunday 9:00 AM (Texas)</InfoItem>
                  <InfoItem>Wednesday 6:00 PM</InfoItem>
                </InfoList>
              </InfoSection>
              
              <InfoSection isVisible={isVisible} delay="0.4s">
                <SectionTitle>Locations</SectionTitle>
                <InfoList>
                  <InfoItem>471 Clinton Avenue<br />Newark, NJ 07108</InfoItem>
                  <InfoItem>3520 FM 723 Rd<br />Rosenberg, TX 77471</InfoItem>
                </InfoList>
              </InfoSection>
              
              <InfoSection isVisible={isVisible} delay="0.6s">
                <SectionTitle>Connect</SectionTitle>
                <InfoList>
                  <InfoItem>(973) 202-0411</InfoItem>
                  <InfoItem>dtbctexas@gmail.com</InfoItem>
                </InfoList>
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
                </SocialIcons>
                <ConnectButton onClick={handleConnectClick}>
                  Get in Touch
                </ConnectButton>
              </InfoSection>
            </InfoGrid>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>
            © 2024 Divine Touch Bible Church. All rights reserved.
          </Copyright>
        </FooterBottom>
      </Container>
    </FooterSection>
  )
}

// Styled Components
const FooterSection = styled.footer`
  background: var(--color-neutral-900);
  color: var(--color-neutral-200);
  padding: ${theme.spacing['4xl']} 0 ${theme.spacing.lg};
  position: relative;
  transition: var(--transition-theme);
  
  [data-theme="dark"] & {
    background: var(--color-neutral-100);
    color: var(--color-neutral-800);
  }
  
  @media (max-width: 768px) {
    padding: ${theme.spacing['3xl']} 0 ${theme.spacing.lg};
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

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['2xl']};
`

const MainSection = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
`

const LogoSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`

const LogoCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.subtle};
`

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const LogoFallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]});
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoText = styled.span`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.bold};
`

const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const BrandTitle = styled.div`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-primary);
  line-height: 1.2;
`

const BrandTagline = styled.div`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: var(--text-muted);
  font-style: italic;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
`

const InfoSection = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.delay || '0s'};
`

const SectionTitle = styled.h3`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.semibold};
  color: var(--text-primary);
  margin-bottom: ${theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 1px;
`

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${theme.spacing.lg} 0;
`

const InfoItem = styled.li`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: var(--text-secondary);
  margin-bottom: ${theme.spacing.sm};
  line-height: ${theme.typography.lineHeights.relaxed};
`

const SocialIcons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  background: ${theme.colors.neutral[800]};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral[400]};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.primary[600]};
    color: ${theme.colors.white};
    transform: translateY(-2px);
  }
`

const ConnectButton = styled.button`
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
  
  &:hover {
    background: ${theme.colors.primary[700]};
    transform: translateY(-2px);
  }
`

const FooterBottom = styled.div`
  border-top: 1px solid ${theme.colors.neutral[800]};
  padding-top: ${theme.spacing.lg};
  text-align: center;
`

const Copyright = styled.p`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.neutral[500]};
`

export default Footer