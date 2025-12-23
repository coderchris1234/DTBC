import { useState, useEffect } from 'react';
import { FaTimes, FaExpand, FaCompress, FaYoutube, FaDesktop } from 'react-icons/fa';

// Mobile options modal component (moved outside render)
const MobileOptionsModal = ({ onWatchInBrowser, onOpenYouTube, onCancel, title }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3000,
    padding: '20px'
  }}>
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '2rem',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center'
    }}>
      <h3 style={{ 
        margin: '0 0 1rem 0', 
        color: '#333',
        fontSize: '1.5rem',
        fontWeight: '600'
      }}>
        How would you like to watch?
      </h3>
      
      <p style={{ 
        margin: '0 0 2rem 0', 
        color: '#666',
        lineHeight: '1.5'
      }}>
        Choose your preferred viewing experience for "{title}"
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button
          onClick={onWatchInBrowser}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          <FaDesktop />
          Watch in Browser
        </button>
        
        <button
          onClick={onOpenYouTube}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            background: '#ff0000',
            color: 'white',
            border: 'none',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          <FaYoutube />
          Open YouTube App
        </button>
        
        <button
          onClick={onCancel}
          style={{
            background: 'transparent',
            color: '#666',
            border: '2px solid #ddd',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s ease'
          }}
        >
          Cancel
        </button>
      </div>
      
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#f8f9fa',
        borderRadius: '8px',
        fontSize: '0.875rem',
        color: '#666'
      }}>
        <p style={{ margin: 0 }}>
          <strong>Browser:</strong> Watch directly on our website<br/>
          <strong>YouTube App:</strong> Better mobile experience with full features
        </p>
      </div>
    </div>
  </div>
);

const VideoPlayer = ({ isOpen, onClose, videoUrl, title }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [forceShowVideo, setForceShowVideo] = useState(false);
  
  // Calculate mobile status
  const isMobile = () => {
    if (typeof window === 'undefined') return false;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileCheck = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    const screenCheck = window.innerWidth <= 768;
    return mobileCheck || screenCheck;
  };
  
  // Determine what to show
  const shouldShowMobileOptions = isOpen && isMobile() && !forceShowVideo;
  const shouldShowVideo = isOpen && (!isMobile() || forceShowVideo);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url || typeof url !== 'string') return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  // Define styles at the top to avoid reference errors
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px',
    animation: 'fadeIn 0.3s ease-out'
  };

  const playerContainerStyle = {
    position: 'relative',
    width: isFullscreen ? '100vw' : '90vw',
    height: isFullscreen ? '100vh' : '80vh',
    maxWidth: isFullscreen ? 'none' : '1200px',
    maxHeight: isFullscreen ? 'none' : '675px',
    background: '#000',
    borderRadius: isFullscreen ? '0' : '12px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    animation: 'slideIn 0.4s ease-out'
  };

  const headerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
    padding: '20px',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle = {
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
    maxWidth: '70%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const controlsStyle = {
    display: 'flex',
    gap: '10px',
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

  const iframeStyle = {
    width: '100%',
    height: '100%',
    border: 'none'
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Open in YouTube (fallback option)
  const openInYouTube = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  // Watch in browser (force embed)
  const watchInBrowser = () => {
    setForceShowVideo(true);
  };

  // Handle close and reset
  const handleClose = () => {
    setForceShowVideo(false);
    onClose();
  };

  if (!isOpen) return null;
  
  // Show mobile options if requested
  if (shouldShowMobileOptions) {
    return (
      <MobileOptionsModal 
        onWatchInBrowser={watchInBrowser}
        onOpenYouTube={openInYouTube}
        onCancel={handleClose}
        title={title}
      />
    );
  }

  if (!shouldShowVideo || !videoUrl || !videoId) {
    // If no valid video URL, show error message or fallback
    return (
      <div style={modalStyle} onClick={onClose}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '400px'
        }} onClick={(e) => e.stopPropagation()}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Video Not Available</h3>
          <p style={{ margin: '0 0 1.5rem 0', color: '#666' }}>
            Sorry, this video cannot be played right now.
          </p>
          <button
            onClick={handleClose}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from { 
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to { 
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
      
      <div style={modalStyle} onClick={handleClose}>
        <div style={playerContainerStyle} onClick={(e) => e.stopPropagation()}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>{title}</h3>
            <div style={controlsStyle}>
              <button
                style={buttonStyle}
                onClick={openInYouTube}
                title="Open in YouTube"
              >
                <FaYoutube />
              </button>
              <button
                style={buttonStyle}
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
              <button
                style={buttonStyle}
                onClick={handleClose}
                title="Close"
              >
                <FaTimes />
              </button>
            </div>
          </div>
          
          <iframe
            style={iframeStyle}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;