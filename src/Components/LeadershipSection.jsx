import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const LeadershipSection = () => {
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
          <SectionLabel>Leadership</SectionLabel>
          <MainHeading>
            Our Pastor
          </MainHeading>
          <Description>
            Meet our dedicated pastor who leads our congregation with wisdom, compassion, 
            and unwavering commitment to God's Word and our church family.
          </Description>
        </HeaderContent>
        
        <LeadershipGrid>
          <LeaderCard isVisible={isVisible} delay="0.1s">
            <LeaderImageContainer>
              <LeaderImage 
                src="/pastor.jpg"
                alt="Apostle Dr. Jospeh Ihimekpen"
              />
            </LeaderImageContainer>
            <LeaderInfo>
              <LeaderName>Apostle Dr. Jospeh Ihimekpen</LeaderName>
              <LeaderTitle>Senior Pastor</LeaderTitle>
              <LeaderBio>
                With over 20 years of ministry experience, Apostle Dr. Joseph leads our congregation 
                with passion for God's Word and deep care for each member of our church family. 
                His heart for evangelism and discipleship has touched countless lives, and his 
                commitment to biblical teaching creates an atmosphere where believers can grow 
                in their faith. Known for his compassionate pastoral care and prophetic insight, 
                he shepherds our community with wisdom, integrity, and an unwavering dedication 
                to seeing lives transformed by the power of Christ.
              </LeaderBio>
            </LeaderInfo>
          </LeaderCard>
          
          {/* <LeaderCard isVisible={isVisible} delay="0.2s">
            <LeaderImageContainer>
              <LeaderImage 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23f8f6f0'/%3E%3Ccircle cx='100' cy='80' r='30' fill='%2396a896' opacity='0.3'/%3E%3Cpath d='M70 140 Q100 120 130 140 L130 200 L70 200 Z' fill='%2396a896' opacity='0.3'/%3E%3C/svg%3E"
                alt="Associate Pastor"
              />
            </LeaderImageContainer>
            <LeaderInfo>
              <LeaderName>Pastor Sarah Johnson</LeaderName>
              <LeaderTitle>Associate Pastor</LeaderTitle>
              <LeaderBio>
                Pastor Sarah brings a heart for worship and community building, overseeing 
                our music ministry and small group programs with grace and dedication.
              </LeaderBio>
            </LeaderInfo>
          </LeaderCard>
          
          <LeaderCard isVisible={isVisible} delay="0.3s">
            <LeaderImageContainer>
              <LeaderImage 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23f8f6f0'/%3E%3Ccircle cx='100' cy='80' r='30' fill='%23d4af37' opacity='0.3'/%3E%3Cpath d='M70 140 Q100 120 130 140 L130 200 L70 200 Z' fill='%23d4af37' opacity='0.3'/%3E%3C/svg%3E"
                alt="Youth Pastor"
              />
            </LeaderImageContainer>
            <LeaderInfo>
              <LeaderName>Pastor Michael Davis</LeaderName>
              <LeaderTitle>Youth Pastor</LeaderTitle>
              <LeaderBio>
                Pastor Michael leads our youth ministry with energy and authenticity, 
                helping young people discover their identity and purpose in Christ.
              </LeaderBio>
            </LeaderInfo>
          </LeaderCard> */}
        </LeadershipGrid>
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

const LeadershipGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing['2xl']};
  
  @media (max-width: 768px) {
    gap: ${theme.spacing.xl};
  }
`

const LeaderCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.subtle};
  border: 1px solid ${theme.colors.neutral[200]};
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

const LeaderImageContainer = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
  box-shadow: ${theme.shadows.soft};
`

const LeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const LeaderInfo = styled.div``

const LeaderName = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const LeaderTitle = styled.p`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.primary[600]};
  margin-bottom: ${theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 1px;
`

const LeaderBio = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.relaxed};
`

export default LeadershipSection