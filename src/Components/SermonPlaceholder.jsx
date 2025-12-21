import styled from 'styled-components'
import { theme } from '../styles/theme'
import { FaPlay } from 'react-icons/fa'
import { MdChurch } from 'react-icons/md'

const SermonPlaceholder = ({ className }) => {
  return (
    <PlaceholderContainer className={className}>
      <BackgroundGradient />
      <DecorativeElements>
        <DecorativeDot style={{ top: '20%', left: '15%' }} />
        <DecorativeDot style={{ top: '70%', right: '20%' }} />
        <DecorativeDot style={{ top: '25%', right: '10%' }} />
        <DecorativeDot style={{ bottom: '30%', left: '10%' }} />
      </DecorativeElements>
      
      <CenterContent>
        <ChurchIcon>
          <MdChurch size={40} />
        </ChurchIcon>
        <CrossIcon>
          <CrossSVG />
        </CrossIcon>
      </CenterContent>
      
      <BottomContent>
        <ChurchName>Divine Touch Bible Church USA Inc</ChurchName>
        <SermonLabel>Sermon Message</SermonLabel>
      </BottomContent>
      
      <PlayIconContainer>
        <PlayIconCircle>
          <FaPlay size={12} />
        </PlayIconCircle>
      </PlayIconContainer>
    </PlaceholderContainer>
  )
}

const CrossSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="14" y="4" width="4" height="24" rx="2" fill="currentColor" />
    <rect x="8" y="14" width="16" height="4" rx="2" fill="currentColor" />
  </svg>
)

// Styled Components
const PlaceholderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    var(--color-primary-600) 0%,
    var(--color-primary-700) 50%,
    var(--color-secondary-600) 100%
  );
  opacity: 0.9;
`

const DecorativeElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

const DecorativeDot = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
`

const CenterContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
`

const ChurchIcon = styled.div`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: ${theme.spacing.sm};
`

const CrossIcon = styled.div`
  color: rgba(255, 255, 255, 0.9);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`

const BottomContent = styled.div`
  position: absolute;
  bottom: ${theme.spacing.lg};
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2;
`

const ChurchName = styled.div`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.semibold};
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${theme.spacing.xs};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`

const SermonLabel = styled.div`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.medium};
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`

const PlayIconContainer = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  z-index: 2;
`

const PlayIconCircle = styled.div`
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
`

export default SermonPlaceholder