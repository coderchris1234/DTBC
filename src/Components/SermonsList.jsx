import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { FaPlay, FaYoutube, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { SermonCardSkeleton, PageSkeleton } from './SkeletonLoader'
import { usePageLoading } from '../hooks/usePageLoading'

const SermonsList = () => {
  const [isVisible, setIsVisible] = useState(true) // Start visible
  const isLoading = usePageLoading(600) // Show skeleton for 600ms
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1, // Lower threshold
        rootMargin: '0px 0px -10px 0px' // Less aggressive margin
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

  const sermons = [
    {
      id: 1,
      title: "Prosperity of the Soul",
      description: "Discover what true prosperity means in God's kingdom and how to cultivate spiritual wealth that lasts for eternity.",
      date: "Recent",
      duration: "45 min",
      videoUrl: "https://www.youtube.com/watch?v=VUoLwrN7u20&list=PLhhjC515-IIjINZvrIvpwmYCBrUjY3Cvu&index=6",
      thumbnail: "https://img.youtube.com/vi/VUoLwrN7u20/maxresdefault.jpg"
    },
    {
      id: 2,
      title: "I Will Hear Good News",
      description: "Learn how to position yourself to receive God's good news and promises, even in challenging seasons of life.",
      date: "Recent",
      duration: "42 min",
      videoUrl: "https://www.youtube.com/watch?v=LBvlI-MmhHQ&list=PLhhjC515-IIjINZvrIvpwmYCBrUjY3Cvu&index=4",
      thumbnail: "https://img.youtube.com/vi/LBvlI-MmhHQ/maxresdefault.jpg"
    },
    {
      id: 3,
      title: "Divine Manifestation",
      description: "Experience the power of God's divine manifestation in your life and witness His supernatural intervention in every situation.",
      date: "Recent",
      duration: "40 min",
      videoUrl: "https://www.youtube.com/watch?v=SL2SK8Xbz5g&list=PLhhjC515-IIiqMpPQsCUO8UuOo9JV60Xr&index=1",
      thumbnail: "https://img.youtube.com/vi/SL2SK8Xbz5g/maxresdefault.jpg"
    }
  ]

  const handleViewMore = () => {
    window.open('https://www.youtube.com/playlist?list=PLhhjC515-IIjINZvrIvpwmYCBrUjY3Cvu', '_blank')
  }

  const handleSermonClick = (videoUrl) => {
    window.open(videoUrl, '_blank')
  }

  // Show skeleton loading
  if (isLoading) {
    return (
      <Section ref={sectionRef}>
        <Container>
          <PageSkeleton>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ 
                height: '1rem', 
                width: '150px', 
                background: 'var(--bg-tertiary)', 
                margin: '0 auto 1rem',
                borderRadius: '4px'
              }} />
              <div style={{ 
                height: '3rem', 
                width: '300px', 
                background: 'var(--bg-tertiary)', 
                margin: '0 auto 1rem',
                borderRadius: '4px'
              }} />
              <div style={{ 
                height: '1.5rem', 
                width: '500px', 
                background: 'var(--bg-tertiary)', 
                margin: '0 auto',
                borderRadius: '4px'
              }} />
            </div>
            <SermonsGrid>
              <SermonCardSkeleton />
              <SermonCardSkeleton />
              <SermonCardSkeleton />
            </SermonsGrid>
          </PageSkeleton>
        </Container>
      </Section>
    )
  }

  return (
    <Section ref={sectionRef}>
      <Container>
        <HeaderContent isVisible={isVisible}>
          <SectionLabel>Latest Messages</SectionLabel>
          <MainHeading>
            Recent Sermons
          </MainHeading>
          <Description>
            Catch up on our latest messages and be encouraged in your faith journey. 
            Each sermon is filled with biblical truth and practical wisdom for daily living.
          </Description>
        </HeaderContent>
        
        <SermonsGrid>
          {sermons.map((sermon, index) => (
            <SermonCard 
              key={sermon.id} 
              isVisible={isVisible} 
              delay={`${0.1 * (index + 1)}s`}
              onClick={() => handleSermonClick(sermon.videoUrl)}
            >
              <ThumbnailContainer>
                <SermonThumbnail 
                  src={sermon.thumbnail} 
                  alt={sermon.title}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f8f6f0'/%3E%3Cg opacity='0.3'%3E%3Ccircle cx='200' cy='112' r='40' fill='%23b5967a'/%3E%3Cpath d='M180 92 L220 112 L180 132 Z' fill='%23ffffff'/%3E%3C/g%3E%3Ctext x='200' y='180' text-anchor='middle' font-family='serif' font-size='16' fill='%235f5f56'%3ESermon%3C/text%3E%3C/svg%3E"
                  }}
                />
                <PlayOverlay>
                  <PlayButton>
                    <FaPlay size={24} />
                  </PlayButton>
                </PlayOverlay>
              </ThumbnailContainer>
              
              <SermonContent>
                <SermonTitle>{sermon.title}</SermonTitle>
                <SermonDescription>{sermon.description}</SermonDescription>
                
                <SermonMeta>
                  <MetaItem>
                    <FaCalendarAlt size={14} />
                    <MetaText>{sermon.date}</MetaText>
                  </MetaItem>
                  <MetaItem>
                    <FaClock size={14} />
                    <MetaText>{sermon.duration}</MetaText>
                  </MetaItem>
                </SermonMeta>
              </SermonContent>
            </SermonCard>
          ))}
        </SermonsGrid>
        
        <ViewMoreSection isVisible={isVisible} delay="0.5s">
          <ViewMoreButton onClick={handleViewMore}>
            <FaYoutube size={20} />
            View All Sermons on YouTube
          </ViewMoreButton>
          <ViewMoreText>
            Access our complete sermon library and subscribe to stay updated with new messages.
          </ViewMoreText>
        </ViewMoreSection>
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
  margin: 0 auto ${theme.spacing['4xl']};
  opacity: 1; /* Always visible */
  transform: translateY(0); /* Always in position */
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

const SermonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['4xl']};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`

const SermonCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition-theme);
  opacity: 1; /* Always visible */
  transform: translateY(0); /* Always in position */
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.large};
  }
`

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`

const SermonThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${SermonCard}:hover & {
    transform: scale(1.05);
  }
`

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${SermonCard}:hover & {
    opacity: 1;
  }
`

const PlayButton = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-600);
  transform: scale(0.8);
  transition: transform 0.3s ease;
  
  ${PlayOverlay}:hover & {
    transform: scale(1);
  }
`

const SermonContent = styled.div`
  padding: ${theme.spacing.xl};
`

const SermonTitle = styled.h3`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-primary);
  margin-bottom: ${theme.spacing.md};
  line-height: ${theme.typography.lineHeights.tight};
`

const SermonDescription = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: var(--text-secondary);
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.lg};
`

const SermonMeta = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`

const MetaText = styled.span`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  color: var(--text-muted);
`

const ViewMoreSection = styled.div`
  text-align: center;
  opacity: 1; /* Always visible */
  transform: translateY(0); /* Always in position */
`

const ViewMoreButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.md};
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: #ffffff;
  background: #ff0000;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: ${theme.spacing.md};
  
  &:hover {
    background: #cc0000;
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
`

const ViewMoreText = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.base};
  color: var(--text-muted);
  max-width: 500px;
  margin: 0 auto;
`

export default SermonsList