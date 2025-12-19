import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Sermons = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <SermonsSection ref={sectionRef}>
      <Container>
        <ContentWrapper>
          <ImageSection isVisible={isVisible} animationDelay="0.2s">
            <SermonImage 
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
              alt="Church sermon"
            />
          </ImageSection>
          
          <TextSection isVisible={isVisible} animationDelay="0.4s">
            <MainTitle>Thrive in every area of your life.</MainTitle>
            <Description>
              We know life doesn't come with instructions. Since 1910, we have helped people navigate the complexities of relationships, parenting, finances, and faith. We know you want to get it right. We believe you can. We want to help.
            </Description>
            
            <BulletList>
              <BulletItem isVisible={isVisible} animationDelay="0.6s">
                Find people to do life with
              </BulletItem>
              <BulletItem isVisible={isVisible} animationDelay="0.7s">
                Break free from the pain of your past
              </BulletItem>
              <BulletItem isVisible={isVisible} animationDelay="0.8s">
                Thrive in your marriage
              </BulletItem>
              <BulletItem isVisible={isVisible} animationDelay="0.9s">
                Become a better parent
              </BulletItem>
              <BulletItem isVisible={isVisible} animationDelay="1.0s">
                Experience financial freedom
              </BulletItem>
              <BulletItem isVisible={isVisible} animationDelay="1.1s">
                Learn how to make a difference
              </BulletItem>
            </BulletList>
          </TextSection>
        </ContentWrapper>
        
        <CardsSection>
          <ActionCard isVisible={isVisible} animationDelay="1.3s" direction="left">
            <CardTitle>Sermons</CardTitle>
            <CardSubtitle>Join us live OR watch a recent message</CardSubtitle>
            <ActionLink href='https://www.youtube.com/@divinetouchbiblechurchnewj9570/playlists' target="_blank" rel="noopener noreferrer">
              WATCH
            </ActionLink>
          </ActionCard>
          
          {/* <ActionCard isVisible={isVisible} animationDelay="1.4s" direction="center">
            <CardTitle>Events</CardTitle>
            <CardSubtitle>See what's happening at Hope City</CardSubtitle>
            <ActionButton>SEE ALL</ActionButton>
          </ActionCard> */}
        </CardsSection>
      </Container>
    </SermonsSection>
  )
}

// Styled Components
const SermonsSection = styled.section`
  background-color: #f3f4f6;
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
  width: 100%;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
`

const ImageSection = styled.div`
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '-50px'}) rotate(${props => props.isVisible ? '0deg' : '-2deg'}) scale(${props => props.isVisible ? '1' : '0.95'});
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const SermonImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    height: 300px;
  }
`

const TextSection = styled.div`
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '50px'}) rotate(${props => props.isVisible ? '0deg' : '2deg'});
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
`

const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`

const Description = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const BulletItem = styled.li`
  font-size: 1.125rem;
  color: #3b82f6;
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 1.5rem;
  font-weight: 500;
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateX(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #3b82f6;
    font-weight: bold;
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const CardsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const ActionCard = styled.div`
  background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(8, 145, 178, 0.3);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${props => props.animationDelay || '0s'};
  
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: ${props => {
    if (!props.isVisible) {
      switch(props.direction) {
        case 'left': return 'translateY(50px) rotate(-3deg) scale(0.9)';
        case 'right': return 'translateY(50px) rotate(3deg) scale(0.9)';
        case 'center': return 'translateY(80px) scale(0.9)';
        default: return 'translateY(50px) scale(0.9)';
      }
    }
    return 'translateY(0) rotate(0) scale(1)';
  }};
  
  &:hover {
    transform: translateY(-10px) scale(1.05) !important;
    box-shadow: 0 20px 40px rgba(8, 145, 178, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    
    &:hover {
      transform: translateY(-5px) scale(1.02) !important;
    }
  }
`

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`

const CardSubtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.4;
`

const ActionLink = styled.a`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
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
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`

export default Sermons