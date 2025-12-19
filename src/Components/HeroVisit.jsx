import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const HeroVisit = () => {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  const handleConnectClick = () => {
    navigate('/contact')
  }

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <VisitSection>
      <Container>
        <Content>
          <MainTitle isVisible={isVisible} animationDelay="0.2s">
            We Can't Wait to See You!
          </MainTitle>
          <Description isVisible={isVisible} animationDelay="0.4s">
            Whether you're new to church, have been a Christian for many years, or are looking for a fresh start, you're welcome here.
          </Description>
          <ConnectButton isVisible={isVisible} animationDelay="0.6s" onClick={handleConnectClick}>
            CONNECT WITH US
          </ConnectButton>
        </Content>
      </Container>
    </VisitSection>
  )
}

// Styled Components
const VisitSection = styled.section`
  position: relative;
  height: calc(100vh - 4rem); /* Account for fixed header */
  background-image: url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const Content = styled.div`
  max-width: 600px;
  color: white;
`

const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '50px'}) scale(${props => props.isVisible ? '1' : '0.9'});
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '30px'}) translateX(${props => props.isVisible ? '0' : '-20px'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const ConnectButton = styled.button`
  background-color: #0891b2;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : '40px'}) scale(${props => props.isVisible ? '1' : '0.8'});
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background-color: #0e7490;
    transform: translateY(-4px) scale(1.05) !important;
    box-shadow: 0 8px 25px rgba(8, 145, 178, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(1.02) !important;
  }
  
  @media (max-width: 480px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.8rem;
    
    &:hover {
      transform: translateY(-2px) scale(1.02) !important;
    }
  }
`

export default HeroVisit