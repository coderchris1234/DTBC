import { useYouTubePlaylist } from '../hooks/useYouTubePlaylist';
import { useTheme } from '../contexts/ThemeContext';

const YouTubeStatus = () => {
  const { theme } = useTheme();
  const PLAYLIST_ID = 'PLhhjC515-IIjINZvrIvpwmYCBrUjY3Cvu';
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  
  const { videos, loading, error } = useYouTubePlaylist(PLAYLIST_ID, YOUTUBE_API_KEY);

  const statusStyle = {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    background: theme === 'dark' ? '#2d3748' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#333333',
    padding: '10px 15px',
    borderRadius: '8px',
    fontSize: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${theme === 'dark' ? '#4a5568' : '#e2e8f0'}`,
    zIndex: 1000,
    maxWidth: '250px'
  };

  const getStatusColor = () => {
    if (loading) return '#fbbf24'; // yellow
    if (error) return '#ef4444'; // red
    if (YOUTUBE_API_KEY) return '#10b981'; // green
    return '#6b7280'; // gray
  };

  const getStatusText = () => {
    if (loading) return 'Loading YouTube data...';
    if (error) return `Error: ${error}`;
    if (YOUTUBE_API_KEY) return `✅ YouTube API: ${videos.length} sermons loaded`;
    return '⚠️ Using fallback data (no API key)';
  };

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div style={statusStyle}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        marginBottom: '5px'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: getStatusColor()
        }} />
        <strong>YouTube Integration</strong>
      </div>
      <div style={{ fontSize: '11px', opacity: 0.8 }}>
        {getStatusText()}
      </div>
      {!YOUTUBE_API_KEY && (
        <div style={{ 
          fontSize: '10px', 
          marginTop: '5px', 
          opacity: 0.7,
          fontStyle: 'italic'
        }}>
          Add VITE_YOUTUBE_API_KEY to .env for live data
        </div>
      )}
    </div>
  );
};

export default YouTubeStatus;