import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaHeart, FaPray } from 'react-icons/fa';

const VisitorCounter = () => {
  const { theme } = useTheme();
  // Initialize visitor count
  const getInitialVisitorCount = () => {
    const today = new Date().toDateString();
    const storageKey = `dtbc-visitors-${today}`;
    
    let todayCount = parseInt(localStorage.getItem(storageKey) || '0');
    
    const userVisitKey = `dtbc-user-visit-${today}`;
    const hasVisitedToday = localStorage.getItem(userVisitKey);
    
    if (!hasVisitedToday) {
      todayCount += 1;
      localStorage.setItem(storageKey, todayCount.toString());
      localStorage.setItem(userVisitKey, 'true');
    }
    
    return todayCount;
  };

  const [visitorCount] = useState(() => getInitialVisitorCount());
  const [isVisible, setIsVisible] = useState(false);

  // Blessing messages to rotate through
  const blessings = [
    "You are blessed by visiting us today!",
    "God's grace brought you here today!",
    "You are a blessing to our community!",
    "May God's peace be with you today!",
    "You are loved and welcomed here!",
    "God has a purpose for your visit today!",
    "You are part of God's beautiful plan!",
    "May your heart be filled with joy today!"
  ];

  useEffect(() => {
    // Show the counter with animation delay
    setTimeout(() => setIsVisible(true), 1000);
    
    // Clean up old visitor data (keep only last 7 days)
    const cleanupOldData = () => {
      const keys = Object.keys(localStorage);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      keys.forEach(key => {
        if (key.startsWith('dtbc-visitors-') || key.startsWith('dtbc-user-visit-')) {
          const dateStr = key.split('-').slice(2).join('-');
          const keyDate = new Date(dateStr);
          if (keyDate < sevenDaysAgo) {
            localStorage.removeItem(key);
          }
        }
      });
    };
    
    cleanupOldData();
  }, []);

  // Get a consistent blessing message based on visitor count
  const getBlessingMessage = () => {
    const index = visitorCount % blessings.length;
    return blessings[index];
  };

  const getOrdinalSuffix = (num) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  const containerStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)' 
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    maxWidth: '300px',
    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0.8)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    opacity: 0.9
  };

  const countStyle = {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#ffd700'
  };

  const blessingStyle = {
    fontSize: '0.85rem',
    lineHeight: '1.4',
    opacity: 0.95,
    fontStyle: 'italic'
  };

  const mobileStyle = window.innerWidth <= 768 ? {
    bottom: '10px',
    right: '10px',
    left: '10px',
    maxWidth: 'none',
    padding: '0.75rem 1rem'
  } : {};

  return (
    <div style={{...containerStyle, ...mobileStyle}}>
      <div style={headerStyle}>
        <FaHeart style={{ color: '#ff6b6b' }} />
        <span>Today's Visitors</span>
      </div>
      
      <div style={countStyle}>
        You are the {visitorCount}{getOrdinalSuffix(visitorCount)} person blessed by visiting us today!
      </div>
      
      <div style={blessingStyle}>
        <FaPray style={{ marginRight: '0.5rem', color: '#ffd700' }} />
        {getBlessingMessage()}
      </div>
    </div>
  );
};

export default VisitorCounter;