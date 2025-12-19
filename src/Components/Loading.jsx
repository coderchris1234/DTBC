import styled, { keyframes } from 'styled-components'

const Loading = ({ size = 'medium', color = '#3b82f6' }) => {
  return (
    <LoadingContainer>
      <Spinner size={size} color={color} />
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  )
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const Spinner = styled.div`
  width: ${props => {
    switch(props.size) {
      case 'small': return '24px'
      case 'large': return '48px'
      default: return '32px'
    }
  }};
  height: ${props => {
    switch(props.size) {
      case 'small': return '24px'
      case 'large': return '48px'
      default: return '32px'
    }
  }};
  border: 3px solid rgba(59, 130, 246, 0.1);
  border-top: 3px solid ${props => props.color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`

const LoadingText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`

export default Loading