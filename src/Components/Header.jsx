import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

// Styled Components
const HeaderSection = styled.section`
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  /* background-color: pink; */

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  /* background-color: green; */
  width: 100%;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const LogoLink = styled(NavLink)`
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
`

const LogoWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  /* background-color: red; */
`

const LogoCircle = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color:  #0c3cdb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 1rem;
`

const BrandContainer = styled.div`
  margin-left: 0.75rem;
`

const BrandTitle = styled.div`
  color: #0c3cdb;
  font-weight: bold;
  font-size: 1.125rem;
`

const BrandSubtitle = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
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
  justify-content: center;
  /* gap: 3rem; */
`

const StyledNavLink = styled(NavLink)`
  color: #374151;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #2563eb;
  }

  &.active {
    color: #2563eb;
    font-weight: 600;
  }
`

const AboutButton = styled.button`
  color: #374151;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #2563eb;
  }
`

const MobileMenuButton = styled.button`
  display: block;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: #2563eb;
    outline: none;
  }

  @media (min-width: 768px) {
    display: none;
  }
`

const MobileMenuContainer = styled.div`
  display: block;
  overflow: hidden;
  max-height: ${props => props.isOpen ? '400px' : '0'};
  transition: max-height 0.3s ease-in-out;

  @media (min-width: 768px) {
    display: none;
  }
`

const MobileMenuContent = styled.div`
  padding: ${props => props.isOpen ? '0.5rem' : '0 0.5rem'};
  padding-top: ${props => props.isOpen ? '0.5rem' : '0'};
  padding-bottom: ${props => props.isOpen ? '0.75rem' : '0'};
  background-color: white;
  border-top: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.3s ease-in-out;

  @media (min-width: 640px) {
    padding-left: ${props => props.isOpen ? '0.75rem' : '0'};
    padding-right: ${props => props.isOpen ? '0.75rem' : '0'};
  }
`

const MobileNavLink = styled(NavLink)`
  color: #374151;
  display: block;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #2563eb;
  }

  &.active {
    color: #2563eb;
    font-weight: 600;
    background-color: #dbeafe;
  }
`

const MobileAboutButton = styled.button`
  color: #374151;
  display: block;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #2563eb;
  }
`

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <HeaderSection>
      <Container>
        <HeaderContent>
          {/* Logo */}
          <LogoContainer>
            <LogoLink to="/">
              <LogoWrapper>
                <LogoCircle>
                  <LogoText>DTBC</LogoText>
                </LogoCircle>
                <BrandContainer>
                  <BrandTitle>Divine Touch Bible </BrandTitle>
                  <BrandSubtitle>CHURCH</BrandSubtitle>
                </BrandContainer>
              </LogoWrapper>
            </LogoLink>
          </LogoContainer>

          {/* Desktop Navigation */}
          <DesktopNav>
            <NavContainer>
              <StyledNavLink to="/visit">
                Visit
              </StyledNavLink>
              <StyledNavLink to="/about">
                About
              </StyledNavLink>
              <StyledNavLink to="/next-steps">
                Next Steps
              </StyledNavLink>
              <StyledNavLink to="/give">
                Give
              </StyledNavLink>
            </NavContainer>
          </DesktopNav>

          {/* Mobile menu button */}
          <MobileMenuButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </MobileMenuButton>
        </HeaderContent>

        {/* Mobile Navigation */}
        <MobileMenuContainer isOpen={isMenuOpen}>
          <MobileMenuContent isOpen={isMenuOpen}>
            <MobileNavLink 
              to="/visit" 
              onClick={() => setIsMenuOpen(false)}
            >
              Visit
            </MobileNavLink>
            <MobileAboutButton>
              About
            </MobileAboutButton>
            <MobileNavLink 
              to="/next-steps" 
              onClick={() => setIsMenuOpen(false)}
            >
              Next Steps
            </MobileNavLink>
            <MobileNavLink 
              to="/give" 
              onClick={() => setIsMenuOpen(false)}
            >
              Give
            </MobileNavLink>
          </MobileMenuContent>
        </MobileMenuContainer>
      </Container>
    </HeaderSection>
  )
}

export default Header