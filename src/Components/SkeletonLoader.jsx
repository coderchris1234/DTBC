import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'

// Skeleton loading animations
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

// Base skeleton component
const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 25%,
    var(--bg-tertiary) 37%,
    var(--bg-secondary) 63%
  );
  background-size: 400px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: ${theme.borderRadius.md};
`

// Individual skeleton components
export const SkeletonText = styled(SkeletonBase)`
  height: ${props => props.height || '1rem'};
  width: ${props => props.width || '100%'};
  margin-bottom: ${props => props.mb || '0.5rem'};
`

export const SkeletonTitle = styled(SkeletonBase)`
  height: 2rem;
  width: ${props => props.width || '60%'};
  margin-bottom: 1rem;
`

export const SkeletonImage = styled(SkeletonBase)`
  height: ${props => props.height || '200px'};
  width: ${props => props.width || '100%'};
  margin-bottom: 1rem;
`

export const SkeletonButton = styled(SkeletonBase)`
  height: 2.5rem;
  width: ${props => props.width || '120px'};
  border-radius: ${theme.borderRadius.lg};
`

export const SkeletonCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  animation: ${pulse} 2s ease-in-out infinite;
`

// Page-specific skeleton loaders
export const HeroSkeleton = () => (
  <SkeletonCard style={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <SkeletonText width="30%" height="1rem" mb="1rem" />
    <SkeletonTitle width="80%" />
    <SkeletonText width="70%" height="1.2rem" mb="2rem" />
    <div style={{ display: 'flex', gap: '1rem' }}>
      <SkeletonButton width="150px" />
      <SkeletonButton width="150px" />
    </div>
  </SkeletonCard>
)

export const ServiceCardSkeleton = () => (
  <SkeletonCard>
    <div style={{ textAlign: 'center' }}>
      <SkeletonText width="60px" height="60px" style={{ margin: '0 auto 1rem', borderRadius: '50%' }} />
      <SkeletonTitle width="70%" />
      <SkeletonText width="50%" height="1.5rem" mb="1rem" />
      <SkeletonText width="80%" mb="1rem" />
      <SkeletonButton width="100%" />
    </div>
  </SkeletonCard>
)

export const SermonCardSkeleton = () => (
  <SkeletonCard>
    <SkeletonImage height="200px" />
    <SkeletonTitle width="80%" />
    <SkeletonText width="100%" mb="0.5rem" />
    <SkeletonText width="90%" mb="1rem" />
    <div style={{ display: 'flex', gap: '1rem' }}>
      <SkeletonText width="80px" height="1rem" />
      <SkeletonText width="80px" height="1rem" />
    </div>
  </SkeletonCard>
)

export const ContactCardSkeleton = () => (
  <SkeletonCard>
    <div style={{ textAlign: 'center' }}>
      <SkeletonText width="48px" height="48px" style={{ margin: '0 auto 1rem', borderRadius: '50%' }} />
      <SkeletonTitle width="60%" />
      <SkeletonText width="90%" mb="1rem" />
      <SkeletonText width="70%" mb="0.5rem" />
      <SkeletonText width="80%" />
    </div>
  </SkeletonCard>
)

export const FormSkeleton = () => (
  <SkeletonCard>
    <SkeletonTitle width="50%" />
    <SkeletonText width="80%" mb="2rem" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
      <div>
        <SkeletonText width="40%" height="1rem" mb="0.5rem" />
        <SkeletonText width="100%" height="2.5rem" />
      </div>
      <div>
        <SkeletonText width="40%" height="1rem" mb="0.5rem" />
        <SkeletonText width="100%" height="2.5rem" />
      </div>
    </div>
    <SkeletonText width="30%" height="1rem" mb="0.5rem" />
    <SkeletonText width="100%" height="2.5rem" mb="1rem" />
    <SkeletonText width="25%" height="1rem" mb="0.5rem" />
    <SkeletonText width="100%" height="120px" mb="2rem" />
    <SkeletonButton width="150px" />
  </SkeletonCard>
)

// Page skeleton loaders
export const PageSkeleton = ({ children }) => (
  <div style={{ padding: '2rem 0' }}>
    {children}
  </div>
)

export default {
  Text: SkeletonText,
  Title: SkeletonTitle,
  Image: SkeletonImage,
  Button: SkeletonButton,
  Card: SkeletonCard,
  Hero: HeroSkeleton,
  ServiceCard: ServiceCardSkeleton,
  SermonCard: SermonCardSkeleton,
  ContactCard: ContactCardSkeleton,
  Form: FormSkeleton,
  Page: PageSkeleton
}