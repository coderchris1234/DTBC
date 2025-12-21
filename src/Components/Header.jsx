import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <HeaderSection>
      <Container>
        <HeaderContent>
          <LogoContainer>
            <LogoLink to="/">
              <LogoWrapper>
                <LogoCircle>
                  <LogoImage 
                    src="/dtbc.jpeg" 
                    alt="Divine Touch Bible Church USA Inc"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <LogoFallback style={{ display: 'none' }}>
                    <LogoInitial>D</LogoInitial>
                  </LogoFallback>
                </LogoCircle>
                <BrandContainer>
                  <BrandTitle>Divine Touch</BrandTitle>
                  <BrandSubtitle>Bible Church</BrandSubtitle>
                </BrandContainer>
              </LogoWrapper>
            </LogoLink>
          </LogoContainer>

          <DesktopNav>
            <NavContainer>
              <StyledNavLink to="/">Home</StyledNavLink>
              <StyledNavLink to="/about">About</StyledNavLink>
              <StyledNavLink to="/sermons">Sermons</StyledNavLink>
              <StyledNavLink to="/visit">Visit</StyledNavLink>
              <StyledNavLink to="/give">Give</StyledNavLink>
              <StyledNavLink to="/contact">Connect</StyledNavLink>
              <ThemeToggle />
            </NavContainer>
          </DesktopNav>

          <MobileControls>
            <ThemeToggle />
            <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuLine isOpen={isMenuOpen} position="top" />
              <MenuLine isOpen={isMenuOpen} position="middle" />
              <MenuLine isOpen={isMenuOpen} position="bottom" />
            </MobileMenuButton>
          </MobileControls>
        </HeaderContent>

        <MobileMenuContainer isOpen={isMenuOpen}>
          <MobileMenuContent isOpen={isMenuOpen}>
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink to="/sermons" onClick={() => setIsMenuOpen(false)}>Sermons</MobileNavLink>
            <MobileNavLink to="/visit" onClick={() => setIsMenuOpen(false)}>Visit</MobileNavLink>
            <MobileNavLink to="/give" onClick={() => setIsMenuOpen(false)}>Give</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Connect</MobileNavLink>
          </MobileMenuContent>
        </MobileMenuContainer>
      </Container>
    </HeaderSection>
  )
}

// Styled Components
const HeaderSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  transition: var(--transition-theme);
  
  [data-theme="dark"] & {
    background: rgba(26, 26, 23, 0.95);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  
  @media (max-width: 768px) {
    height: 70px;
  }
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const LogoLink = styled(NavLink)`
  text-decoration: none;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`

const LogoCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.subtle};
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const LogoFallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]});
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoInitial = styled.span`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.bold};
`

const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 640px) {
    display: none;
  }
`

const BrandTitle = styled.div`
  font-family: ${theme.typography.fonts.accent};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.semibold};
  color: var(--text-primary);
  line-height: 1.2;
`

const BrandSubtitle = styled.div`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.sm};
  color: var(--text-secondary);
  font-weight: ${theme.typography.weights.medium};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

const DesktopNav = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
`

const MobileControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  @media (min-width: 768px) {
    display: none;
  }
`

const StyledNavLink = styled(NavLink)`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-secondary);
  text-decoration: none;
  position: relative;
  transition: var(--transition-theme);
  
  &:hover {
    color: var(--text-primary);
  }
  
  &.active {
    color: var(--color-primary-600);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--color-primary-500);
      border-radius: ${theme.borderRadius.full};
    }
  }
`

const MobileMenuButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  
  @media (min-width: 768px) {
    display: none;
  }
`

const MenuLine = styled.span`
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: ${theme.borderRadius.full};
  transition: var(--transition-theme);
  transform-origin: center;
  
  ${props => props.isOpen && props.position === 'top' && `
    transform: translateY(6px) rotate(45deg);
  `}
  
  ${props => props.isOpen && props.position === 'middle' && `
    opacity: 0;
  `}
  
  ${props => props.isOpen && props.position === 'bottom' && `
    transform: translateY(-6px) rotate(-45deg);
  `}
`

const MobileMenuContainer = styled.div`
  overflow: hidden;
  max-height: ${props => props.isOpen ? '400px' : '0'};
  transition: max-height 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }
`

const MobileMenuContent = styled.div`
  padding: ${props => props.isOpen ? theme.spacing.md : '0'};
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: var(--transition-theme);
`

const MobileNavLink = styled(NavLink)`
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.medium};
  color: var(--text-secondary);
  text-decoration: none;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: var(--transition-theme);

  &:hover {
    color: var(--text-primary);
    background: var(--bg-secondary);
  }

  &.active {
    color: var(--color-primary-600);
    background: var(--color-primary-50);
    font-weight: ${theme.typography.weights.semibold};
  }
`

export default Header