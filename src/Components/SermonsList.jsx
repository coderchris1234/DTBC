import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { FaPlay, FaYoutube, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { SermonCardSkeleton, PageSkeleton } from './SkeletonLoader'
import { usePageLoading } from '../hooks/usePageLoading'
import { useLiveStream } from '../hooks/useLiveStream'
import { useYouTubePlaylist } from '../hooks/useYouTubePlaylist'
import SermonPlaceholder from './SermonPlaceholder'
import VideoPlayer from './VideoPlayer'

const SermonsList = () => {
  const [isVisible, setIsVisible] = useState(true) // Start visible
  const { isLive, liveUrl } = useLiveStream() // Use the live stream hook
  const [imageErrors, setImageErrors] = useState({}) // Track image loading errors
  const [selectedSermon, setSelectedSermon] = useState(null) // For video player modal
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false)
  const isLoading = usePageLoading(600) // Show skeleton for 600ms
  const sectionRef = useRef(null)

  // YouTube API configuration
  const PLAYLIST_ID = 'PLhhjC515-IIjINZvrIvpwmYCBrUjY3Cvu'
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY // Optional: Add to .env file
  
  // Fetch YouTube playlist data
  const { videos: youtubeVideos, loading: youtubeLoading, error: youtubeError } = useYouTubePlaylist(PLAYLIST_ID, YOUTUBE_API_KEY)

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

  // Use YouTube videos or fallback to empty array
  const sermons = youtubeVideos || []

  const handleViewMore = () => {
    if (isLive) {
      window.open(liveUrl, '_blank')
    } else {
      window.open('https://www.youtube.com/playlist?list=PLhhjC515-IIjINZvrIvpwmYCBrUjY3Cvu', '_blank')
    }
  }

  const handleImageError = (sermonId) => {
    setImageErrors(prev => ({ ...prev, [sermonId]: true }))
  }

  const handleSermonClick = (sermon) => {
    setSelectedSermon(sermon)
    setIsVideoPlayerOpen(true)
  }

  const closeVideoPlayer = () => {
    setIsVideoPlayerOpen(false)
    setSelectedSermon(null)
  }

  // Show skeleton loading
  if (isLoading || youtubeLoading) {
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
            {youtubeError ? (
              "Showing recent messages. Complete sermon library available on YouTube."
            ) : (
              `Catch up on our latest messages from our YouTube channel. 
              ${sermons.length} sermons available with more added regularly.`
            )}
          </Description>
        </HeaderContent>
        
        <SermonsGrid>
          {sermons.map((sermon, index) => (
            <SermonCard 
              key={sermon.id} 
              isVisible={isVisible} 
              delay={`${0.1 * (index + 1)}s`}
              onClick={() => handleSermonClick(sermon)}
            >
              <ThumbnailContainer>
                {imageErrors[sermon.id] ? (
                  <SermonPlaceholder title={sermon.title} />
                ) : (
                  <SermonThumbnail 
                    src={sermon.thumbnail} 
                    alt={sermon.title}
                    onError={() => handleImageError(sermon.id)}
                  />
                )}
                <PlayOverlay>
                  <PlayButton>
                    <FaPlay size={24} />
                  </PlayButton>
                  <WatchOptions>
                    <WatchOption>Choose Viewing Option</WatchOption>
                  </WatchOptions>
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
          <ViewMoreButton onClick={handleViewMore} isLive={isLive}>
            {isLive ? (
              <>
                <LiveIndicator />
                <FaYoutube size={20} />
                LIVE NOW - Join Service
              </>
            ) : (
              <>
                <FaYoutube size={20} />
                View All Sermons on YouTube
              </>
            )}
          </ViewMoreButton>
          <ViewMoreText>
            {isLive 
              ? "We're currently live! Click to join our worship service now."
              : "Access our complete sermon library and subscribe to stay updated with new messages."
            }
          </ViewMoreText>
        </ViewMoreSection>
      </Container>
      
      {/* Video Player Modal */}
      <VideoPlayer
        isOpen={isVideoPlayerOpen}
        onClose={closeVideoPlayer}
        videoUrl={selectedSermon?.videoUrl}
        title={selectedSermon?.title}
      />
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

const WatchOptions = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${PlayOverlay}:hover & {
    opacity: 1;
  }
`

const WatchOption = styled.div`
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary-600);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  backdrop-filter: blur(10px);
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
  background: ${props => props.isLive ? '#ff4444' : '#ff0000'};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: ${theme.spacing.md};
  position: relative;
  overflow: hidden;
  
  ${props => props.isLive && `
    animation: pulse 2s infinite;
    box-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
  `}
  
  &:hover {
    background: ${props => props.isLive ? '#ff6666' : '#cc0000'};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 68, 68, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 68, 68, 0);
    }
  }
`

const LiveIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #ffffff;
  border-radius: 50%;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0.3;
    }
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