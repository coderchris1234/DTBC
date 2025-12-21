import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useBookmarkedVerses } from '../hooks/useBookmarkedVerses';
import { 
  FaShare, 
  FaBookmark, 
  FaRegBookmark, 
  FaTwitter, 
  FaFacebook, 
  FaWhatsapp,
  FaCopy,
  FaRedo
} from 'react-icons/fa';

const DailyVerse = () => {
  const { theme } = useTheme();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkedVerses();

  // Curated Bible verses for daily rotation
  const verses = [
    {
      text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
      reference: "Jeremiah 29:11",
      theme: "hope"
    },
    {
      text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      reference: "Proverbs 3:5-6",
      theme: "trust"
    },
    {
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      reference: "Romans 8:28",
      theme: "faith"
    },
    {
      text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
      reference: "Joshua 1:9",
      theme: "courage"
    },
    {
      text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
      reference: "Psalm 23:1-3",
      theme: "peace"
    },
    {
      text: "Cast all your anxiety on him because he cares for you.",
      reference: "1 Peter 5:7",
      theme: "comfort"
    },
    {
      text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
      reference: "Isaiah 40:31",
      theme: "strength"
    },
    {
      text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
      reference: "1 Corinthians 13:4",
      theme: "love"
    },
    {
      text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
      reference: "Matthew 6:34",
      theme: "peace"
    },
    {
      text: "I can do all this through him who gives me strength.",
      reference: "Philippians 4:13",
      theme: "strength"
    }
  ];

  // Get verse for today based on date
  const getTodaysVerse = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return verses[dayOfYear % verses.length];
  };

  // Initialize with today's verse
  const [currentVerse, setCurrentVerse] = useState(() => getTodaysVerse());
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle bookmark
  const toggleBookmark = () => {
    if (isBookmarked(currentVerse.reference)) {
      removeBookmark(currentVerse.reference);
    } else {
      addBookmark(currentVerse);
    }
  };

  // Get new random verse
  const getNewVerse = () => {
    setIsLoading(true);
    const randomIndex = Math.floor(Math.random() * verses.length);
    const newVerse = verses[randomIndex];
    setCurrentVerse(newVerse);
    
    setTimeout(() => setIsLoading(false), 300);
  };

  // Copy verse to clipboard
  const copyToClipboard = async () => {
    const text = `"${currentVerse.text}" - ${currentVerse.reference}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Share functions
  const shareToTwitter = () => {
    const text = `"${currentVerse.text}" - ${currentVerse.reference}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=DailyVerse,Faith,DTBC`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const text = `"${currentVerse.text}" - ${currentVerse.reference}`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareToWhatsApp = () => {
    const text = `🙏 Daily Verse: "${currentVerse.text}" - ${currentVerse.reference}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Styles
  const widgetStyle = {
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '2rem',
    margin: '2rem auto',
    maxWidth: '800px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    color: 'white'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: 0,
    color: 'white'
  };

  const actionsStyle = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  };

  const buttonStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  };

  const contentStyle = {
    textAlign: 'center',
    transition: 'opacity 0.3s ease',
    opacity: isLoading ? 0.6 : 1
  };

  const verseTextStyle = {
    fontSize: '1.3rem',
    lineHeight: '1.6',
    color: 'white',
    fontStyle: 'italic',
    margin: '0 0 1rem 0',
    fontWeight: '300',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
  };

  const referenceStyle = {
    display: 'block',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.1rem',
    fontWeight: '500',
    marginBottom: '1rem'
  };

  const themeTagStyle = {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    backdropFilter: 'blur(10px)'
  };

  const shareMenuStyle = {
    position: 'absolute',
    top: '100%',
    right: '0',
    background: theme === 'dark' ? '#2a2a3e' : 'white',
    borderRadius: '12px',
    padding: '0.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    zIndex: 10,
    minWidth: '150px',
    marginTop: '0.5rem'
  };

  const shareOptionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.75rem',
    border: 'none',
    background: 'none',
    color: theme === 'dark' ? 'white' : '#333',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background 0.2s ease',
    fontSize: '0.9rem'
  };

  return (
    <div style={widgetStyle}>
      <div>
        <div style={headerStyle}>
          <h3 style={titleStyle}>
            <span>📖</span>
            Daily Verse
          </h3>
          <div style={actionsStyle}>
            <button 
              style={buttonStyle}
              onClick={getNewVerse}
              title="Get new verse"
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              <FaRedo />
            </button>
            <button 
              style={{
                ...buttonStyle,
                background: isBookmarked(currentVerse.reference) ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.2)',
                color: isBookmarked(currentVerse.reference) ? '#ffd700' : 'white'
              }}
              onClick={toggleBookmark}
              title={isBookmarked(currentVerse.reference) ? "Remove bookmark" : "Bookmark verse"}
            >
              {isBookmarked(currentVerse.reference) ? <FaBookmark /> : <FaRegBookmark />}
            </button>
            <div style={{ position: 'relative' }}>
              <button 
                style={buttonStyle}
                onClick={() => setShowShareMenu(!showShareMenu)}
                title="Share verse"
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                <FaShare />
              </button>
              {showShareMenu && (
                <div style={shareMenuStyle}>
                  <button onClick={shareToTwitter} style={shareOptionStyle}>
                    <FaTwitter /> Twitter
                  </button>
                  <button onClick={shareToFacebook} style={shareOptionStyle}>
                    <FaFacebook /> Facebook
                  </button>
                  <button onClick={shareToWhatsApp} style={shareOptionStyle}>
                    <FaWhatsapp /> WhatsApp
                  </button>
                  <button onClick={copyToClipboard} style={shareOptionStyle}>
                    <FaCopy /> {copySuccess ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={contentStyle}>
          {isLoading ? (
            <div style={{ padding: '1rem 0' }}>
              <div style={{ 
                height: '20px', 
                background: 'rgba(255, 255, 255, 0.2)', 
                borderRadius: '10px', 
                marginBottom: '0.5rem',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}></div>
              <div style={{ 
                height: '20px', 
                background: 'rgba(255, 255, 255, 0.2)', 
                borderRadius: '10px', 
                width: '80%',
                margin: '0 auto 0.5rem',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}></div>
              <div style={{ 
                height: '20px', 
                background: 'rgba(255, 255, 255, 0.2)', 
                borderRadius: '10px', 
                width: '60%',
                margin: '0 auto',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}></div>
            </div>
          ) : (
            <>
              <blockquote style={verseTextStyle}>
                "{currentVerse.text}"
              </blockquote>
              <cite style={referenceStyle}>
                - {currentVerse.reference}
              </cite>
              <div style={themeTagStyle}>
                {currentVerse.theme}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyVerse;