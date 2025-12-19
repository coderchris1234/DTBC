import { Component } from 'react'
import styled from 'styled-components'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorContent>
            <ErrorTitle>Oops! Something went wrong</ErrorTitle>
            <ErrorMessage>
              We're sorry for the inconvenience. Please refresh the page or try again later.
            </ErrorMessage>
            <RefreshButton onClick={() => window.location.reload()}>
              Refresh Page
            </RefreshButton>
          </ErrorContent>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
`

const ErrorContent = styled.div`
  text-align: center;
  max-width: 500px;
`

const ErrorTitle = styled.h2`
  font-size: 2rem;
  color: #dc2626;
  margin-bottom: 1rem;
`

const ErrorMessage = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2rem;
  line-height: 1.6;
`

const RefreshButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`

export default ErrorBoundary