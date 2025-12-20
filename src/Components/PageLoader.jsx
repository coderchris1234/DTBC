import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'

const PageLoader = ({ message = "Loading..." }) => {
  return (
    <LoaderContainer>
      <LoaderContent>
        <Spinner />
        <LoaderText>{message}</LoaderText>
      </LoaderContent>
    </LoaderContainer>
  )
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  z-index: 9999;
  transition: var(--transition-theme);
`

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};
`

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid var(--color-primary-200);
  border-top: 3px solid var(--color-primary-600);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

const LoaderText = styled.p`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-secondary);
  animation: ${pulse} 2s ease-in-out infinite;
`

export default PageLoader