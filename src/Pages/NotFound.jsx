import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { MdHome, MdChurch, MdContactMail } from 'react-icons/md'

const NotFound = () => {
  return (
    <Container>
      <Content>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Description>
          We're sorry, but the page you're looking for doesn't exist. 
          Perhaps you'd like to visit one of these sections instead?
        </Description>
        
        <ActionGrid>
          <ActionCard as={Link} to="/">
            <ActionIcon><MdHome size={32} /></ActionIcon>
            <ActionTitle>Home</ActionTitle>
            <ActionDescription>Return to our homepage</ActionDescription>
          </ActionCard>
          
          <ActionCard as={Link} to="/about">
            <ActionIcon><MdChurch size={32} /></ActionIcon>
            <ActionTitle>About Us</ActionTitle>
            <ActionDescription>Learn about our church</ActionDescription>
          </ActionCard>
          
          <ActionCard as={Link} to="/contact">
            <ActionIcon><MdContactMail size={32} /></ActionIcon>
            <ActionTitle>Contact</ActionTitle>
            <ActionDescription>Get in touch with us</ActionDescription>
          </ActionCard>
        </ActionGrid>
        
        <BackButton as={Link} to="/">
          Take Me Home
        </BackButton>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  background: var(--bg-secondary);
  transition: var(--transition-theme);
`

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  width: 100%;
`

const ErrorCode = styled.h1`
  font-family: ${theme.typography.fonts.accent};
  font-size: 8rem;
  font-weight: ${theme.typography.weights.light};
  color: var(--color-primary-400);
  margin-bottom: ${theme.spacing.md};
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`

const Title = styled.h2`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['3xl']};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-primary);
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: 768px) {
    font-size: ${theme.typography.sizes['2xl']};
  }
`

const Description = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.lg};
  color: var(--text-secondary);
  line-height: ${theme.typography.lineHeights.relaxed};
  margin-bottom: ${theme.spacing['3xl']};
`

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['3xl']};
`

const ActionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.xl};
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: ${theme.borderRadius.xl};
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
    border-color: var(--color-primary-300);
  }
`

const ActionIcon = styled.div`
  color: var(--color-primary-600);
  margin-bottom: ${theme.spacing.md};
`

const ActionTitle = styled.h3`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: var(--text-primary);
  margin-bottom: ${theme.spacing.xs};
`

const ActionDescription = styled.p`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.sm};
  color: var(--text-secondary);
  text-align: center;
`

const BackButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-inverse);
  background: var(--color-primary-600);
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--color-primary-700);
    transform: translateY(-2px);
  }
`

export default NotFound